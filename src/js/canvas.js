var tickH = pianoroll.height / pianoroll.viewportH, 
	tickW = pianoroll.width / pianoroll.viewportW;

function Canvas(){
	this.canvas=document.getElementById("canvas-canvas");
	this.ctx = this.canvas.getContext("2d");
	this.stroke = [];
	this.drawing = 0;
 	var self=this;
 	var moved=0;
 	 	
 	// stroke.x/y in unit of tick
	this.canvas.onmousemove=function(e){
		if (self.drawing) self.stroke.push({
			x: e.clientX/tickW+pianoroll.viewportL, 
			y: (self.height-(e.clientY-Global.topMargin))/tickH+pianoroll.viewportB, 
			head:0
		});
		moved=1;
	};
	this.canvas.onmousedown=function(e){
		tickH = pianoroll.height / pianoroll.viewportH;
		tickW = pianoroll.width / pianoroll.viewportW;
	
		self.drawing=1;
		self.stroke.push({
			x: e.clientX/tickW+pianoroll.viewportL, 
			y: (self.height-(e.clientY-Global.topMargin))/tickH+pianoroll.viewportB, 
			head:1
		});		
		moved=0;
	};
	this.canvas.onmouseup=function(e){
		self.drawing=0;
		if (!moved){
			var head, tail;		
			for (var i=0; i<self.stroke.length; i++) {	
				if (self.stroke[i].head) head=i;		
				else if (Math.sqrt(Math.pow((e.clientX/tickW+pianoroll.viewportL
				-self.stroke[i].x)*tickW, 2)+Math.pow(((self.height-(e.clientY-Global.topMargin))
				/tickH+pianoroll.viewportB
				-self.stroke[i].y)*tickH, 2))<=20) {
					tail=null;
					for (var j=head+1; j<self.stroke.length; j++) {
						if (self.stroke[j].head) {
							tail=j-1;
							break;
						};
					};
					if (tail==null) tail = self.stroke.length-1;
					self.stroke.splice(head, tail-head+1);
					break;
				}
			};
			self.stroke.pop();
		};
	};
}
function noSuchNote(note){
	for (var i=0; i<Work.global.seqXY.length; i++)
	if (Math.abs(Work.global.seqXY[i].x-note.x)<0.01 && Work.global.seqXY[i].y==note.y)
		return false;
	return true;
}
Canvas.prototype.print=function(){
	tickH = pianoroll.height / pianoroll.viewportH;
	tickW = pianoroll.width / pianoroll.viewportW;
	
	if (Work.global.printTo=="rhythm") {
		for (var i=0; i<this.stroke.length; i++)
		for (var j=0; j<Work.layer[Work.global.layer_sel].rhythm.length; j++)
		for (var k=0; k<Work.layer[Work.global.layer_sel].rhythm[j].length; k++){
			var rhythmX= (j + Work.layer[Work.global.layer_sel].rhythm[j][k].t)
						 * Work.global.bpMeas / Work.global.bpNote * 16;
			var gapX=this.stroke[i].x-rhythmX;
			var gapY=this.stroke[i].y-Math.floor(this.stroke[i].y);
			if (gapX>-0.2 && gapX<(Work.layer[Work.global.layer_sel].rhythm[j][k].d* Work.global.bpMeas / Work.global.bpNote * 16 -0.5) 
				&& gapY>0.2 && gapY<0.8){
				var note={
							x: rhythmX,
							y: Work.global.scaledKeyboard?Composer.scale[Math.floor(this.stroke[i].y)]
								:Math.floor(this.stroke[i].y), 
							d: Work.layer[Work.global.layer_sel].rhythm[j][k].d* Work.global.bpMeas / Work.global.bpNote * 16, 
							s: 1, 
							v: 3,
							l: Work.global.layer_sel
						};
				
				if (noSuchNote(note))
					pianoroll.addNote(note,"print");
				};
		}
	} else {
		for (var i=0; i<this.stroke.length; i++){
			var res=Work.global.printTo/16;
			var note={
						x: Math.floor(this.stroke[i].x*res)/res,
						y: Work.global.scaledKeyboard ? Composer.scale[Math.floor(this.stroke[i].y)]
							: Math.floor(this.stroke[i].y), 
						d: 1/res<1?1:1/res, 
						s: 1, 
						v: 3,
						l: Work.global.layer_sel
					};
			if (noSuchNote(note))
				pianoroll.addNote(note,"print");
		};
	}
}
Canvas.prototype.resize=function(){
 	this.canvas.width= pianoroll.canvas.width;
	this.canvas.height= pianoroll.canvas.height;
  	this.canvas.style.top= Global.headerH + "px";
  	this.canvas.style.left=0;
 	this.height=this.canvas.height;
 	this.width=this.canvas.width;
}
Canvas.prototype.drawCanvas=function(){
	this.ctx.clearRect(0,0,this.width,this.height);
	this.ctx.fillStyle="rgba(10,20,60,0.4)";
	this.ctx.fillRect(0,0,this.width,this.height);
	this.ctx.strokeStyle="rgba(200,62,200,1)";
	this.ctx.lineWidth = 12;

	tickH = pianoroll.height / pianoroll.viewportH;
	tickW = pianoroll.width / pianoroll.viewportW;

	this.ctx.beginPath();
	for (var i=0; i<this.stroke.length; i++){
		if (this.stroke[i].head)
			this.ctx.moveTo(
				(this.stroke[i].x-pianoroll.viewportL)*tickW,
				this.height-(this.stroke[i].y-pianoroll.viewportB)*tickH
			);
		else 
			this.ctx.lineTo(
				(this.stroke[i].x-pianoroll.viewportL)*tickW,
				this.height-(this.stroke[i].y-pianoroll.viewportB)*tickH
			);
	};
	this.ctx.stroke();
}
Canvas.prototype.show=function(){
	Work.global.showCanvas=1;
	document.getElementById("canvas-canvas").style.display="block";
}
Canvas.prototype.hide=function(){
	Work.global.showCanvas=0;
	document.getElementById("canvas-canvas").style.display="none";
}
