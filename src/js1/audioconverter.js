/**
 * WebM-MP3
 * Module to convert WebM blob to MP3 blob
 * Author : Yoann Chane Kive
 */
var W3Module = (function() {
    if (window.Worker) {
      const MAX_CHUNK = 30000000;
      let STEPS = 0;
      var audioCtx = new AudioContext();
      let datas = [];
      let limit = 1;
      let offset = 0;
      let time = 0;
      let fileSize = 0;
      let bufferHeader = null;
      let worker = new Worker("js/process.js");
      let options = {};
  
      const _appendBuffer = function(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
      };
  
      const getWebmBlob = function(url) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          var date1 = new Date();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = () => {
            var date2 = new Date();
            console.log('DOWNLOAD SUCCEEDED : ' + (date2 - date1) + 'ms');
            time += (date2 - date1);
            resolve(xhr.response);
          };
          xhr.send();
        });
      };
  
      const convertWebmToMP3 = function(webmBlob, decomposition = false) {
        worker.postMessage({ init : true });
        STEPS = 0;
        datas = [];
        offset = 0;
        time = 0;
        return new Promise(function (resolve, reject) {
  
          worker.onmessage = (event) => {
            console.log(`Piece of Buffer ${event.data.index} / ${limit + 1} - Finish : ${event.data.duration} ms `);
            time += event.data.duration;
  
            datas.push(event.data.blob);
            if (event.data.index >= limit + 1) { // Blob MP3 Finalize
              const newBlob = new Blob(datas, { 'type': 'audio/mpeg' })
              if (decomposition) {
                resolve(datas);
              } else {
                resolve(newBlob);
              }
              console.log(`MP3 Ready : ${time} ms`);
            }
          };
  
          let blob = new Blob([webmBlob], { 'type' : 'audio/ogg; codecs=opus' });
          options = { 'header': null, 'clusters': [] };
          fileSize = blob.size;
          let countBlock = 0;
          let self = this; // we need a reference to the current object
  
          // Prepare bytes header + clusters
          const readEventEBML = function(evt) {
            let binary = event.target.result;
            var date1 = new Date();
            EBML = parseEBML(binary, options);
            var date2 = new Date();
            time += (date2 - date1);
  
            limit = Math.floor(fileSize / MAX_CHUNK);
            console.log('TOTAL CLUSTER : ' + options.clusters.length + ' duration : ' + (date2- date1) + 'ms' + ' --- limit :' + limit);
  
            if (options.header !== null) {
              chunkReaderBlock(0, options.header, blob); // start read with the initialization segment
            } else {
              console.log(`Error - EBML.`);
            }
          };
          let r = new FileReader();
          r.onload = readEventEBML;
          r.readAsBinaryString(blob);
  
          const readEventHandler = function(buffer, end, nextCluster) {
            if (offset === 0) { // Extract the initialization segment header.
              bufferHeader = buffer;
              offset = end;
              chunkReaderBlock(offset, nextCluster, blob); // read next cluster
            } else {
              let chunkBuffer = _appendBuffer(bufferHeader, buffer);
  
              audioCtx.decodeAudioData(chunkBuffer, (buffer) => {
                STEPS = (parseInt(STEPS) + 1);
                // console.log('DECODED IN PROGRESS : ' + STEPS);
                worker.postMessage({
                  step: STEPS,
                  buffer1 : buffer.getChannelData(0),
                  buffer2 : buffer.getChannelData(1)
                });
  
                offset = end;
                if (offset !== nextCluster) {
                  chunkReaderBlock(offset, nextCluster, blob);
                }
                else {
                  console.log("Done reading file");
                  return;
                }
              });
            }
          }
  
          const chunkReaderBlock = function(_offset, _end, _file) {
            countBlock++;
            let r = new FileReader();
            // console.log(`${_offset} + ${length} =  ${_offset + length} / ${fileSize} `);
            console.log(`${_offset} -> ${_end} / ${fileSize} `);
            let blob = _file.slice(_offset, _end);
            r.onload = (evt) => {
              if (evt.target.error == null) {
                //Selection Next Cluster Chunk
                const max = countBlock * MAX_CHUNK;
                let nextCluster = fileSize;
                if (countBlock <= limit) {
                  let c = options.clusters.find( x => (x >= max) );
                  nextCluster = (c) ? c : fileSize;
                }
                // console.log('COUNT BLOCK : ' + countBlock + ' -- nextCluster -- ' + nextCluster);
                readEventHandler(evt.target.result, _end, nextCluster); // define next cluster;
              } else {
                console.log("Read error: " + evt.target.error);
                return;
              }
            };
            r.readAsArrayBuffer(blob);
          }
        });
      };
      return {
        getWebmBlob: getWebmBlob,
        convertWebmToMP3: convertWebmToMP3
      };
    } else { console.log("Worker not support !") }
  })();


  var schema = {
    "80": {
      "desc": "Contains all possible strings to use for the chapter display.",
      "name": "ChapterDisplay",
      "mu": true,
      "level": "4+",
      "def": "-",
      "type": "m"
    },
    "83": {
      "desc": "A set of track types coded on 8 bits (1: video, 2: audio, 3: complex, 0x10: logo, 0x11: subtitle, 0x12: buttons, 0x20: control).",
      "name": "TrackType",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "85": {
      "desc": "Contains the string to use as the chapter atom.",
      "name": "ChapString",
      "mu": false,
      "level": "5+",
      "def": "-",
      "type": "8"
    },
    "86": {
      "desc": "An ID corresponding to the codec, see the codec page for more info.",
      "name": "CodecID",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "s"
    },
    "88": {
      "desc": "Set if that track (audio, video or subs) SHOULD be used if no language found matches the user preference. (1 bit)",
      "name": "FlagDefault",
      "mu": false,
      "level": "3",
      "def": "1",
      "type": "u"
    },
    "89": {
      "desc": "UID of the Track to apply this chapter too. In the absense of a control track, choosing this chapter will select the listed Tracks and deselect unlisted tracks. Absense of this element indicates that the Chapter should be applied to any currently used Tracks.",
      "name": "ChapterTrackNumber",
      "mu": true,
      "level": "5+",
      "def": "-",
      "type": "u"
    },
    "91": {
      "desc": "Timecode of the start of Chapter (not scaled).",
      "name": "ChapterTimeStart",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "u"
    },
    "92": {
      "desc": "Timecode of the end of Chapter (timecode excluded, not scaled).",
      "name": "ChapterTimeEnd",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "u"
    },
    "96": {
      "desc": "Timecode of the referenced Block.",
      "name": "CueRefTime",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "u"
    },
    "97": {
      "desc": "Position of the Cluster containing the referenced Block.",
      "name": "CueRefCluster",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "u"
    },
    "98": {
      "desc": "If a chapter is hidden (1), it should not be available to the user interface (but still to Control Tracks). (1 bit)",
      "name": "ChapterFlagHidden",
      "mu": false,
      "level": "4+",
      "def": "0",
      "type": "u"
    },
    "4254": {
      "desc": "The compression algorithm used. Algorithms that have been specified so far are:\n0 - zlib,\n1 - bzlib,\n2 - lzo1x\n3 - Header Stripping,\n\n\n\n",
      "name": "ContentCompAlgo",
      "mu": false,
      "level": "6",
      "def": "0",
      "type": "u"
    },
    "4255": {
      "desc": "Settings that might be needed by the decompressor. For Header Stripping (ContentCompAlgo=3), the bytes that were removed from the beggining of each frames of the track.",
      "name": "ContentCompSettings",
      "mu": false,
      "level": "6",
      "def": "-",
      "type": "b"
    },
    "4282": {
      "desc": "A string that describes the type of document that follows this EBML header. 'matroska' in our case or 'webm' for webm files.",
      "name": "DocType",
      "mu": false,
      "level": "1",
      "def": "matroska",
      "type": "s"
    },
    "4285": {
      "desc": "The minimum DocType version an interpreter has to support to read this file.",
      "name": "DocTypeReadVersion",
      "mu": false,
      "level": "1",
      "def": "1",
      "type": "u"
    },
    "4286": {
      "desc": "The version of EBML parser used to create the file.",
      "name": "EBMLVersion",
      "mu": false,
      "level": "1",
      "def": "1",
      "type": "u"
    },
    "4287": {
      "desc": "The version of DocType interpreter used to create the file.",
      "name": "DocTypeVersion",
      "mu": false,
      "level": "1",
      "def": "1",
      "type": "u"
    },
    "4444": {
      "desc": "A randomly generated unique ID that all segments related to each other must use (128 bits).",
      "name": "SegmentFamily",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "b"
    },
    "4461": {
      "desc": "Date of the origin of timecode (value 0), i.e. production date.",
      "name": "DateUTC",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "d"
    },
    "4484": {
      "desc": "Indication to know if this is the default/original language to use for the given tag. (1 bit)",
      "name": "TagDefault",
      "mu": false,
      "level": "4+",
      "def": "1",
      "type": "u"
    },
    "4485": {
      "desc": "The values of the Tag if it is binary. Note that this cannot be used in the same SimpleTag as TagString.",
      "name": "TagBinary",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "b"
    },
    "4487": {
      "desc": "The value of the Tag.",
      "name": "TagString",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "8"
    },
    "4489": {
      "desc": "Duration of the segment (based on TimecodeScale).",
      "name": "Duration",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "f"
    },
    "4598": {
      "desc": "Specify wether the chapter is enabled. It can be enabled/disabled by a Control Track. When disabled, the movie should skip all the content between the TimeStart and TimeEnd of this chapter. (1 bit)",
      "name": "ChapterFlagEnabled",
      "mu": false,
      "level": "4+",
      "def": "1",
      "type": "u"
    },
    "4660": {
      "desc": "MIME type of the file.",
      "name": "FileMimeType",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "s"
    },
    "4675": {
      "desc": "A binary value that a track/codec can refer to when the attachment is needed.",
      "name": "FileReferral",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "5031": {
      "desc": "Tells when this modification was used during encoding/muxing starting with 0 and counting upwards. The decoder/demuxer has to start with the highest order number it finds and work its way down. This value has to be unique over all ContentEncodingOrder elements in the segment.",
      "name": "ContentEncodingOrder",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "5032": {
      "desc": "A bit field that describes which elements have been modified in this way. Values (big endian) can be OR'ed. Possible values:\n1 - all frame contents,\n2 - the track's private data,\n4 - the next ContentEncoding (next ContentEncodingOrder. Either the data inside ContentCompression and/or ContentEncryption)\n\n\n",
      "name": "ContentEncodingScope",
      "mu": false,
      "level": "5",
      "def": "1",
      "type": "u"
    },
    "5033": {
      "desc": "A value describing what kind of transformation has been done. Possible values:\n0 - compression,\n1 - encryption\n\n",
      "name": "ContentEncodingType",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "5034": {
      "desc": "Settings describing the compression used. Must be present if the value of ContentEncodingType is 0 and absent otherwise. Each block must be decompressable even if no previous block is available in order not to prevent seeking.",
      "name": "ContentCompression",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "m"
    },
    "5035": {
      "desc": "Settings describing the encryption used. Must be present if the value of ContentEncodingType is 1 and absent otherwise.",
      "name": "ContentEncryption",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "m"
    },
    "5378": {
      "desc": "Number of the Block in the specified Cluster.",
      "name": "CueBlockNumber",
      "mu": false,
      "level": "4",
      "def": "1",
      "type": "u"
    },
    "5741": {
      "desc": "Writing application (\"mkvmerge-0.3.3\").",
      "name": "WritingApp",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "8"
    },
    "5854": {
      "desc": "The list of tracks that are not used in that part of the stream. It is useful when using overlay tracks on seeking. Then you should decide what track to use.",
      "name": "SilentTracks",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "6240": {
      "desc": "Settings for one content encoding like compression or encryption.",
      "name": "ContentEncoding",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "m"
    },
    "6264": {
      "desc": "Bits per sample, mostly used for PCM.",
      "name": "BitDepth",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "6532": {
      "desc": "An element ID whose data will be used to compute the signature.",
      "name": "SignedElement",
      "mu": true,
      "level": "4+",
      "def": "-",
      "type": "b"
    },
    "6624": {
      "desc": "The track identification for the given Chapter Codec.",
      "name": "TrackTranslate",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "6911": {
      "desc": "Contains all the commands associated to the Atom.",
      "name": "ChapProcessCommand",
      "mu": true,
      "level": "5+",
      "def": "-",
      "type": "m"
    },
    "6922": {
      "desc": "Defines when the process command should be handled (0: during the whole chapter, 1: before starting playback, 2: after playback of the chapter).",
      "name": "ChapProcessTime",
      "mu": false,
      "level": "6+",
      "def": "-",
      "type": "u"
    },
    "6924": {
      "desc": "A tuple of corresponding ID used by chapter codecs to represent this segment.",
      "name": "ChapterTranslate",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "6933": {
      "desc": "Contains the command information. The data should be interpreted depending on the ChapProcessCodecID value. For ChapProcessCodecID = 1, the data correspond to the binary DVD cell pre/post commands.",
      "name": "ChapProcessData",
      "mu": false,
      "level": "6+",
      "def": "-",
      "type": "b"
    },
    "6944": {
      "desc": "Contains all the commands associated to the Atom.",
      "name": "ChapProcess",
      "mu": true,
      "level": "4+",
      "def": "-",
      "type": "m"
    },
    "6955": {
      "desc": "Contains the type of the codec used for the processing. A value of 0 means native Matroska processing (to be defined), a value of 1 means the DVD command set is used. More codec IDs can be added later.",
      "name": "ChapProcessCodecID",
      "mu": false,
      "level": "5+",
      "def": "0",
      "type": "u"
    },
    "7373": {
      "desc": "Element containing elements specific to Tracks/Chapters.",
      "name": "Tag",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "7384": {
      "desc": "A filename corresponding to this segment.",
      "name": "SegmentFilename",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "8"
    },
    "7446": {
      "desc": "The UID of an attachment that is used by this codec.",
      "name": "AttachmentLink",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "258688": {
      "desc": "A human-readable string specifying the codec.",
      "name": "CodecName",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "8"
    },
    "18538067": {
      "desc": "This element contains all other top-level (level 1) elements. Typically a Matroska file is composed of 1 segment.",
      "name": "Segment",
      "mu": true,
      "level": "0",
      "def": "-",
      "type": "m"
    },
    "1a45dfa3": {
      "desc": "Set the EBML characteristics of the data to follow. Each EBML document has to start with this.",
      "name": "EBML",
      "mu": true,
      "level": "0",
      "def": "-",
      "type": "m"
    },
    "42f7": {
      "desc": "The minimum EBML version a parser has to support to read this file.",
      "name": "EBMLReadVersion",
      "mu": false,
      "level": "1",
      "def": "1",
      "type": "u"
    },
    "42f2": {
      "desc": "The maximum length of the IDs you'll find in this file (4 or less in Matroska).",
      "name": "EBMLMaxIDLength",
      "mu": false,
      "level": "1",
      "def": "4",
      "type": "u"
    },
    "42f3": {
      "desc": "The maximum length of the sizes you'll find in this file (8 or less in Matroska). This does not override the element size indicated at the beginning of an element. Elements that have an indicated size which is larger than what is allowed by EBMLMaxSizeLength shall be considered invalid.",
      "name": "EBMLMaxSizeLength",
      "mu": false,
      "level": "1",
      "def": "8",
      "type": "u"
    },
    "bf": {
      "desc": "The CRC is computed on all the data of the Master element it's in. The CRC element should be the first in it's parent master for easier reading. All level 1 elements should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian",
      "name": "CRC-32",
      "mu": false,
      "level": "1+",
      "def": "-",
      "type": "b"
    },
    "ec": {
      "desc": "Used to void damaged data, to avoid unexpected behaviors when using damaged data. The content is discarded. Also used to reserve space in a sub-element for later use.",
      "name": "Void",
      "mu": false,
      "level": "1+",
      "def": "-",
      "type": "b"
    },
    "1b538667": {
      "desc": "Contain signature of some (coming) elements in the stream.",
      "name": "SignatureSlot",
      "mu": true,
      "level": "1+",
      "def": "-",
      "type": "m"
    },
    "7e8a": {
      "desc": "Signature algorithm used (1=RSA, 2=elliptic).",
      "name": "SignatureAlgo",
      "mu": false,
      "level": "2+",
      "def": "-",
      "type": "u"
    },
    "7e9a": {
      "desc": "Hash algorithm used (1=SHA1-160, 2=MD5).",
      "name": "SignatureHash",
      "mu": false,
      "level": "2+",
      "def": "-",
      "type": "u"
    },
    "7ea5": {
      "desc": "The public key to use with the algorithm (in the case of a PKI-based signature).",
      "name": "SignaturePublicKey",
      "mu": false,
      "level": "2+",
      "def": "-",
      "type": "b"
    },
    "7eb5": {
      "desc": "The signature of the data (until a new.",
      "name": "Signature",
      "mu": false,
      "level": "2+",
      "def": "-",
      "type": "b"
    },
    "7e5b": {
      "desc": "Contains elements that will be used to compute the signature.",
      "name": "SignatureElements",
      "mu": false,
      "level": "2+",
      "def": "-",
      "type": "m"
    },
    "7e7b": {
      "desc": "A list consists of a number of consecutive elements that represent one case where data is used in signature. Ex: Cluster|Block|BlockAdditional means that the BlockAdditional of all Blocks in all Clusters is used for encryption.",
      "name": "SignatureElementList",
      "mu": true,
      "level": "3+",
      "def": "-",
      "type": "m"
    },
    "114d9b74": {
      "desc": "Contains the position of other level 1 elements.",
      "name": "SeekHead",
      "mu": true,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "4dbb": {
      "desc": "Contains a single seek entry to an EBML element.",
      "name": "Seek",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "53ab": {
      "desc": "The binary ID corresponding to the element name.",
      "name": "SeekID",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "53ac": {
      "desc": "The position of the element in the segment in octets (0 = first level 1 element).",
      "name": "SeekPosition",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "1549a966": {
      "desc": "Contains miscellaneous general information and statistics on the file.",
      "name": "Info",
      "mu": true,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "73a4": {
      "desc": "A randomly generated unique ID to identify the current segment between many others (128 bits).",
      "name": "SegmentUID",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "b"
    },
    "3cb923": {
      "desc": "A unique ID to identify the previous chained segment (128 bits).",
      "name": "PrevUID",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "b"
    },
    "3c83ab": {
      "desc": "An escaped filename corresponding to the previous segment.",
      "name": "PrevFilename",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "8"
    },
    "3eb923": {
      "desc": "A unique ID to identify the next chained segment (128 bits).",
      "name": "NextUID",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "b"
    },
    "3e83bb": {
      "desc": "An escaped filename corresponding to the next segment.",
      "name": "NextFilename",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "8"
    },
    "69fc": {
      "desc": "Specify an edition UID on which this correspondance applies. When not specified, it means for all editions found in the segment.",
      "name": "ChapterTranslateEditionUID",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "69bf": {
      "desc": "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu).",
      "name": "ChapterTranslateCodec",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "69a5": {
      "desc": "The binary value used to represent this segment in the chapter codec data. The format depends on the ChapProcessCodecID used.",
      "name": "ChapterTranslateID",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "2ad7b1": {
      "desc": "Timecode scale in nanoseconds (1.000.000 means all timecodes in the segment are expressed in milliseconds).",
      "name": "TimecodeScale",
      "mu": false,
      "level": "2",
      "def": "1.000.000",
      "type": "u"
    },
    "7ba9": {
      "desc": "General name of the segment.",
      "name": "Title",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "8"
    },
    "4d80": {
      "desc": "Muxing application or library (\"libmatroska-0.4.3\").",
      "name": "MuxingApp",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "8"
    },
    "1f43b675": {
      "desc": "The lower level element containing the (monolithic) Block structure.",
      "name": "Cluster",
      "mu": true,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "e7": {
      "desc": "Absolute timecode of the cluster (based on TimecodeScale).",
      "name": "Timecode",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "u"
    },
    "58d7": {
      "desc": "One of the track number that are not used from now on in the stream. It could change later if not specified as silent in a further Cluster.",
      "name": "SilentTrackNumber",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "a7": {
      "desc": "Position of the Cluster in the segment (0 in live broadcast streams). It might help to resynchronise offset on damaged streams.",
      "name": "Position",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "u"
    },
    "ab": {
      "desc": "Size of the previous Cluster, in octets. Can be useful for backward playing.",
      "name": "PrevSize",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "u"
    },
    "a3": {
      "desc": "Similar to Block but without all the extra information, mostly used to reduced overhead when no extra feature is needed. (see SimpleBlock Structure)",
      "name": "SimpleBlock",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "b"
    },
    "a0": {
      "desc": "Basic container of information containing a single Block or BlockVirtual, and information specific to that Block/VirtualBlock.",
      "name": "BlockGroup",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "a1": {
      "desc": "Block containing the actual data to be rendered and a timecode relative to the Cluster Timecode. (see Block Structure)",
      "name": "Block",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "a2": {
      "desc": "A Block with no data. It must be stored in the stream at the place the real Block should be in display order. (see Block Virtual)",
      "name": "BlockVirtual",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "75a1": {
      "desc": "Contain additional blocks to complete the main one. An EBML parser that has no knowledge of the Block structure could still see and use/skip these data.",
      "name": "BlockAdditions",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "a6": {
      "desc": "Contain the BlockAdditional and some parameters.",
      "name": "BlockMore",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "m"
    },
    "ee": {
      "desc": "An ID to identify the BlockAdditional level.",
      "name": "BlockAddID",
      "mu": false,
      "level": "5",
      "def": "1",
      "type": "u"
    },
    "a5": {
      "desc": "Interpreted by the codec as it wishes (using the BlockAddID).",
      "name": "BlockAdditional",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "b"
    },
    "9b": {
      "desc": "The duration of the Block (based on TimecodeScale). This element is mandatory when DefaultDuration is set for the track. When not written and with no DefaultDuration, the value is assumed to be the difference between the timecode of this Block and the timecode of the next Block in \"display\" order (not coding order). This element can be useful at the end of a Track (as there is not other Block available), or when there is a break in a track like for subtitle tracks.",
      "name": "BlockDuration",
      "mu": false,
      "level": "3",
      "def": "TrackDuration",
      "type": "u"
    },
    "fa": {
      "desc": "This frame is referenced and has the specified cache priority. In cache only a frame of the same or higher priority can replace this frame. A value of 0 means the frame is not referenced.",
      "name": "ReferencePriority",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "fb": {
      "desc": "Timecode of another frame used as a reference (ie: B or P frame). The timecode is relative to the block it's attached to.",
      "name": "ReferenceBlock",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "i"
    },
    "fd": {
      "desc": "Relative position of the data that should be in position of the virtual block.",
      "name": "ReferenceVirtual",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "i"
    },
    "a4": {
      "desc": "The new codec state to use. Data interpretation is private to the codec. This information should always be referenced by a seek entry.",
      "name": "CodecState",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "8e": {
      "desc": "Contains slices description.",
      "name": "Slices",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "e8": {
      "desc": "Contains extra time information about the data contained in the Block. While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback.",
      "name": "TimeSlice",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "m"
    },
    "cc": {
      "desc": "The reverse number of the frame in the lace (0 is the last frame, 1 is the next to last, etc). While there are a few files in the wild with this element, it is no longer in use and has been deprecated. Being able to interpret this element is not required for playback.",
      "name": "LaceNumber",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "cd": {
      "desc": "The number of the frame to generate from this lace with this delay (allow you to generate many frames from the same Block/Frame).",
      "name": "FrameNumber",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "cb": {
      "desc": "The ID of the BlockAdditional element (0 is the main Block).",
      "name": "BlockAdditionID",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "ce": {
      "desc": "The (scaled) delay to apply to the element.",
      "name": "Delay",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "cf": {
      "desc": "The (scaled) duration to apply to the element.",
      "name": "SliceDuration",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "af": {
      "desc": "Similar to SimpleBlock but the data inside the Block are Transformed (encrypt and/or signed). (see EncryptedBlock Structure)",
      "name": "EncryptedBlock",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "b"
    },
    "1654ae6b": {
      "desc": "A top-level block of information with many tracks described.",
      "name": "Tracks",
      "mu": true,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "ae": {
      "desc": "Describes a track with all elements.",
      "name": "TrackEntry",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "d7": {
      "desc": "The track number as used in the Block Header (using more than 127 tracks is not encouraged, though the design allows an unlimited number).",
      "name": "TrackNumber",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "73c5": {
      "desc": "A unique ID to identify the Track. This should be kept the same when making a direct stream copy of the Track to another file.",
      "name": "TrackUID",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "b9": {
      "desc": "Set if the track is used. (1 bit)",
      "name": "FlagEnabled",
      "mu": false,
      "level": "3",
      "def": "1",
      "type": "u"
    },
    "55aa": {
      "desc": "Set if that track MUST be used during playback. There can be many forced track for a kind (audio, video or subs), the player should select the one which language matches the user preference or the default + forced track. Overlay MAY happen between a forced and non-forced track of the same kind. (1 bit)",
      "name": "FlagForced",
      "mu": true,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "9c": {
      "desc": "Set if the track may contain blocks using lacing. (1 bit)",
      "name": "FlagLacing",
      "mu": false,
      "level": "3",
      "def": "1",
      "type": "u"
    },
    "6de7": {
      "desc": "The minimum number of frames a player should be able to cache during playback. If set to 0, the reference pseudo-cache system is not used.",
      "name": "MinCache",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "6df8": {
      "desc": "The maximum cache size required to store referenced frames in and the current frame. 0 means no cache is needed.",
      "name": "MaxCache",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "23e383": {
      "desc": "Number of nanoseconds (i.e. not scaled) per frame.",
      "name": "DefaultDuration",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "23314f": {
      "desc": "The scale to apply on this track to work at normal speed in relation with other tracks (mostly used to adjust video speed when the audio length differs).",
      "name": "TrackTimecodeScale",
      "mu": false,
      "level": "3",
      "def": "1.0",
      "type": "f"
    },
    "537f": {
      "desc": "A value to add to the Block's Timecode. This can be used to adjust the playback offset of a track.",
      "name": "TrackOffset",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "i"
    },
    "55ee": {
      "desc": "The maximum value of BlockAddID. A value 0 means there is no BlockAdditions for this track.",
      "name": "MaxBlockAdditionID",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "536e": {
      "desc": "A human-readable track name.",
      "name": "Name",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "8"
    },
    "22b59c": {
      "desc": "Specifies the language of the track in the Matroska languages form.",
      "name": "Language",
      "mu": false,
      "level": "3",
      "def": "eng",
      "type": "s"
    },
    "63a2": {
      "desc": "Private data only known to the codec.",
      "name": "CodecPrivate",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "3a9697": {
      "desc": "A string describing the encoding setting used.",
      "name": "CodecSettings",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "8"
    },
    "3b4040": {
      "desc": "A URL to find information about the codec used.",
      "name": "CodecInfoURL",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "s"
    },
    "26b240": {
      "desc": "A URL to download about the codec used.",
      "name": "CodecDownloadURL",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "s"
    },
    "aa": {
      "desc": "The codec can decode potentially damaged data (1 bit).",
      "name": "CodecDecodeAll",
      "mu": false,
      "level": "3",
      "def": "1",
      "type": "u"
    },
    "6fab": {
      "desc": "Specify that this track is an overlay track for the Track specified (in the u-integer). That means when this track has a gap (see SilentTracks) the overlay track should be used instead. The order of multiple TrackOverlay matters, the first one is the one that should be used. If not found it should be the second, etc.",
      "name": "TrackOverlay",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "66fc": {
      "desc": "Specify an edition UID on which this translation applies. When not specified, it means for all editions found in the segment.",
      "name": "TrackTranslateEditionUID",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "66bf": {
      "desc": "The chapter codec using this ID (0: Matroska Script, 1: DVD-menu).",
      "name": "TrackTranslateCodec",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "66a5": {
      "desc": "The binary value used to represent this track in the chapter codec data. The format depends on the ChapProcessCodecID used.",
      "name": "TrackTranslateTrackID",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "b"
    },
    "e0": {
      "desc": "Video settings.",
      "name": "Video",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "9a": {
      "desc": "Set if the video is interlaced. (1 bit)",
      "name": "FlagInterlaced",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "53b8": {
      "desc": "Stereo-3D video mode (0: mono, 1: side by side (left is first), 2: top-bottom (right is first), 3: top-bottom (left is first), 4: checkboard (right is first), 5: checkboard (left is first), 6: row interleaved (right is first), 7: row interleaved (left is first), 8: column interleaved (right is first), 9: column interleaved (left is first), 10: anaglyph (cyan/red)). There are some more details on 3D support in the Specification Notes.",
      "name": "StereoMode",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "b0": {
      "desc": "Width of the encoded video frames in pixels.",
      "name": "PixelWidth",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "ba": {
      "desc": "Height of the encoded video frames in pixels.",
      "name": "PixelHeight",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "54aa": {
      "desc": "The number of video pixels to remove at the bottom of the image (for HDTV content).",
      "name": "PixelCropBottom",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "54bb": {
      "desc": "The number of video pixels to remove at the top of the image.",
      "name": "PixelCropTop",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "54cc": {
      "desc": "The number of video pixels to remove on the left of the image.",
      "name": "PixelCropLeft",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "54dd": {
      "desc": "The number of video pixels to remove on the right of the image.",
      "name": "PixelCropRight",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "54b0": {
      "desc": "Width of the video frames to display. The default value is only valid when DisplayUnit is 0.",
      "name": "DisplayWidth",
      "mu": false,
      "level": "4",
      "def": "PixelWidth",
      "type": "u"
    },
    "54ba": {
      "desc": "Height of the video frames to display. The default value is only valid when DisplayUnit is 0.",
      "name": "DisplayHeight",
      "mu": false,
      "level": "4",
      "def": "PixelHeight",
      "type": "u"
    },
    "54b2": {
      "desc": "How DisplayWidth & DisplayHeight should be interpreted (0: pixels, 1: centimeters, 2: inches, 3: Display Aspect Ratio).",
      "name": "DisplayUnit",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "54b3": {
      "desc": "Specify the possible modifications to the aspect ratio (0: free resizing, 1: keep aspect ratio, 2: fixed).",
      "name": "AspectRatioType",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "2eb524": {
      "desc": "Same value as in AVI (32 bits).",
      "name": "ColourSpace",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "b"
    },
    "2fb523": {
      "desc": "Gamma Value.",
      "name": "GammaValue",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "f"
    },
    "2383e3": {
      "desc": "Number of frames per second. Informational only.",
      "name": "FrameRate",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "f"
    },
    "e1": {
      "desc": "Audio settings.",
      "name": "Audio",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "b5": {
      "desc": "Sampling frequency in Hz.",
      "name": "SamplingFrequency",
      "mu": false,
      "level": "4",
      "def": "8000.0",
      "type": "f"
    },
    "78b5": {
      "desc": "Real output sampling frequency in Hz (used for SBR techniques).",
      "name": "OutputSamplingFrequency",
      "mu": false,
      "level": "4",
      "def": "Sampling Frequency",
      "type": "f"
    },
    "9f": {
      "desc": "Numbers of channels in the track.",
      "name": "Channels",
      "mu": false,
      "level": "4",
      "def": "1",
      "type": "u"
    },
    "7d7b": {
      "desc": "Table of horizontal angles for each successive channel, see appendix.",
      "name": "ChannelPositions",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "b"
    },
    "6d80": {
      "desc": "Settings for several content encoding mechanisms like compression or encryption.",
      "name": "ContentEncodings",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "47e1": {
      "desc": "The encryption algorithm used. The value '0' means that the contents have not been encrypted but only signed. Predefined values:\n1 - DES, 2 - 3DES, 3 - Twofish, 4 - Blowfish, 5 - AES\n",
      "name": "ContentEncAlgo",
      "mu": false,
      "level": "6",
      "def": "0",
      "type": "u"
    },
    "47e2": {
      "desc": "For public key algorithms this is the ID of the public key the the data was encrypted with.",
      "name": "ContentEncKeyID",
      "mu": false,
      "level": "6",
      "def": "-",
      "type": "b"
    },
    "47e3": {
      "desc": "A cryptographic signature of the contents.",
      "name": "ContentSignature",
      "mu": false,
      "level": "6",
      "def": "-",
      "type": "b"
    },
    "47e4": {
      "desc": "This is the ID of the private key the data was signed with.",
      "name": "ContentSigKeyID",
      "mu": false,
      "level": "6",
      "def": "-",
      "type": "b"
    },
    "47e5": {
      "desc": "The algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values:\n1 - RSA\n",
      "name": "ContentSigAlgo",
      "mu": false,
      "level": "6",
      "def": "0",
      "type": "u"
    },
    "47e6": {
      "desc": "The hash algorithm used for the signature. A value of '0' means that the contents have not been signed but only encrypted. Predefined values:\n1 - SHA1-160\n2 - MD5\n\n",
      "name": "ContentSigHashAlgo",
      "mu": false,
      "level": "6",
      "def": "0",
      "type": "u"
    },
    "e2": {
      "desc": "Operation that needs to be applied on tracks to create this virtual track. For more details look at the Specification Notes on the subject.",
      "name": "TrackOperation",
      "mu": false,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "e3": {
      "desc": "Contains the list of all video plane tracks that need to be combined to create this 3D track",
      "name": "TrackCombinePlanes",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "e4": {
      "desc": "Contains a video plane track that need to be combined to create this 3D track",
      "name": "TrackPlane",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "m"
    },
    "e5": {
      "desc": "The trackUID number of the track representing the plane.",
      "name": "TrackPlaneUID",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "u"
    },
    "e6": {
      "desc": "The kind of plane this track corresponds to (0: left eye, 1: right eye, 2: background).",
      "name": "TrackPlaneType",
      "mu": false,
      "level": "5",
      "def": "-",
      "type": "u"
    },
    "e9": {
      "desc": "Contains the list of all tracks whose Blocks need to be combined to create this virtual track",
      "name": "TrackJoinBlocks",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "ed": {
      "desc": "The trackUID number of a track whose blocks are used to create this virtual track.",
      "name": "TrackJoinUID",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "1c53bb6b": {
      "desc": "A top-level element to speed seeking access. All entries are local to the segment. Should be mandatory for non \"live\" streams.",
      "name": "Cues",
      "mu": false,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "bb": {
      "desc": "Contains all information relative to a seek point in the segment.",
      "name": "CuePoint",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "b3": {
      "desc": "Absolute timecode according to the segment time base.",
      "name": "CueTime",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "b7": {
      "desc": "Contain positions for different tracks corresponding to the timecode.",
      "name": "CueTrackPositions",
      "mu": true,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "f7": {
      "desc": "The track for which a position is given.",
      "name": "CueTrack",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "f1": {
      "desc": "The position of the Cluster containing the required Block.",
      "name": "CueClusterPosition",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "u"
    },
    "ea": {
      "desc": "The position of the Codec State corresponding to this Cue element. 0 means that the data is taken from the initial Track Entry.",
      "name": "CueCodecState",
      "mu": false,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "db": {
      "desc": "The Clusters containing the required referenced Blocks.",
      "name": "CueReference",
      "mu": true,
      "level": "4",
      "def": "-",
      "type": "m"
    },
    "535f": {
      "desc": "Number of the referenced Block of Track X in the specified Cluster.",
      "name": "CueRefNumber",
      "mu": false,
      "level": "5",
      "def": "1",
      "type": "u"
    },
    "eb": {
      "desc": "The position of the Codec State corresponding to this referenced element. 0 means that the data is taken from the initial Track Entry.",
      "name": "CueRefCodecState",
      "mu": false,
      "level": "5",
      "def": "0",
      "type": "u"
    },
    "1941a469": {
      "desc": "Contain attached files.",
      "name": "Attachments",
      "mu": false,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "61a7": {
      "desc": "An attached file.",
      "name": "AttachedFile",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "467e": {
      "desc": "A human-friendly name for the attached file.",
      "name": "FileDescription",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "8"
    },
    "466e": {
      "desc": "Filename of the attached file.",
      "name": "FileName",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "8"
    },
    "465c": {
      "desc": "The data of the file.",
      "name": "FileData",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "b"
    },
    "46ae": {
      "desc": "Unique ID representing the file, as random as possible.",
      "name": "FileUID",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "1043a770": {
      "desc": "A system to define basic menus and partition data. For more detailed information, look at the Chapters Explanation.",
      "name": "Chapters",
      "mu": false,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "45b9": {
      "desc": "Contains all information about a segment edition.",
      "name": "EditionEntry",
      "mu": true,
      "level": "2",
      "def": "-",
      "type": "m"
    },
    "45bc": {
      "desc": "A unique ID to identify the edition. It's useful for tagging an edition.",
      "name": "EditionUID",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "u"
    },
    "45bd": {
      "desc": "If an edition is hidden (1), it should not be available to the user interface (but still to Control Tracks). (1 bit)",
      "name": "EditionFlagHidden",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "45db": {
      "desc": "If a flag is set (1) the edition should be used as the default one. (1 bit)",
      "name": "EditionFlagDefault",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "45dd": {
      "desc": "Specify if the chapters can be defined multiple times and the order to play them is enforced. (1 bit)",
      "name": "EditionFlagOrdered",
      "mu": false,
      "level": "3",
      "def": "0",
      "type": "u"
    },
    "b6": {
      "desc": "Contains the atom information to use as the chapter atom (apply to all tracks).",
      "name": "ChapterAtom",
      "mu": true,
      "level": "3+",
      "def": "-",
      "type": "m"
    },
    "73c4": {
      "desc": "A unique ID to identify the Chapter.",
      "name": "ChapterUID",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "u"
    },
    "6e67": {
      "desc": "A segment to play in place of this chapter. Edition ChapterSegmentEditionUID should be used for this segment, otherwise no edition is used.",
      "name": "ChapterSegmentUID",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "b"
    },
    "6ebc": {
      "desc": "The edition to play from the segment linked in ChapterSegmentUID.",
      "name": "ChapterSegmentEditionUID",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "b"
    },
    "63c3": {
      "desc": "Specify the physical equivalent of this ChapterAtom like \"DVD\" (60) or \"SIDE\" (50), see complete list of values.",
      "name": "ChapterPhysicalEquiv",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "u"
    },
    "8f": {
      "desc": "List of tracks on which the chapter applies. If this element is not present, all tracks apply",
      "name": "ChapterTrack",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "m"
    },
    "437c": {
      "desc": "The languages corresponding to the string, in the bibliographic ISO-639-2 form.",
      "name": "ChapLanguage",
      "mu": true,
      "level": "5+",
      "def": "eng",
      "type": "s"
    },
    "437e": {
      "desc": "The countries corresponding to the string, same 2 octets as in Internet domains.",
      "name": "ChapCountry",
      "mu": true,
      "level": "5+",
      "def": "-",
      "type": "s"
    },
    "450d": {
      "desc": "Some optional data attached to the ChapProcessCodecID information. For ChapProcessCodecID = 1, it is the \"DVD level\" equivalent.",
      "name": "ChapProcessPrivate",
      "mu": false,
      "level": "5+",
      "def": "-",
      "type": "b"
    },
    "1254c367": {
      "desc": "Element containing elements specific to Tracks/Chapters. A list of valid tags can be found here.",
      "name": "Tags",
      "mu": true,
      "level": "1",
      "def": "-",
      "type": "m"
    },
    "63c0": {
      "desc": "Contain all UIDs where the specified meta data apply. It is empty to describe everything in the segment.",
      "name": "Targets",
      "mu": false,
      "level": "3",
      "def": "-",
      "type": "m"
    },
    "68ca": {
      "desc": "A number to indicate the logical level of the target (see TargetType).",
      "name": "TargetTypeValue",
      "mu": false,
      "level": "4",
      "def": "50",
      "type": "u"
    },
    "63ca": {
      "desc": "An informational string that can be used to display the logical level of the target like \"ALBUM\", \"TRACK\", \"MOVIE\", \"CHAPTER\", etc (see TargetType).",
      "name": "TargetType",
      "mu": false,
      "level": "4",
      "def": "-",
      "type": "s"
    },
    "63c5": {
      "desc": "A unique ID to identify the Track(s) the tags belong to. If the value is 0 at this level, the tags apply to all tracks in the Segment.",
      "name": "TrackUID",
      "mu": true,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "63c9": {
      "desc": "A unique ID to identify the EditionEntry(s) the tags belong to. If the value is 0 at this level, the tags apply to all editions in the Segment.",
      "name": "EditionUID",
      "mu": true,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "63c4": {
      "desc": "A unique ID to identify the Chapter(s) the tags belong to. If the value is 0 at this level, the tags apply to all chapters in the Segment.",
      "name": "ChapterUID",
      "mu": true,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "63c6": {
      "desc": "A unique ID to identify the Attachment(s) the tags belong to. If the value is 0 at this level, the tags apply to all the attachments in the Segment.",
      "name": "AttachmentUID",
      "mu": true,
      "level": "4",
      "def": "0",
      "type": "u"
    },
    "67c8": {
      "desc": "Contains general information about the target.",
      "name": "SimpleTag",
      "mu": true,
      "level": "3+",
      "def": "-",
      "type": "m"
    },
    "45a3": {
      "desc": "The name of the Tag that is going to be stored.",
      "name": "TagName",
      "mu": false,
      "level": "4+",
      "def": "-",
      "type": "8"
    },
    "447a": {
      "desc": "Specifies the language of the tag specified, in the Matroska languages form.",
      "name": "TagLanguage",
      "mu": false,
      "level": "4+",
      "def": "und",
      "type": "s"
    }
  }


//EBML JSON FORMAT

var nameHexMap = {};
for(var i in schema) nameHexMap[schema[i].name] = i;

function toBinary(string){
  return string.split('').map(function(i){
    var unpadded = i.charCodeAt(0).toString(2);
    return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
  }).join('')
}

function toBinStr(bits){
  var data = '';
  var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
  bits = pad + bits;
  for(var i = 0; i < bits.length; i+= 8){
    data += String.fromCharCode(parseInt(bits.substr(i,8),2))
  }
  return data;
}

BinaryParser = function(bigEndian, allowExceptions){
    this.bigEndian = bigEndian, this.allowExceptions = allowExceptions;
};
with({p: BinaryParser.prototype}){
    p.encodeFloat = function(number, precisionBits, exponentBits){
        var bias = Math.pow(2, exponentBits - 1) - 1, minExp = -bias + 1, maxExp = bias, minUnnormExp = minExp - precisionBits,
        status = isNaN(n = parseFloat(number)) || n == -Infinity || n == +Infinity ? n : 0,
        exp = 0, len = 2 * bias + 1 + precisionBits + 3, bin = new Array(len),
        signal = (n = status !== 0 ? 0 : n) < 0, n = Math.abs(n), intPart = Math.floor(n), floatPart = n - intPart,
        i, lastBit, rounded, j, result;
        for(i = len; i; bin[--i] = 0);
        for(i = bias + 2; intPart && i; bin[--i] = intPart % 2, intPart = Math.floor(intPart / 2));
        for(i = bias + 1; floatPart > 0 && i; (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart);
        for(i = -1; ++i < len && !bin[i];);
        if(bin[(lastBit = precisionBits - 1 + (i = (exp = bias + 1 - i) >= minExp && exp <= maxExp ? i + 1 : bias + 1 - (exp = minExp - 1))) + 1]){
            if(!(rounded = bin[lastBit]))
                for(j = lastBit + 2; !rounded && j < len; rounded = bin[j++]);
            for(j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0));
        }
        for(i = i - 2 < 0 ? -1 : i - 3; ++i < len && !bin[i];);

        (exp = bias + 1 - i) >= minExp && exp <= maxExp ? ++i : exp < minExp &&
            (exp != bias + 1 - len && exp < minUnnormExp && this.warn("encodeFloat::float underflow"), i = bias + 1 - (exp = minExp - 1));
        (intPart || status !== 0) && (this.warn(intPart ? "encodeFloat::float overflow" : "encodeFloat::" + status),
            exp = maxExp + 1, i = bias + 2, status == -Infinity ? signal = 1 : isNaN(status) && (bin[i] = 1));
        for(n = Math.abs(exp + bias), j = exponentBits + 1, result = ""; --j; result = (n % 2) + result, n = n >>= 1);
        for(n = 0, j = 0, i = (result = (signal ? "1" : "0") + result + bin.slice(i, i + precisionBits).join("")).length, r = [];
            i; n += (1 << j) * result.charAt(--i), j == 7 && (r[r.length] = String.fromCharCode(n), n = 0), j = (j + 1) % 8);
        r[r.length] = n ? String.fromCharCode(n) : "";
        return (this.bigEndian ? r.reverse() : r).join("");
    };
    p.encodeInt = function(number, bits, signed){
        var max = Math.pow(2, bits), r = [];
        (number >= max || number < -(max >> 1)) && this.warn("encodeInt::overflow") && (number = 0);
        number < 0 && (number += max);
        for(; number; r[r.length] = String.fromCharCode(number % 256), number = Math.floor(number / 256));
        for(bits = -(-bits >> 3) - r.length; bits--; r[r.length] = "\0");
        return (this.bigEndian ? r.reverse() : r).join("");
    };
    p.decodeFloat = function(data, precisionBits, exponentBits){
        var b = ((b = new this.Buffer(this.bigEndian, data)).checkBuffer(precisionBits + exponentBits + 1), b),
            bias = Math.pow(2, exponentBits - 1) - 1, signal = b.readBits(precisionBits + exponentBits, 1),
            exponent = b.readBits(precisionBits, exponentBits), significand = 0,
            divisor = 2, curByte = b.buffer.length + (-precisionBits >> 3) - 1,
            byteValue, startBit, mask;
        do
            for(byteValue = b.buffer[ ++curByte ], startBit = precisionBits % 8 || 8, mask = 1 << startBit;
                mask >>= 1; (byteValue & mask) && (significand += 1 / divisor), divisor *= 2);
        while(precisionBits -= startBit);
        return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
            : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
            : Math.pow(2, exponent - bias) * (1 + significand) : 0);
    };
    p.decodeInt = function(data, bits, signed){
        var b = new this.Buffer(this.bigEndian, data), x = b.readBits(0, bits), max = Math.pow(2, bits);
        return signed && x >= max / 2 ? x - max : x;
    };
    with({p: (p.Buffer = function(bigEndian, buffer){
        this.bigEndian = bigEndian || 0, this.buffer = [], this.setBuffer(buffer);
    }).prototype}){
        p.readBits = function(start, length){
            //shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
            function shl(a, b){
                for(++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
                return a;
            }
            if(start < 0 || length <= 0)
                return 0;
            this.checkBuffer(start + length);
            for(var offsetLeft, offsetRight = start % 8, curByte = this.buffer.length - (start >> 3) - 1,
                lastByte = this.buffer.length + (-(start + length) >> 3), diff = curByte - lastByte,
                sum = ((this.buffer[ curByte ] >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1))
                + (diff && (offsetLeft = (start + length) % 8) ? (this.buffer[ lastByte++ ] & ((1 << offsetLeft) - 1))
                << (diff-- << 3) - offsetRight : 0); diff; sum += shl(this.buffer[ lastByte++ ], (diff-- << 3) - offsetRight)
            );
            return sum;
        };
        p.setBuffer = function(data){
            if(data){
                for(var l, i = l = data.length, b = this.buffer = new Array(l); i; b[l - i] = data.charCodeAt(--i));
                this.bigEndian && b.reverse();
            }
        };
        p.hasNeededBits = function(neededBits){
            return this.buffer.length >= -(-neededBits >> 3);
        };
        p.checkBuffer = function(neededBits){
            if(!this.hasNeededBits(neededBits))
                throw new Error("checkBuffer::missing bytes");
        };
    }
    p.warn = function(msg){
        if(this.allowExceptions)
            throw new Error(msg);
        return 1;
    };
    p.toSmall = function(data){return this.decodeInt(data, 8, true);};
    p.fromSmall = function(number){return this.encodeInt(number, 8, true);};
    p.toByte = function(data){return this.decodeInt(data, 8, false);};
    p.fromByte = function(number){return this.encodeInt(number, 8, false);};
    p.toShort = function(data){return this.decodeInt(data, 16, true);};
    p.fromShort = function(number){return this.encodeInt(number, 16, true);};
    p.toWord = function(data){return this.decodeInt(data, 16, false);};
    p.fromWord = function(number){return this.encodeInt(number, 16, false);};
    p.toInt = function(data){return this.decodeInt(data, 32, true);};
    p.fromInt = function(number){return this.encodeInt(number, 32, true);};
    p.toDWord = function(data){return this.decodeInt(data, 32, false);};
    p.fromDWord = function(number){return this.encodeInt(number, 32, false);};
    p.toFloat = function(data){return this.decodeFloat(data, 23, 8);};
    p.fromFloat = function(number){return this.encodeFloat(number, 23, 8);};
    p.toDouble = function(data){return this.decodeFloat(data, 52, 11);};
    p.fromDouble = function(number){return this.encodeFloat(number, 52, 11);};
}

var numparse = new BinaryParser(true, true);

const BASE_BYTES = 55;

function parseEBML(string, options){
  var offset = 0;
  var json = {};
  while(offset < string.length){
    var el_id = toBinary(string.substr(offset, 4));
    var segments = el_id.match(/^0*1/)[0].length;
    var id = el_id.substring(segments - 1, segments * 8);
    var hexid = parseInt(id, 2).toString(16);

    offset += segments;

    var el_size = toBinary(string.substr(offset, 8));
    var segments = el_size.match(/^0*1/)[0].length;
    var size = parseInt(el_size.substring(segments, segments * 8),2);

    offset += segments;

    var data = string.substr(offset, size);
    offset += size;
    var element = schema[hexid];
    var name = element ? element.name : hexid;
    var value = data;

    if(element){
      var type = element.type;

      if(type == 'm'){
        if (name == 'Tracks' || name == 'Cluster') {
          if (name == 'Tracks')
            options['header'] = (parseInt(offset) + BASE_BYTES);
          else {
            options['clusters'].push((parseInt(offset) + BASE_BYTES));
          }
          // console.log(name + ' -> END:' + (parseInt(offset) + BASE_BYTES));
        }
        value = parseEBML(data, options);
      }else if(type == 's'){
        value = data;
      }else if(type == 'u'){
        value = parseInt(toBinary(data),2);
      }else if(type == "8"){
        //TODO: parse UTF 8

        value = data;
      }else if(type == "b"){
        //binary
        value = data;
      }else if(type == "f"){
        //float
          if(size === 4){
              value = numparse.toFloat(data);
          }
          else {
              value = numparse.toDouble(data);
          }
      }else{
        console.log('unknown type', type)
      }
    }
    var parsed_data = value //{original: data, val: value}; //so that generateEBML can return original.
    if(!element || element.mu){
      if(!json[name]) json[name] = [];
      json[name].push(parsed_data);
    }else{
      json[name] = parsed_data;
    }
    //console.log(hexid, size, data);

  }

  return json;
}


function generateEBML(json){
  var ebml = '';
  for(var i in json){
    var el_len = json[i].pop ? json[i].length : 1;
    for(var k = 0; k < el_len; k++){
      var data = json[i].pop ? json[i][k] : json[i];
      //console.log(i,k,data);
      var hexid = nameHexMap[i] || i;
      var type = schema[hexid].type
      if(typeof data == 'object'){

        //recurse
        //normal object yay
        data = generateEBML(data);
      }else if(typeof data == 'number'){
        //console.log(type, hexid, i)
        if(type == "f"){
          data = numparse.fromDouble(data)

        }else{
          data = toBinStr(data.toString(2));
        }

      }
      if(typeof data == 'string'){
        var len = data.length;
        var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
        //(zeroes + 1) * 8 - (zeroes + 1) = zeroes * 7 - 7 = needed size
        var size_str = len.toString(2);
        var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
        var size = (new Array(zeroes + 1)).join('0') + '1' + padded;

        ebml += toBinStr(parseInt(hexid, 16).toString(2));
        //console.log(size, size_str, size.toString(16));
        ebml += toBinStr(size);
        ebml += data;
      }else{
        console.log('big error!?!?!?',i,data,json);
      }
    }
  }
  return ebml;
}