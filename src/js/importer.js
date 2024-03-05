var Importer={};

(function(){

const maxnotes=10000;
const maxch=24;
	
var midiToSeqXY=(sample)=>{
//console.log(sample);
	var song={};
	song.notes=[];
	if (sample.header.tempos[0])
	song.bpm=sample.header.tempos[0].bpm;
	else song.bpm=90; // default
	song.name=sample.header.name;

	if (sample.header.timeSignatures[0]){
		song.bpMeas= sample.header.timeSignatures[0].timeSignature[0];
		song.bpNote= sample.header.timeSignatures[0].timeSignature[1];
	} else {   // default
		song.bpMeas= 4;
		song.bpNote= 4;
	};

	var tickL= 60/ (song.bpm / song.bpNote) /16; // len of a 16n in second

// 	function getSimilarInstrument(s){
// 		if (!s) return 0;
// 		if (s.toLowerCase().includes("piano")) return 1;
// 		if (s.toLowerCase().includes("cello")) return 2;
// 		if (s.toLowerCase().includes("violin")) return 3;
// 		if (s.toLowerCase().includes("string")) return 2;
// 		if (s.toLowerCase().includes("guitar") && s.toLowerCase().includes("steel")) return 4;
// 		if (s.toLowerCase().includes("guitar") && s.toLowerCase().includes("nylon")) return 5;
// 		if (s.toLowerCase().includes("guitar") && s.toLowerCase().includes("electric")) return 9;
// 		if (s.toLowerCase().includes("guitar")) return 4;
// 		if (s.toLowerCase().includes("trumpet")) return 6;
// 		if (s.toLowerCase().includes("trombone")) return 7;
// 		if (s.toLowerCase().includes("harp")) return 8;
// 		if (s.toLowerCase().includes("flute")) return 11;
// 		if (s.toLowerCase().includes("contrabass")) return 10;
// 		if (s.toLowerCase().includes("french") && s.toLowerCase().includes("horn")) return 12;
// 		if (s.toLowerCase().includes("bassoon")) return 14;
// 		if (s.toLowerCase().includes("bass")) return 13;
// 		if (s.toLowerCase().includes("clarinet") || s.toLowerCase().includes("oboe")) return 15;
// 		return 0;
// 	}
	
	function getInstrumentCode(n){
		const default_piano = 0;
		if (n<=7) return default_piano; //piano
		else if (n<=15) return 8; // music box etc.
		else if (n<=23) return 12; // organ
		else if (n==24) return 5; // nylon guitar
		else if (n==25) return 4; // steel guitar
		else if (n<=31) return 9; // electric guitar
		else if (n<=39) return 13; // bass
		else if (n==40) return 3; // violin
		else if (n<=44) return 2; // cello
		else if (n<=47) return 8; // harp etc
		else if (n<=55) return 2; // chorus
		else if (n==56) return 6; // trumpet
		else if (n==57) return 7; // trombone
		else if (n<=63) return 12; // horns
		else if (n<=70) return 14; // bassoon etc
		else if (n==71) return 15; // clarinet
		else if (n<=79) return 11; // flute
		else if (n<=111) return default_piano; // other stuff
		return null;
	}

	Work.layer=[];

	var ch=-1;
	for (var i=0; i<sample.tracks.length; i++)
	if (sample.tracks[i].notes.length>0 && getInstrumentCode(sample.tracks[i].instrument.number)!=null) {
		ch++;
		if (ch>maxch) break;
	
		Work.layer.push(copyObj(newWork.layer[0]));
		Work.layer[Work.layer.length-1].instrument=getInstrumentCode(sample.tracks[i].instrument.number);
	
		for (var j=0; j<sample.tracks[i].notes.length; j++)
		if (sample.tracks[i].notes[j].midi-21<88 && sample.tracks[i].notes[j].midi-21>=0)
		{	song.notes.push({
				y: sample.tracks[i].notes[j].midi - 21, 
				x: sample.tracks[i].notes[j].time / tickL, 
				d: sample.tracks[i].notes[j].duration / tickL, 
				v: sample.tracks[i].notes[j].velocity, 
				l: ch, 
				s: 0
			});
//			console.log(sample.tracks[i].notes[j].velocity);
		}
	};
		
	Work.global.seqXY=song.notes;
	Work.global.bpMeas=song.bpMeas;
	Work.global.bpNote=song.bpNote;
	Work.global.workname=song.name;
	Work.global.bpm=song.bpm;
};
	
//	res.global.bpm=Math.round(song.bpm);
	
var currentMidi = null;
function parseFile(file) {
	//read the file
	const reader = new FileReader();
	reader.onload = function (e) {
		const midi = new Midi(e.target.result);
		midiToSeqXY(midi);
// 		console.log(Work.global.seqXY);
		Global.XYtoIJ();
		pianoroll.historyPush("Import MIDI File");
		pianoroll.playhead=-1;	
		Composer.init();
		Controls.init();	
		Instruments.onDefaultLoaded();
 	pianoroll.minW= Work.global.bpMeas * 2 * (16 / Work.global.bpNote)+1;
 	pianoroll.maxW= Work.global.bpMeas * 16 * (16 / Work.global.bpNote)+1;
		pianoroll.autoZoom();
		pianoroll.updateChords();	
		pianoroll.detectKeyScale();
		pianoroll.scroll("beginning");
	};
	reader.readAsArrayBuffer(file);
}

function exportMidi(work){	
	var midi = new Midi();
// 	midi.header.keySignatures.push({
// 		key: "C",
// 		scale: "major",
// 		ticks: 0
// 	});
// 	midi.header.tempos.push({
// 		bpm: work.global.bpm,
// 		ticks: 0,
// 		time: 0
// 	})
// 	midi.header.timeSignatures.push({
// 		measures: 0,
// 		ticks: 0,
// 		timeSignature: [2, work.global.bpNote]
// 	})
	secondPerTick = 60 / work.global.bpm / 4;
	work.global.seqXY.forEach((note)=>{
		if ((note.l+1) > midi.tracks.length)
			track = midi.addTrack();
		midi.tracks[note.l].addNote({
			midi : note.y + 21, // 21-108, 60 = middle C
			time : note.x * secondPerTick,  
			duration: note.d * secondPerTick, 
			velocity: note.v // 0~1
		});
	});
	console.log(midi);
	const blob = new Blob([midi.toArray()], { type: 'application/octet-stream' });
	const a = document.createElement('a');
	document.body.appendChild(a);
	a.href = window.URL.createObjectURL(blob);
	a.download = 'test2.mid';
	a.click();
	window.URL.revokeObjectURL(a.href);
	document.body.removeChild(a);
};


Importer.parseFile = parseFile;
Importer.exportMidi = exportMidi;

}())

