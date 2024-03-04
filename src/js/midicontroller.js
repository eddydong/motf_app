var MidiController={};

(function(){

const keyLag=0;

var smi = new SimpleMidiInput(); 
MidiController.smi = smi;

if (!navigator.requestMIDIAccess) {
// 	console.log("Current browser does not support MIDI device. Please use Google Chrome."); 
	return;
};

// Warning: Safari does not support MIDI device...
navigator.requestMIDIAccess().then( onsuccesscallback, onerrorcallback );

function onsuccesscallback(midi) {
	smi.attach(midi);
	console.log('success');
};

function onerrorcallback(err) {
    console.log('MIDI CONTROLLER ERROR : ' + err.code);
};

var keyMap=[];
for (var i=0; i<88; i++) keyMap.push({});

smi.on('noteOn', function(e) {
	var k=e.key-21;
	var	t = Tone.now();
	if (e.channel==10){
		// Pad Set A: Pad 1~8 = 36~43 (Use Tonejs: C2-G2; instead of Arturia Minilab: C1-G1)
		// Pad Set B: Pad 1~8 = 44~51 (Use Tonejs: G#2-D#3; instead of Arturia Minilab: G#1-D#2)
		Instruments.drumset.triggerAttack(Global.chromatic_scale[e.key-21], t, e.velocity/127 * pianoroll.volumeScale);
	} else {
		t += pianoroll.layer[Work.global.layer_sel].instrument.timeOffset;
		if (k<0 || k>87) return;
		if (pianoroll.layer[Work.global.layer_sel].instrument) {
			pianoroll.layer[Work.global.layer_sel].instrument.triggerAttack( 
				Global.chromatic_scale[k], t, e.velocity/127 * pianoroll.volumeScale);		
				
			keyMap[k].t=Tone.now();
			keyMap[k].v=e.velocity/127;
		};
	};
});

smi.on('noteOff', function(e) {
	var k=e.key-21;
	if (pianoroll.layer[Work.global.layer_sel].instrument) {
		pianoroll.layer[Work.global.layer_sel].instrument
			.triggerRelease(Global.chromatic_scale[k],Tone.now());					 	

		if (keyMap[k]!={} && pianoroll.isPlaying && pianoroll.recording)
			pianoroll.addNote({
				x: pianoroll.playStart + (keyMap[k].t-pianoroll.playingFromT)/Tone.Time("16n") + keyLag,
				y: k,
				d: (Tone.now()-keyMap[k].t)/Tone.Time("16n"),
				l: Work.global.layer_sel,
				v: keyMap[k].v,
				s: 0,
				t: 0
			});

		keyMap[k]={};
	}
});

smi.on('pitchWheel', function(e) {
	//console.log(e);
});

// refer to mididriver.js for details of the "control" event
smi.on('control', function(e) {
	//console.log(e);
});

})();

