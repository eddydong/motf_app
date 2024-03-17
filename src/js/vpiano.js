var vKeyboard= {};
(function(){
const keymapScaled=[81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, // q to ]
     			    49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187]; // 1 to =
     			    
const keymapChroma=[81,50,87,51,69,  82,53,84,54,89,55,85, 73,57,79,48,80, 219,187,221];

const keyLag = 0; //-0.6;

var keyMap=Array(88).fill(0);

function startNote(k){
	if (keyMap[k]!=0) return;
	if (pianoroll.layer[Work.global.layer_sel].instrument) {
		var	t = Tone.now() + pianoroll.layer[Work.global.layer_sel].instrument.timeOffset;
		keyMap[k] = Tone.now();
		pianoroll.layer[Work.global.layer_sel].instrument.triggerAttack( 
			Global.chromatic_scale[k], t, pianoroll.volumeScale);
	};
};

function stopNote(k){
	if (pianoroll.layer[Work.global.layer_sel].instrument) {
		pianoroll.layer[Work.global.layer_sel].instrument
			.triggerRelease(Global.chromatic_scale[k], Tone.now());

		if (keyMap[k]!=0 && pianoroll.isPlaying && pianoroll.recording){
			var xxx=pianoroll.playStart + (keyMap[k]-pianoroll.playingFromT)/Tone.Time("16n") + keyLag;
			if (xxx>=0){
				pianoroll.addNote({
					x: xxx,
					y: k,
					d: (Tone.now()-keyMap[k]+0.1)/Tone.Time("16n"),
					l: Work.global.layer_sel,
					v: 1,
					s: 0,
					t: 0
				});
			};
		};

		keyMap[k]=0;
	};
};

var octave = 4;

function onkeydown(e){
	// octave shift
	var k;
	var octStart = 3+12*(octave-1)+Work.global.key;
	if (keymapScaled.indexOf(e.keyCode)>=0 && Work.global.scaledKeyboard==1) 
		k=Composer.scale[keymapScaled.indexOf(e.keyCode)+Composer.scale.indexOf(octStart)];
	if (keymapChroma.indexOf(e.keyCode)>=0 && Work.global.scaledKeyboard==0)
		k=keymapChroma.indexOf(e.keyCode)+octStart;
	//console.log(k);
	if (k) startNote(k);		
};

function onkeyup(e){
	var k;
	var octStart = 3+12*(octave-1)+Work.global.key;
	if (keymapScaled.indexOf(e.keyCode)>=0 && Work.global.scaledKeyboard==1)
		k=Composer.scale[keymapScaled.indexOf(e.keyCode)+Composer.scale.indexOf(octStart)];
	if (keymapChroma.indexOf(e.keyCode)>=0 && Work.global.scaledKeyboard==0)
		k=keymapChroma.indexOf(e.keyCode)+octStart;
	if (k) stopNote(k);
};

vKeyboard.onkeydown=onkeydown;
vKeyboard.onkeyup=onkeyup;
}())