var Theory = {
    chordDict: [{"id":0,"symbol":"5","mask":"100000010000","len":2},{"id":1,"symbol":"M7#5sus4","mask":"100001001001","len":4},{"id":2,"symbol":"7#5sus4","mask":"100001001010","len":4},{"id":3,"symbol":"sus4","mask":"100001010000","len":3},{"id":4,"symbol":"M7sus4","mask":"100001010001","len":4},{"id":5,"symbol":"7sus4","mask":"100001010010","len":4},{"id":6,"symbol":"7no5","mask":"100010000010","len":3},{"id":7,"symbol":"aug","mask":"100010001000","len":3},{"id":8,"symbol":"M7b6","mask":"100010001001","len":4},{"id":9,"symbol":"maj7#5","mask":"100010001001","len":4},{"id":10,"symbol":"7#5","mask":"100010001010","len":4},{"id":11,"symbol":"7b13","mask":"100010001010","len":4},{"id":12,"symbol":"M","mask":"100010010000","len":3},{"id":13,"symbol":"maj7","mask":"100010010001","len":4},{"id":14,"symbol":"7","mask":"100010010010","len":4},{"id":15,"symbol":"6","mask":"100010010100","len":4},{"id":16,"symbol":"7add6","mask":"100010010110","len":5},{"id":17,"symbol":"7b6","mask":"100010011010","len":5},{"id":18,"symbol":"Mb5","mask":"100010100000","len":3},{"id":19,"symbol":"M7b5","mask":"100010100001","len":4},{"id":20,"symbol":"7b5","mask":"100010100010","len":4},{"id":21,"symbol":"maj#4","mask":"100010110001","len":5},{"id":22,"symbol":"7#11","mask":"100010110010","len":5},{"id":23,"symbol":"M6#11","mask":"100010110100","len":5},{"id":24,"symbol":"7#11b13","mask":"100010111010","len":6},{"id":25,"symbol":"m#5","mask":"100100001000","len":3},{"id":26,"symbol":"mb6M7","mask":"100100001001","len":4},{"id":27,"symbol":"m7#5","mask":"100100001010","len":4},{"id":28,"symbol":"m","mask":"100100010000","len":3},{"id":29,"symbol":"m/ma7","mask":"100100010001","len":4},{"id":30,"symbol":"m7","mask":"100100010010","len":4},{"id":31,"symbol":"m6","mask":"100100010100","len":4},{"id":32,"symbol":"mMaj7b6","mask":"100100011001","len":5},{"id":33,"symbol":"dim","mask":"100100100000","len":3},{"id":34,"symbol":"oM7","mask":"100100100001","len":4},{"id":35,"symbol":"m7b5","mask":"100100100010","len":4},{"id":36,"symbol":"dim7","mask":"100100100100","len":4},{"id":37,"symbol":"o7M7","mask":"100100100101","len":5},{"id":38,"symbol":"4","mask":"100101000010","len":4},{"id":39,"symbol":"madd4","mask":"100101010000","len":4},{"id":40,"symbol":"m7add11","mask":"100101010010","len":5},{"id":41,"symbol":"+add#9","mask":"100110001000","len":4},{"id":42,"symbol":"7#5#9","mask":"100110001010","len":5},{"id":43,"symbol":"7#9","mask":"100110010010","len":5},{"id":44,"symbol":"13#9","mask":"100110010110","len":6},{"id":45,"symbol":"7#9b13","mask":"100110011010","len":6},{"id":46,"symbol":"maj7#9#11","mask":"100110110001","len":6},{"id":47,"symbol":"7#9#11","mask":"100110110010","len":6},{"id":48,"symbol":"13#9#11","mask":"100110110110","len":7},{"id":49,"symbol":"7#9#11b13","mask":"100110111010","len":7},{"id":50,"symbol":"sus2","mask":"101000010000","len":3},{"id":51,"symbol":"M9#5sus4","mask":"101001001001","len":5},{"id":52,"symbol":"sus24","mask":"101001010000","len":4},{"id":53,"symbol":"M9sus4","mask":"101001010001","len":5},{"id":54,"symbol":"11","mask":"101001010010","len":5},{"id":55,"symbol":"9sus4","mask":"101001010010","len":5},{"id":56,"symbol":"13sus4","mask":"101001010110","len":6},{"id":57,"symbol":"9no5","mask":"101010000010","len":4},{"id":58,"symbol":"13no5","mask":"101010000110","len":5},{"id":59,"symbol":"M#5add9","mask":"101010001000","len":4},{"id":60,"symbol":"maj9#5","mask":"101010001001","len":5},{"id":61,"symbol":"9#5","mask":"101010001010","len":5},{"id":62,"symbol":"9b13","mask":"101010001010","len":5},{"id":63,"symbol":"Madd9","mask":"101010010000","len":4},{"id":64,"symbol":"maj9","mask":"101010010001","len":5},{"id":65,"symbol":"9","mask":"101010010010","len":5},{"id":66,"symbol":"6/9","mask":"101010010100","len":5},{"id":67,"symbol":"maj13","mask":"101010010101","len":6},{"id":68,"symbol":"M7add13","mask":"101010010101","len":6},{"id":69,"symbol":"13","mask":"101010010110","len":6},{"id":70,"symbol":"M9b5","mask":"101010100001","len":5},{"id":71,"symbol":"9b5","mask":"101010100010","len":5},{"id":72,"symbol":"13b5","mask":"101010100110","len":6},{"id":73,"symbol":"9#5#11","mask":"101010101010","len":6},{"id":74,"symbol":"maj9#11","mask":"101010110001","len":6},{"id":75,"symbol":"9#11","mask":"101010110010","len":6},{"id":76,"symbol":"69#11","mask":"101010110100","len":6},{"id":77,"symbol":"M13#11","mask":"101010110101","len":7},{"id":78,"symbol":"13#11","mask":"101010110110","len":7},{"id":79,"symbol":"9#11b13","mask":"101010111010","len":7},{"id":80,"symbol":"m9#5","mask":"101100001010","len":5},{"id":81,"symbol":"madd9","mask":"101100010000","len":4},{"id":82,"symbol":"mM9","mask":"101100010001","len":5},{"id":83,"symbol":"m9","mask":"101100010010","len":5},{"id":84,"symbol":"m69","mask":"101100010100","len":5},{"id":85,"symbol":"m13","mask":"101100010110","len":6},{"id":86,"symbol":"mMaj9b6","mask":"101100011001","len":6},{"id":87,"symbol":"m9b5","mask":"101100100010","len":5},{"id":88,"symbol":"m11A","mask":"101101001010","len":6},{"id":89,"symbol":"m11","mask":"101101010010","len":6},{"id":90,"symbol":"b9sus","mask":"110001010010","len":5},{"id":91,"symbol":"11b9","mask":"110001010010","len":5},{"id":92,"symbol":"7sus4b9b13","mask":"110001011010","len":6},{"id":93,"symbol":"alt7","mask":"110010000010","len":4},{"id":94,"symbol":"7#5b9","mask":"110010001010","len":5},{"id":95,"symbol":"Maddb9","mask":"110010010000","len":4},{"id":96,"symbol":"M7b9","mask":"110010010001","len":5},{"id":97,"symbol":"7b9","mask":"110010010010","len":5},{"id":98,"symbol":"13b9","mask":"110010010110","len":6},{"id":99,"symbol":"7b9b13","mask":"110010011010","len":6},{"id":100,"symbol":"7#5b9#11","mask":"110010101010","len":6},{"id":101,"symbol":"7b9#11","mask":"110010110010","len":6},{"id":102,"symbol":"13b9#11","mask":"110010110110","len":7},{"id":103,"symbol":"7b9b13#11","mask":"110010111010","len":7},{"id":104,"symbol":"mb6b9","mask":"110100001000","len":4},{"id":105,"symbol":"7b9#9","mask":"110110010010","len":6}],
    scaleDict: [{"id":0,"name":"major pentatonic","len":5,"modes":["101010010100","101001010010","100101001010","101001010100","100101010010"]},{"id":1,"name":"ionian pentatonic","len":5,"modes":["100011010001","110100011000","101000110001","100011000110","110001101000"]},{"id":2,"name":"mixolydian pentatonic","len":5,"modes":["100011010010","110100101000","101001010001","100101000110","101000110100"]},{"id":3,"name":"neopolitan major pentatonic","len":5,"modes":["100011100010","111000101000","110001010001","100010100011","101000111000"]},{"id":4,"name":"vietnamese 1","len":5,"modes":["100101011000","101011000100","101100010010","110001001010","100010010101"]},{"id":5,"name":"lydian pentatonic","len":5,"modes":["100010110001","101100011000","110001100010","100011000101","110001011000"]},{"id":6,"name":"locrian pentatonic","len":5,"modes":["100101100010","101100010100","110001010010","100010100101","101001011000"]},{"id":7,"name":"minor six pentatonic","len":5,"modes":["100101010100","101010100100","101010010010","101001001010","100100101010"]},{"id":8,"name":"flat six pentatonic","len":5,"modes":["101010011000","101001100010","100110001010","110001010100","100010101001"]},{"id":9,"name":"scriabin","len":5,"modes":["110010010100","100100101001","100101001100","101001100100","100110010010"]},{"id":10,"name":"whole tone pentatonic","len":5,"modes":["100010101010","101010101000","101010100010","101010001010","101000101010"]},{"id":11,"name":"lydian dominant pentatonic","len":5,"modes":["100010110010","101100101000","110010100010","100101000101","101000101100"]},{"id":12,"name":"minor #7M pentatonic","len":5,"modes":["100101010001","101010001100","101000110010","100011001010","110010101000"]},{"id":13,"name":"super locrian pentatonic","len":5,"modes":["100110100010","110100010100","101000101001","100010100110","101001101000"]},{"id":14,"name":"minor hexatonic","len":6,"modes":["101101010001","110101000110","101010001101","101000110110","100011011010","110110101000"]},{"id":15,"name":"augmented","len":6,"modes":["100110011001","110011001100","100110011001","110011001100","100110011001","110011001100"]},{"id":16,"name":"major blues","len":6,"modes":["101110010100","111001010010","110010100101","100101001011","101001011100","100101110010"]},{"id":17,"name":"piongio","len":6,"modes":["101001010110","100101011010","101011010100","101101010010","110101001010","101010010101"]},{"id":18,"name":"prometheus neopolitan","len":6,"modes":["110010100110","100101001101","101001101100","100110110010","110110010100","101100101001"]},{"id":19,"name":"prometheus","len":6,"modes":["101010100110","101010011010","101001101010","100110101010","110101010100","101010101001"]},{"id":20,"name":"mystery #1","len":6,"modes":["110010101010","100101010101","101010101100","101010110010","101011001010","101100101010"]},{"id":21,"name":"whole tone","len":6,"modes":["101010101010","101010101010","101010101010","101010101010","101010101010","101010101010"]},{"id":22,"name":"messiaen's mode #5","len":6,"modes":["110001110001","100011100011","111000111000","110001110001","100011100011","111000111000"]},{"id":23,"name":"ionian (major)","len":7,"modes":["101011010101","101101010110","110101011010","101010110101","101011010110","101101011010","110101101010"]},{"id":24,"name":"major augmented","len":7,"modes":["101011001101","101100110110","110011011010","100110110101","110110101100","101101011001","110101100110"]},{"id":25,"name":"locrian major","len":7,"modes":["101011101010","101110101010","111010101010","110101010101","101010101011","101010101110","101010111010"]},{"id":26,"name":"double harmonic lydian","len":7,"modes":["110010111001","100101110011","101110011100","111001110010","110011100101","100111001011","111001011100"]},{"id":27,"name":"harmonic minor","len":7,"modes":["101101011001","110101100110","101011001101","101100110110","110011011010","100110110101","110110101100"]},{"id":28,"name":"altered","len":7,"modes":["110110101010","101101010101","110101010110","101010101101","101010110110","101011011010","101101101010"]},{"id":29,"name":"augmented heptatonic","len":7,"modes":["100111011001","111011001100","110110011001","101100110011","110011001110","100110011101","110011101100"]},{"id":30,"name":"harmonic major","len":7,"modes":["101011011001","101101100110","110110011010","101100110101","110011010110","100110101101","110101101100"]},{"id":31,"name":"balinese","len":7,"modes":["110101011001","101010110011","101011001110","101100111010","110011101010","100111010101","111010101100"]},{"id":32,"name":"double harmonic major","len":7,"modes":["110011011001","100110110011","110110011100","101100111001","110011100110","100111001101","111001101100"]},{"id":33,"name":"hungarian major","len":7,"modes":["100110110110","110110110100","101101101001","110110100110","101101001101","110100110110","101001101101"]},{"id":34,"name":"flamenco","len":7,"modes":["110110110010","101101100101","110110010110","101100101101","110010110110","100101101101","101101101100"]},{"id":35,"name":"persian","len":7,"modes":["110011101001","100111010011","111010011100","110100111001","101001110011","100111001110","111001110100"]},{"id":36,"name":"enigmatic","len":7,"modes":["110010101011","100101010111","101010111100","101011110010","101111001010","111100101010","111001010101"]},{"id":37,"name":"messiaen's mode #4","len":8,"modes":["111001111001","110011110011","100111100111","111100111100","111001111001","110011110011","100111100111","111100111100"]},{"id":38,"name":"purvi raga","len":8,"modes":["110011111001","100111110011","111110011100","111100111001","111001110011","110011100111","100111001111","111001111100"]},{"id":39,"name":"spanish heptatonic","len":8,"modes":["110111011010","101110110101","111011010110","110110101101","101101011011","110101101110","101011011101","101101110110"]},{"id":40,"name":"bebop","len":8,"modes":["101011010111","101101011110","110101111010","101011110101","101111010110","111101011010","111010110101","110101101011"]},{"id":41,"name":"diminished","len":8,"modes":["101101101101","110110110110","101101101101","110110110110","101101101101","110110110110","101101101101","110110110110"]},{"id":42,"name":"minor six diminished","len":8,"modes":["101101011101","110101110110","101011101101","101110110110","111011011010","110110110101","101101101011","110110101110"]},{"id":43,"name":"kafi raga","len":8,"modes":["100111010111","111010111100","110101111001","101011110011","101111001110","111100111010","111001110101","110011101011"]},{"id":44,"name":"messiaen's mode #6","len":8,"modes":["101011101011","101110101110","111010111010","110101110101","101011101011","101110101110","111010111010","110101110101"]},{"id":45,"name":"composite blues","len":9,"modes":["101111110110","111111011010","111110110101","111101101011","111011010111","110110101111","101101011111","110101111110","101011111101"]},{"id":46,"name":"messiaen's mode #3","len":9,"modes":["101110111011","111011101110","110111011101","101110111011","111011101110","110111011101","101110111011","111011101110","110111011101"]},{"id":47,"name":"messiaen's mode #7","len":10,"modes":["111101111101","111011111011","110111110111","101111101111","111110111110","111101111101","111011111011","110111110111","101111101111","111110111110"]}],
    keyNames: ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"],
// Methods
    transpose: function(mask, offset){
        var res="";
        for (var i=0; i<12; i++) res+= mask[(i+12-offset) % 12];
        return res;
    },
// find the closest key in scale to the given key(i)
    findClosest: function(mask, i){
        var min=Infinity, minI; 
        for (var k=0; k<24; k++)
            if (mask[k % 12]==1)
                if (min>Math.abs(k-i) && Math.abs(k-i)<2
                    && k<=i // only left search allowed
                    ){
                    min=Math.abs(k-i);
                    minI=k % 12;
                }
        return minI;
    },
//
    getTriadByKeyScaleMode: function(key, scale, mode_id, add5){
        var res=Array(12).fill(0);
        var harmony;
        harmony=[(0+key)%12,(4+key)%12,(7+key)%12];
        if (add5 && scale.modes[mode_id][7]==1) harmony.push(7);
        for (var h=0; h<harmony.length; h++) 
    //		if (h!=2 || scale.mask[harmony[h]]==1)	// for the dominant note we don't compromise!
                res[Theory.findClosest(scale.modes[mode_id], harmony[h])]=1; 
                
        var resS="";
        for (var i=0; i<12; i++) resS+=res[i];
        return resS;
    },
//
    getDiatonicChordsByKeyScaleMode: function(key, scale_id, mode_id){
        var scale = Theory.scaleDict[scale_id];
        var mk;
        for (var k=0; k<12; k++) 
        if (scale.modes[mode_id][k]==1) mk=k;
        var res=[];	
        var kc=0;
        for (var k=0; k<12; k++) 
        if (scale.modes[mode_id][k]==1){
            kc++;
            // if the last diatonic chord, add the dominent key (e.g.: for the 7th diatonic chord for C Major, Bo, we add in the key G, and Bo+G => G7)
            res.push({name:"No. "+kc, mask:Theory.getTriadByKeyScaleMode(k, scale, mode_id, k==mk),});
        }
        for (var i=0; i<kc; i++) res[i].mask=Theory.transpose(res[i].mask, key);
        return res;
    }
}

