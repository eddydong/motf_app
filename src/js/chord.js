var Chord= {};

(function(){

var legal=(chord)=>{
	var r=true;
// 	if (chord[0]==Chord.prev[0] && chord[1]==Chord.prev[1] && chord[2]==Chord.prev[2]) return false;
	for (var i=0; i<chord.length; i++){
		if (Composer.diatonic_mask[chord[i]]==0) return false;
		if (chord[i]<22 || chord[i]>34) return false;
		var max=-9999, min=9999;
		for (var j=0; j<chord.length; j++) if (i!=j) {
			var o = Composer.getChordOffset(chord[i], chord[j], "diatonic");
			if (max<o) max=o;
			if (min>o) min=o;
		}		
		if (min!=2) {
			r=false;
			break;
		};
	};
	return r;
};

var gen=(prev, meas, l)=>{
	if (meas==l) return;
	
	if (meas>0) for (var i=-1; i<2; i++) if (i!=0){
		var nn=Composer.getNoteByOffset(prev[0], i, "diatonic");
		if (legal([nn,prev[1],prev[2]])) { prev[0]=nn; break; };
	};
	
	pianoroll.addNote({
		x: Work.global.bpMeas / Work.global.bpNote * 16 * meas,
		y: prev[0],
		d: Work.global.bpMeas / Work.global.bpNote * 16, 
		s: 1, 
		v: 3, 
		l: Work.global.layer_sel
	});
	
	if (meas>0) for (var i=-1; i<2; i++) if (i!=0){
		var nn=Composer.getNoteByOffset(prev[1], i, "diatonic");
		if (legal([prev[0],nn,prev[2]])) { prev[1]=nn; break; };
	};

	pianoroll.addNote({
		x: Work.global.bpMeas / Work.global.bpNote * 16 * meas,
		y: prev[1],
		d: Work.global.bpMeas / Work.global.bpNote * 16, 
		s: 1, 
		v: 3, 
		l: Work.global.layer_sel
	});

	if (meas>0) for (var i=-1; i<2; i++) if (i!=0){
		var nn=Composer.getNoteByOffset(prev[2], i, "diatonic");
		if (legal([prev[0],prev[1],nn])) { prev[2]=nn; break; };
	};
	
	pianoroll.addNote({
		x: Work.global.bpMeas / Work.global.bpNote * 16 * meas,
		y: prev[2],
		d: Work.global.bpMeas / Work.global.bpNote * 16, 
		s: 1, 
		v: 3, 
		l: Work.global.layer_sel
	});

	gen(prev, meas+1, l);
}

var update=()=>{
	Chord.prev=copyObj(Chord.root);
	var mn = Math.ceil(pianoroll.endTick / (Work.global.bpMeas / Work.global.bpNote * 16));
	if (mn==0) mn=16;
	gen(Chord.prev, 0, mn);
//	pianoroll.updateEndTick();
//	pianoroll.updateChords();
	pianoroll.autoZoom();
	pianoroll.historyPush("Chord Gen");
}

// learn chord from current layer
var learn=()=>{
	
}

var print=()=>{
	for (var i=0; i<Work.global.chord.length; i++)
	for (var j=0; j<Work.global.chord[i].length; j++)
		pianoroll.addNote({
			x: Work.global.bpMeas / Work.global.bpNote * 16 * i,
			y: Work.global.chord[i][j],
			d: Work.global.bpMeas / Work.global.bpNote * 16, 
			s: 1, 
			v: 3, 
			l: Work.global.layer_sel
		});
	pianoroll.autoZoom("y");
}

Chord.gen=gen;
Chord.update=update;
Chord.legal=legal;
Chord.chord=[];
Chord.root=[27, 31, 34];
Chord.target=[26, 29, 34];
Chord.prev=copyObj(Chord.root);
Chord.learn=learn;
Chord.print=print;


})();