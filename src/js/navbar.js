var Navbar={};

(function() {

var canvas=document.getElementById("canvas-nav");
var ctx = canvas.getContext("2d");
var height, width;
var animID;
var selL=0, span=64, selR= selL+span, len, tickL, nobW=6, offset=0;

function drawNotes(){
	var Ymax=-999, Ymin=999;
	for (var i=0; i<Work.global.seqXY.length; i++)
	{
		if (Ymax<Work.global.seqXY[i].y) Ymax=Work.global.seqXY[i].y;
		if (Ymin>Work.global.seqXY[i].y) Ymin=Work.global.seqXY[i].y;
	};
	var viewportH = Ymax - Ymin + 1 + 10;
	var viewportB = Ymin - 5;

	tickL=width/len;
	var noteH=height/viewportH;

	for (var i=0; i<Work.global.seqXY.length; i++) 
	{
		ctx.save();
		ctx.strokeStyle = "rgba(100,150,80,1)";
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(Work.global.seqXY[i].x * tickL, height-(Work.global.seqXY[i].y-viewportB) * noteH);
		ctx.lineTo(Work.global.seqXY[i].x * tickL + Work.global.seqXY[i].d *tickL, height-(Work.global.seqXY[i].y-viewportB) * noteH);
		ctx.stroke();

		ctx.restore();
	};
}

function drawMeasures(){
	tickL=width/len;
	for (var i=0; i<len; i++)
	if (i % 16 == 0)
	{
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.strokeStyle = "rgba(255,255,255,0.5)";
		ctx.moveTo(tickL*i, 0);
		ctx.lineTo(tickL*i, height);
		ctx.stroke();	
		ctx.restore();
	}	
}

function drawPlayhead(){
	tickL=width/len;

	ctx.save();

	ctx.strokeStyle = "rgba(255,255,255,0.8)";

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.moveTo(pianoroll.playhead * tickL, 0);
	ctx.lineTo(pianoroll.playhead * tickL, height);
	ctx.stroke();	
	
	ctx.restore();
}

function drawSelection(){
	tickL=width/len;

	ctx.save(); 
	ctx.globalCompositeOperation="overlay";
	ctx.fillStyle="rgba(130,220,180,1)";
	ctx.fillRect(
		selL * tickL, 0,
		(selR-selL) * tickL, height);
	ctx.restore();
	
	ctx.save();

	ctx.strokeStyle = "rgba(240,240,190,1)";

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.moveTo(selL * tickL, 0);
	ctx.lineTo(selR * tickL, 0);
	ctx.stroke();	

	ctx.beginPath();
	ctx.lineWidth=12;
	ctx.moveTo(selR * tickL, 0);
	ctx.lineTo(selR * tickL, height);
	ctx.stroke();	

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.moveTo(selR * tickL, height);
	ctx.lineTo(selL * tickL, height);
	ctx.stroke();	

	ctx.beginPath();
	ctx.lineWidth=12;
	ctx.moveTo(selL * tickL, height);
	ctx.lineTo(selL * tickL, 0);
	ctx.stroke();	
	
	ctx.restore();
}

function anim(){
	ctx.fillStyle="#111111";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	drawMeasures();
	drawNotes();
	drawSelection();
	drawPlayhead();
	animID=requestAnimationFrame(anim);
}

function resize(){
	width = window.innerWidth;
	canvas.width = width;
}

function init(){
	updateLen();

	height = document.getElementById("canvas-nav").offsetHeight;
	canvas.height = height;
	resize();

	Navbar.dragType="";

	animID=requestAnimationFrame(anim);
}

function updatePianorollViewport(){
	pianoroll.viewportL=selL;
	pianoroll.viewportW=selR-selL;
}

canvas.onmousedown=(e)=>{
	span=selR-selL;
	tickL=width/len;
	if (e.x > selL*tickL+nobW && e.x < selR*tickL-nobW ) {
		Navbar.dragType="move";
		offset = Math.floor(e.x/tickL)-selL;
	}
	else if (e.x > selL*tickL-nobW && e.x < selL*tickL+nobW) Navbar.dragType="panL";
	else if (e.x > selR*tickL-nobW && e.x < selR*tickL+nobW) Navbar.dragType="panR";
}

function updateLR(){
	selL=pianoroll.viewportL;
	selR=selL+pianoroll.viewportW;
	updateLen();
}

function updateLen(){
//	var tL= 60/Work.global.bpm/16; // len of a 16n in second
	var Xmax=-99999, Xmin=99999;
	for (var i=0; i<Work.global.seqXY.length; i++)
	{
		if (Xmax<Work.global.seqXY[i].x+Work.global.seqXY[i].d) Xmax=Work.global.seqXY[i].x+Work.global.seqXY[i].d;
		if (Xmin>Work.global.seqXY[i].x) Xmin=Work.global.seqXY[i].x;
	};
len= Xmax > pianoroll.viewportL+pianoroll.viewportW
	? Xmax : pianoroll.viewportL+pianoroll.viewportW;
}

window.onmousemove=(e)=>{
	if (Navbar.dragType=="") return;
	
	document.querySelector("#canvas-nav").style.cursor="ew-resize";

	var tickL=width/len;
	if (Navbar.dragType=="move") {
//		if (selR<len){
			var l= Math.floor(e.x/tickL)- offset;
			if (l<0) l=0;
			selL = l;
//		};
//		if (selL>0){
// 			var l=Math.floor(e.x/tickL)- offset;
// 			if (l<0) l=0;
			var r= l+span;
			selR = r;
//		};	
	} 
	else if (Navbar.dragType=="panL") {
		var l= Math.floor(e.x/tickL);
		if (l<0) l=0;
		if (l>selR-pianoroll.minW) l=selR-pianoroll.minW;
		if (r>selR-pianoroll.maxW) r=selR-pianoroll.maxW;
		selL = l;
	} 
	else if (Navbar.dragType=="panR") {
		var r=Math.ceil(e.x/tickL);
//		if (r>pianoroll.seq.length) r=pianoroll.seq.length;
		if (r<selL+pianoroll.minW) r=selL+pianoroll.minW;
		if (r>selL+pianoroll.maxW) r=selL+pianoroll.maxW;
		selR = r;
	} 

	pianoroll.initVW=pianoroll.viewportW;	
	updatePianorollViewport();
	
	updateLen();
}

init();

Navbar.resize=resize;
Navbar.selL=selL;
Navbar.selR=selR;
Navbar.updateLR= updateLR;

}())