var Rhythm = {
    patterns: [ [], [], [],
        [ // for 3-beat measure
            [1, 0.5, 1, 0.5],
            [1.5, 0.5, 1]
        ],
        [ // for 4-beat measure
            [1, 0.5, 0.5, 1, 0.5, 0.5],
            [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
        ]
    ],
    random: function(bpMeas){
        return this.patterns[bpMeas][Math.floor(Math.random()*this.patterns[bpMeas].length)];
    }
}

var Automation = { // per beat
    noteDensity:    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    pitchRange:     [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    voiceLeading:   [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    upAndDowns:     [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    velocity:       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    syncopation:    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //expression
    tempo:          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    staccato:       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sustainPedal:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

var Motif = {
    lenMeasure: 2,
    new: function(){
        var motif = {};
        return motif;
    }
}

var Context={
    new: function(key, scaleId, mode, bpMeas=4, bpNote=4, bpm=120){
        if (key<0 || key>12) throw "Context: key out of range."
        if (scaleId<0 || scaleId>Theory.scaleDict.length-1) throw "Context: scaleId out of range."
        if (mode<0 || mode>Theory.scaleDict[scaleId].len-1) throw "Context: mode out of range."
        var context = {};
        context.key = key;
        context.scaleId = scaleId;
        context.mode = mode;
        context.bpMeas = bpMeas;
        context.bpNote = bpNote;
        context.bpm = bpm;      
        context.root = 60 + key; 
        context.modeLen = Theory.scaleDict[scaleId].len;
        context.chords = Context.getChords(key, scaleId, mode);
        context.inScale = (note) => Context.inScale(context, note);
        context.getNoteByScaleMove = (note, move) => Context.getNoteByScaleMove(context, note, move);
        return context;
    },
    // To get default chords for current context
    getChords: function(key, scaleId, mode){
        return Theory.getDiatonicChordsByKeyScaleMode(key, scaleId, mode);
    },
    // n: MIDI pitch number, e.g. 60 = C4
    inScale: function(ctx, n){
        if (n<21 || n>108) throw "Theory.inScale: note out of range."
        return Theory.scaleDict[ctx.scaleId].modes[ctx.mode][n % 12]==1;
    },
    // n: current note; m: steps to move up(+) or down(-)
    getNoteByScaleMove: function(ctx, n, m){
        if (!Context.inScale(ctx, n)) throw "Theory.moveByScale: note not in scale.";
        var off = 0, pos = n;
        while (off != m){
            pos = pos + (m > 0 ? 1 : -1);
            while (!Context.inScale(ctx, pos)){
                pos = pos + (m > 0 ? 1 : -1);
            }
            off = off + (m > 0 ? 1 : -1);
        };
        return pos;
    }
}

var Verse={
    show: function(o){
        console.log(o.phrases);
    },
    new: function(context, phrases=[]){
        var verse = {};
        verse.context = context,
        verse.phrases = phrases ? phrases : [],
        verse.show = () => Verse.show(verse);
        return verse;
    }
}

var Phrase={
    show: function(o){
        console.log(o.measures);
    },
    new: function(context, measures=[]){
        var phrase = {};
        phrase.context = context,
        phrase.measures = measures ? measures : [],
        phrase.scale = scale,
        phrase.key = key,
        phrase.show = () => Phrase.show(phrase);
        return phrase;
    }
}

var Measure={
    show: function(o){
        console.log(o.notes);
    },
    getBaseline: function(o){

    },
    new: function(context, notes){
        var measure = {};
        measure.context = context,
        measure.length = context.bpMeas;
        measure.notes = notes ? notes: [];
        measure.show = () => Measure.show(measure);
        return measure;
    }
}

var Note={
    new: function(context, startBeat, duration, pitch, velocity){
        var note = {};
        note.context = context,
        note.pitch = pitch,
        note.velocity = velocity,
        note.startBeat = startBeat,
        note.duration = duration,
        note.split = () => Note.split(note);
        note.merge = () => Note.merge(note);
        note.moveByScale = (m) => Note.moveByScale(note, pitch, m);
        return note;
    },
    split: function(o){

    },
    merge: function(o){
        console.log(o);
    },
    // n: current note; m: steps to move up(+) or down(-)
    moveByScale: function(o, n, m){
        if (!Context.inScale(o.context, n)) throw "Theory.moveByScale: note not in scale.";
        var off = 0, pos = n;
        while (off != m){
            pos = pos + (m > 0 ? 1 : -1);
            while (!Context.inScale(o.context, pos)){
                pos = pos + (m > 0 ? 1 : -1);
            }
            off = off + (m > 0 ? 1 : -1);
        };
        o.pitch = pos;
        return pos;
    }
}

var c1=Context.new(0, 23, 0, 4, 4, 120);
var n1=Note.new(c1, 0, 1, 60, 1);
var m1=Measure.new(c1);

m1.notes.push(n1);

//console.log(m1);

// var m1=Measure.new(null, c1, []);
// var n1=Note.new(m1, null, 60, 1, 1, 1); 
// console.log(n1);

module.exports = { Context, Automation };

//debugger