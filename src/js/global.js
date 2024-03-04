var Global={};
(function(){

var chromatic_scale=[]; // from A0 up to C8

const roots = "C C# D D# E F F# G G# A A# B".split(" ");

// Global.key=0; // "C" - ref: roots, in Chromatic Scale offset
// 
// Global.scale="Major";

var generate_chromatic_scale=()=>{
	var notes = [];
	for(var i = 0; i < 9; i++) {
	  for(var x = 0; x < roots.length; x++) notes.push(roots[x] + i);
	};
	for (var i=0; i<88; i++) chromatic_scale.push(notes[i+9]);
}

var footerH, headerH;

function resize(){
	footerH = document.getElementById("div-root").offsetHeight;
	headerH = document.getElementById("top-bar-group").offsetHeight
		+document.getElementById("canvas-nav-div").offsetHeight;
}

// to be broken down to Scale-specific
Global.default_params= {

	rhythm: "random",
	
	suggester: [
		{d:0, p:0.2},
		{d:1, p:1},
		{d:-1, p:1},
		{d:2, p:0.5},
		{d:-2, p:0.5},
		{d:3, p:0.7},
		{d:-3, p:0.7},
		{d:4, p:0.3},
		{d:-4, p:0.1},
		{d:7, p:0.0},
		{d:-7, p:0.0}						
	],
	
	iparams: [// all
		[0.2, 0.8], // up_n_down: how zig-zag the progression is 
		[0.1, 0.7], // key_span: max pitch minus min pitch
		[0.3, 0.9], // granularity: number of notes
		[0.4, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
		[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
		[0.0, 1.0]  // self_ref: TBD
	]
};

resize();

generate_chromatic_scale();

Global.generate_chromatic_scale=generate_chromatic_scale;
Global.chromatic_scale = chromatic_scale;
Global.bpm_range = [15, 300];
Global.triplet=0;
Global.dotted=0;
Global.metroVolume=1;
Global.color={};
Global.color.motf="#bb33bb";
Global.color.btn_active="#bb33bb";
Global.color.btn_inactive="#666666";
Global.color.solo_active="#00dd00";
Global.color.solo_inactive="#006600";
Global.color.mute_active="#ff0000";
Global.color.mute_inactive="#660000";
Global.initialSeq=[{x: 0, y: 39, d: 16, v: 3, l: 0, s: 0}];

Global.meter = new Tone.Meter();
Global.meter.normalRange=1;

var meter=document.getElementById("canvas-meter");
var meter_ctx = meter.getContext("2d");

var fallback=0;
const fb_a=0.0001;
var fb_v=0;
const fbW=4;
var maxV=0;

Global.updateMeter=()=>{
var x=meter.getBoundingClientRect().width;
var	y=meter.getBoundingClientRect().height;
meter.width=x; meter.height=y;

	meter_ctx.clearRect(0,0, x, y);

	var v= Math.pow(Global.meter.getValue(),0.3)/2;

//	if (v>maxV) {maxV=v; console.log(maxV);};

	if (fallback<=v) {
		fallback=v; 
		fb_v=0;
	} else if (fallback>v) {
		fb_v+=fb_a;
		fallback=fallback-fb_v;
	};

//	fallback=v;
	
	meter_ctx.fillStyle="rgba(100,255,130,1)";
	meter_ctx.fillRect(0,0,(meter.width-fbW)*v, meter.height);

	if (fallback>0.0001) {
		meter_ctx.fillStyle="rgba(255,255,255,1)";
		meter_ctx.fillRect((meter.width-fbW)*fallback,0,fbW, meter.height);	
	};
};


// now in Work.global
// Global.bpm = 108;
// Global.key = 0;  // offset from C, in chromatic scale
// Global.scale = "Major";

Global.imp_a = 0;

Global.footerH = footerH;
Global.headerH = headerH;

Global.XYtoIJ=()=>{
	const maxnotes=10000;
	const maxch=8;
	
	var n_notes= Work.global.seqXY.length < maxnotes ? Work.global.seqXY.length : maxnotes;

	var res=[];
	var seqL=0; // len in second
	for (var i=0; i<n_notes; i++)
	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].d) > seqL)
		seqL = Work.global.seqXY[i].x+Work.global.seqXY[i].d;

// 	var tickL= 60/ (Work.global.bpm / Work.global.bpNote) /16; // len of a 16n in second
// 
// 	var seqTT= seqL / tickL; // len in total tick

	var seqTT= (seqL % 1 == 0 ? seqL : Math.floor(seqL)+1);

	for (var i=0; i<seqTT; i++)
		res.push({notes:[], sel:0});


	for (var i=0; i<n_notes; i++){
	
	res[Math.floor(Work.global.seqXY[i].x)].notes.push({
		note: Work.global.seqXY[i].y,
		len: Work.global.seqXY[i].d,
		offset: Work.global.seqXY[i].x - Math.floor(Work.global.seqXY[i].x),
		vel: Work.global.seqXY[i].v,
		layer: Work.global.seqXY[i].l,
		sel: Work.global.seqXY[i].s,				
		type: Work.global.seqXY[i].t
	})};
	
	// push in rhythm notes
	// this is something seqXY never have - just dynamically generated, inserted into seqIJ and played
	// aka when playing you can hear it but it would be saved as notes 
	var mt = Work.global.bpMeas / Work.global.bpNote * 16;
	var mn = Math.ceil(seqTT / mt);
	for (var l=0; l<Work.layer.length; l++)
	for (var i=0; i<mn; i++) {
		var ii = i % Work.layer[l].rhythm.length;
		var o=0;
		for (var j=0; j<Work.layer[l].rhythm[ii].length; j++) {
			var tt= i * mt + Math.floor(o);
			if (tt<seqTT)
			res[tt].notes.push({
				note: 0,
				len: Work.layer[l].rhythm[ii][j] * mt,
				offset: o-Math.floor(o),
				vel: 0.1,
				layer: l,
				sel: 0,
				type: 2 // 0 normal note, 1 improvised notes, 2 rhythm beat notes
			});
			o+=Work.layer[l].rhythm[ii][j] * mt;
		};
	};

	Work.global.seqIJ=res;
	
	pianoroll.updateEndTick();
	
};

Tone.context.lookAhead=0.1;

// Global.XYtoIJ=()=>{
// 	var res=[];
// 
// 	var seqL=0;
// 	for (var i=0; i<Work.global.seqXY.length; i++)
// 	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].len) > seqL)
// 		seqL = Work.global.seqXY[i].x+Work.global.seqXY[i].len;
// 
// 	for (var i=0; i<seqL; i++)
// 		res.push({notes:[], sel:0});
// 
// 	for (var i=0; i<Work.global.seqXY.length; i++)
// 	res[Work.global.seqXY[i].x].notes.push({
// 		note: Work.global.seqXY[i].y,
// 		len: Work.global.seqXY[i].len,
// 		vel: Work.global.seqXY[i].vel,
// 		layer: Work.global.seqXY[i].layer,
// 		sel: Work.global.seqXY[i].sel
// 	});
// 
// 	return res;	
// }
// 
// Global.IJtoXY=()=>{
// 	var res=[];
// 	for (var i=0; i<Work.global.seqIJ.length; i++)
// 	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
// 	res.push({
// 		x: i,
// 		y: Work.global.seqIJ[i].notes[j].note,
// 		len: Work.global.seqIJ[i].notes[j].len,
// 		vel: Work.global.seqIJ[i].notes[j].vel,
// 		layer: Work.global.seqIJ[i].notes[j].layer,
// 		sel: Work.global.seqIJ[i].notes[j].sel
// 	});
// 	return res;
// }

}())