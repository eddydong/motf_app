// var MidiController={};
// 
// (function(){


if (!navigator.requestMIDIAccess) 
	console.log("MIDI device only supported by Google Chrome");
else {

const keyLag=0;

var smi = new SimpleMidiInput();

console.log("loading midi");

navigator.requestMIDIAccess().then( onsuccesscallback, onerrorcallback );

function onsuccesscallback(midi) {
	smi.attach(midi);
	console.log(smi);	
};

function onerrorcallback(err) {
    console.log('MIDI CONTROLLER ERROR : ' + err.code);
};

var keyMap=[];
for (var i=0; i<88; i++) keyMap.push({});

smi.on('noteOn', function(e) {
	var k=e.key-21;
	console.log("noteOn "+k);
// 	if (k<0 || k>87) return;
// 	if (pianoroll.layer[Work.global.layer_sel].instrument) {
// 		var	t = Tone.now() + pianoroll.layer[Work.global.layer_sel].instrument.timeOffset;
// 		pianoroll.layer[Work.global.layer_sel].instrument.triggerAttack( 
// 			Global.chromatic_scale[k], t, e.velocity/127);		
// 			
// 		keyMap[k].t=Tone.now();
// 		keyMap[k].v=e.velocity/127;
// 	};
});

smi.on('global', function(e) {
	console.log(e);
});

smi.on('noteOff', function(e) {
	var k=e.key-21;
	console.log("noteOff "+k);
// 	if (pianoroll.layer[Work.global.layer_sel].instrument) {
// 		pianoroll.layer[Work.global.layer_sel].instrument
// 			.triggerRelease(Global.chromatic_scale[k],Tone.now());					 	
// 
// 		if (keyMap[k]!={} && pianoroll.isPlaying && pianoroll.recording)
// 			pianoroll.addNote({
// 				x: pianoroll.playStart + (keyMap[k].t-pianoroll.playingFromT)/Tone.Time("16n") + keyLag,
// 				y: k,
// 				d: (Tone.now()-keyMap[k].t)/Tone.Time("16n"),
// 				l: Work.global.layer_sel,
// 				v: keyMap[k].v,
// 				s: 0,
// 				t: 0
// 			});
// 
// 		keyMap[k]={};
// 	}
});

};
// 
// })();

