var Canvas={};

(function(){

// // var body = document.createElement("body");
// // body.setAttribute('style', 'margin: 0px; background: black;');
// // var cvs = document.createElement("canvas");
// var cvs = document.getElementById("canvas");
// //body.appendChild(cvs);
// var ctx = cvs.getContext("2d");
// cvs.height=window.innerHeight;
// cvs.width=window.innerWidth;

var cvs, ctx;

function init(container){
	cvs = document.getElementById(container);
	cvs.height=window.innerHeight;
	cvs.width=window.innerWidth;
	ctx = cvs.getContext("2d");
	Canvas.ctx = ctx;
	Canvas.width = cvs.width;
	Canvas.height = cvs.height;	
}

var starGlowRange=40;
function getStars(){
	var starPrototypes=[];
	var starPrototypeSize=20;

	for (var h=0; h<12; h++) {
		var star = document.createElement('canvas');

		star.width = starPrototypeSize * starGlowRange * 2; 
		star.height = star.width;
		var ctx = star.getContext("2d");
		
		ctx.save();
		var radgrad = ctx.createRadialGradient(starPrototypeSize*starGlowRange,
		starPrototypeSize*starGlowRange, starPrototypeSize, starPrototypeSize*starGlowRange,
		starPrototypeSize*starGlowRange, starPrototypeSize*starGlowRange);
		
		radgrad.addColorStop(0, 	"hsla("+(h*30+15)+",100%,60%,1)");
		radgrad.addColorStop(0.01, 	"hsla("+(h*30+15)+",100%,60%,0.2)");
		radgrad.addColorStop(0.05, 	"hsla("+(h*30+15)+",100%,60%,0.04)");
		radgrad.addColorStop(0.4, 	"hsla("+(h*30+15)+",100%,60%,0.004)");
		radgrad.addColorStop(1, 	"hsla("+(h*30+15)+",100%,60%,0)");
		
		ctx.fillStyle = radgrad;
		ctx.fillRect(0,0,starPrototypeSize*starGlowRange*2,starPrototypeSize*starGlowRange*2);
        ctx.restore();
        
        starPrototypes.push(star);  
    };
    return starPrototypes;
};

var starPrototypes=getStars();

function drawStar(x,y,r,hi){
	ctx.save();
//	ctx.globalCompositeOperation = "lighter";
	ctx.translate(x, y);
	ctx.drawImage(starPrototypes[hi], -r * starGlowRange, -r * starGlowRange,
		r * starGlowRange*2, r * starGlowRange*2);
	ctx.restore();
};

function drawBall(x,y,r,c){
	ctx.save();
	ctx.beginPath();                               
	ctx.arc(x, y, r, 0, Math.PI * 2, true);  
	ctx.closePath();
	ctx.fillStyle = "rgba("+(35+c*20)+","+(255-c*20)+",120,1)";
	ctx.fill();
	ctx.restore();
}

function drawLine(a,b,c) {
	ctx.save();
    ctx.strokeStyle = c;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
	ctx.restore();
}


function drawText(s, x, y){
	ctx.save();
	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.font = "20px arial";
  	ctx.fillText(s, x, y);
	ctx.restore();
}

function drawCircle(x,y,r,c){
	ctx.save();
	ctx.strokeStyle=c;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.stroke();	
	ctx.restore();
}

function clear(){
	ctx.clearRect(0, 0, cvs.width, cvs.height);
}

// Export

Canvas.init = init;
Canvas.drawStar = drawStar;
Canvas.clear = clear;
Canvas.drawText =drawText;
Canvas.drawLine = drawLine;
Canvas.drawCircle = drawCircle;
})()

