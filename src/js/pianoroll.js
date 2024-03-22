function Pianoroll(){
	this.anim;
	this.resolution="16n";
	this.leadTick=16;
	this.canvas=document.getElementById("canvas-main");
	this.ctx = this.canvas.getContext("2d");
	this.left = 0;
	this.top = 0;
	this.width = this.canvas.width;
	this.height = this.canvas.height;
 	this.minW= Work.global.bpMeas * 2 * (16 / Work.global.bpNote)+1;
 	this.maxW= Work.global.bpMeas * 32 * (16 / Work.global.bpNote)+1;
	this.viewportL = 0;  // left most column position in timeline
	this.viewportW = this.maxW; // number of columns / 8n's
	this.viewportH = vH(); // height of viewport in rows (key's)
	this.viewportB = 0; // bottom row key on piano
	this.isMetronomeOn=1;
	this.playhead=0; // for visual
	this.playTick=0; // for actual play control
	this.moved=0; 
	this.mouseDown=0;
	this.writingNoteLen=0;
 	this.isWriting=0;
 	this.selX1=-1; 
 	this.selX2=-1; 
 	this.selY1=-1;
 	this.selY2=-1;
 	this.selCol=-1;
 	this.curX=null;
 	this.isPlaying=0;
 	//this.playingFromT=0;
 	this.autoScrolling=0;
 	this.curY=null;
 	this.clipboard=[];
	this.history=[];
 	this.historyPos=-1;
 	this.newNote=null;
 	this.endTick=0;
 	this.selEnd=-Infinity;
 	this.curNote;
 	this.dragType="rect";
 	this.panX;
 	this.panY;
 	this.layer=[];
 	this.master={};
 	this.chord=[];
	this.rootSeeds=[];
	this.currentSeeds=[];
	this.currentSel=new Set();
	this.currentSelCount=0;
	this.lastPedal=0;	
	this.recording=1;
	this.vKeyboardOn=0;
	this.volumeScale = 2;
	this.outFocusNoteOpacity = 0.2;
	this.rollScheme ={
		whiteKeys: 0.25,
		blackKeys: 0.2,
		altMeas: 0.08,	
		whiteKeysAlt: 0.25,		
		blackKeysAlt: 0.2,		
		altMeasAlt: 0.08		
	};
	this.dimDuration = 0.5;

 	var self=this, ctx=this.ctx;

	this.canvas.onmousemove=function(e){
//	console.log(e.clientX, e.clientY);
		if (Navbar.dragType!="") return;

		self.curX=e.clientX;
		self.curY=e.clientY-Global.headerH; 

		var w=self.width / self.viewportW;	
		var h=self.height / self.viewportH;			

		self.moved=1;
		
		//when holding a new note: auditing
		if (self.newNote) {
			var y = e.clientY-Global.headerH; // 100: total height of toolbar 1 & 2
			var tickY = Math.floor((self.height-y)/h + self.viewportB);	
			if (self.lastKey!=tickY){
				var ins=self.layer[Work.global.layer_sel].instrument;
				if (ins) {
					ins.releaseAll();
					ins.triggerAttackRelease(
						Global.chromatic_scale[Work.global.scaledKeyboard?Composer.scale[tickY]:tickY],
						0.25, Tone.now(), self.volumeScale
					);
				}			
				self.lastKey=tickY;
			};
		} 

		if (self.mouseDown){
		
			if (e.metaKey) Controls.tempDrag="rect";
//			else if (e.shiftKey) Controls.tempDrag="zoom";
			else if (e.altKey) Controls.tempDrag="meas";
			else if (e.ctrlKey) Controls.tempDrag="span";
//			else if (Controls.spaceDown) Controls.tempDrag="pan";

		 	var ins= Controls.tempDrag=="" ? self.dragType : Controls.tempDrag;

			if (ins=="span") {
				self.selX2=self.viewportL+self.curX/self.width*self.viewportW;
				self.selectNotes(self.selX1, 0, self.selX2, vH()-1, e.shiftKey);
			} else	
			if (ins=="rect"){
				self.selX2=self.viewportL+self.curX/self.width*self.viewportW;
				self.selY2=self.viewportB+(1-self.curY/self.height)*self.viewportH;
				self.selectNotes(self.selX1, self.selY1, self.selX2, self.selY2, e.shiftKey);
			} else 
// 			if (ins=="pan"){
// 				self.selX2=self.panX+self.curX/self.width*self.viewportW;
// 				self.selY2=self.panY+(1-self.curY/self.height)*self.viewportH;
// 				self.viewportL= -self.selX2+self.selX1+self.panX;
// 				if (self.viewportL<0) self.viewportL=0;
// 				self.viewportB= -self.selY2+self.selY1+self.panY;
// 				if (self.viewportB<0) self.viewportB=0;
// 				if (self.viewportB+self.viewportH>vH()) self.viewportB=vH()-self.viewportH;
// 				Navbar.updateLR();
// 			} else
// 			if (ins=="zoom"){
// 				self.selX2=self.panX+(self.curX/self.width*self.viewportW);
// 				self.selY2=self.panY+((1-self.curY/self.height)*self.viewportH);
// 				self.viewportW= -self.selX2+self.selX1+self.viewportW;
// 				if (self.viewportW<self.minW) self.viewportW=self.minW;
// 				if (self.viewportW>self.maxW) self.viewportW=self.maxW;
// 				self.viewportH= -self.selY2+self.selY1+self.viewportH;
// 				if (self.viewportH<12) self.viewportH=12;
// 				if (self.viewportB+self.viewportH>vH()) self.viewportH=vH()-self.viewportB;
// 				Navbar.updateLR();
//			} else
			if (ins=="meas"){
				var selTick=self.viewportL+Math.floor(self.curX/self.width*self.viewportW);
				let tickPerMeas= Work.global.bpMeas * 4;
				
				if (selTick<self.selX1){
					self.selX1= (Math.floor(self.selX1 / tickPerMeas) + 1) * tickPerMeas - 1;
					self.selX2= Math.floor(selTick / tickPerMeas) * tickPerMeas;
				} else {
					self.selX1= Math.floor(self.selX1 / tickPerMeas) * tickPerMeas;
					self.selX2= (Math.floor(selTick / tickPerMeas)+1) * tickPerMeas  - 1;
				};
				self.selectNotes(self.selX1, 0, self.selX2, vH()-1, e.shiftKey);
			};
		};
	};
	
	this.canvas.onmousedown=function(e){
	
		Navbar.dragType="";

		// critical variables to control current selection 
		// (could be click, rect, span, or meas)
		self.currentSel.clear();
		self.currentSelCount=0;

		self.moved=0;
		self.mouseDown=1;
		self.selX1=self.viewportL+Math.floor(e.clientX/self.width*self.viewportW);
		self.selX2=self.selX1;
		
		var x = e.clientX;
		var y = e.clientY-Global.headerH; // 100: total height of toolbar 1 &2
		var w = self.width / self.viewportW;	
		var h = self.height / self.viewportH;			
		var tickX = Math.floor(x/w+self.viewportL);	
		var tickY = Math.floor((self.height-y)/h+self.viewportB);	

	 	var ins= Controls.tempDrag=="" ? self.dragType : Controls.tempDrag;		
		self.selY1=self.viewportB+Math.floor((1-y/self.height)*self.viewportH);
		self.selY2=self.selY1;
		self.panX=self.viewportL;
		self.panY=self.viewportB;

		if (ins=="meas"){
			self.selY1=self.viewportB+Math.floor((1-y/self.height)*self.viewportH);
			self.selY2=self.selY1;
		};

		// place new note
		if (self.newNote && e.button==0 && self.moved==0){
			self.addNote({
				x: tickX,
				y: Work.global.scaledKeyboard ? Composer.scale[tickY] : tickY,
				d: Tone.Time(self.newNote).toSeconds()/Tone.Time("16n").toSeconds(), 
				s: 1, 
				v: 0.5, 
				p: 1,
				l: Work.global.layer_sel
			});
			self.newNote=null;
			self.historyPush();
		};
		
		var w=self.width / self.viewportW;	
		var h=self.height / self.viewportH;	

	};
	this.canvas.onmouseup=function(e){
		if (Navbar.dragType!="") return;

		self.mouseDown=0;
		self.selX1=-1;
		self.selX2=-1;
		self.selY1=-1;
		self.selY1=-1;	

		var x = e.clientX;
		var y = e.clientY-Global.headerH; // 100: total height of toolbar 1 & 2
		var w = self.width / self.viewportW;	
		var h = self.height / self.viewportH;
		var tickX = Math.floor(x/w+self.viewportL);	
		var tickY = Math.floor((self.height-y)/h+self.viewportB);	

		if (e.metaKey) self.selectNotes(tickX,tickY,tickX,tickY,Work.global.through);

		if (self.currentSelCount==0) {
			self.deSelectAll();			
			var theNote=self.getNote(x,y);
			if (theNote!=undefined && ((Work.global.seqXY[theNote].l==Work.global.layer_sel)||e.shiftKey)) {
				Work.global.seqXY[theNote].s=1;
				var ins=self.layer[Work.global.layer_sel].instrument;
				if (ins) ins.triggerAttackRelease(
					Global.chromatic_scale[Work.global.seqXY[theNote].y],
					Work.global.seqXY[theNote].d*Tone.Time("8n"),
					Tone.now(), Work.global.seqXY[theNote].v * self.volumeScale
				);
			} else {
				self.playhead=(x/w)+self.viewportL;		
				self.playTick=Math.floor(self.playhead);	
				if (self.isPlaying) {
					self.selStart = self.playhead;		
					self.startT = Tone.now();
				};
			
				if (!self.isPlaying && (Controls.tempDrag=="" ? self.dragType : Controls.tempDrag)!="audi") {
					// pre-audi current key
					var ins=self.layer[Work.global.layer_sel].instrument;
					if (ins) ins.triggerAttackRelease(
						Global.chromatic_scale[Work.global.scaledKeyboard?Composer.scale[tickY]:tickY],
						0.5, Tone.now(), 0.5 * self.volumeScale
					);					
				};
			}			
		} else {
		// if multiple selection changes happen
		};			
	};
};

function vH(){
	return Work.global.scaledKeyboard?Composer.scale.length:88;
}

Pianoroll.prototype.selectMeas=function(x1,x2, through){
	this.deSelectMeas();
	if (x1>x2) {
		tx=x1;
		x1=x2;
		x2=tx;
	};
	if (x2>Work.global.seqIJ.length-1) x2=Work.global.seqIJ.length-1;
	if (x1<=Work.global.seqIJ.length-1)
	for (var i=x1; i<=x2; i++) Work.global.seqIJ[i].sel=1;
}
Pianoroll.prototype.deSelectMeas=function(){
	for (var i=0; i<Work.global.seqIJ.length; i++) Work.global.seqIJ[i].sel=0;
}

Pianoroll.prototype.addNote=function(note, cause){
	Work.global.seqXY.push(note);
	this.updateEndTick(); 	
	if (cause!=undefined) this.historyPush(cause);
//	pianoroll.updateChords();
//	Controls.saveTemp();	
}

Pianoroll.prototype.updateEndTick=function(){
	var precision = 0.01;

	this.endTick=-Infinity;
	this.startTick=Infinity;

	for (var i=0; i<Work.global.seqXY.length; i++) 
	if (Work.layer[Work.global.seqXY[i].l].type != "chord" 
	&& Work.layer[Work.global.seqXY[i].l].type != "percussion") {
		if ((Work.global.seqXY[i].x+Work.global.seqXY[i].d) - this.endTick > precision)
			this.endTick = (Work.global.seqXY[i].x+Work.global.seqXY[i].d);
		if (this.startTick - Work.global.seqXY[i].x > precision)
			this.startTick = (Work.global.seqXY[i].x);
	}
			
	if (this.endTick == -Infinity) this.endTick = 0;
	if (this.startTick ==  Infinity) this.startTick = 0;

	this.endTick= (this.endTick % 1 == 0 ? this.endTick : Math.floor(this.endTick)+1);
	this.startTick= (this.startTick % 1 == 0 ? this.startTick : Math.floor(this.startTick)+1);

	this.endMeas = Math.floor(this.endTick / (Work.global.bpMeas / Work.global.bpNote * 16));			

	this.unsaved = true;

	Navbar.updateLR();		
}
Pianoroll.prototype.selectNotes=function(x1,y1,x2,y2,through){
	var left = x1 < x2 ? x1 : x2;
	var right = x1 < x2 ? x2 : x1;
	var top = y1 < y2 ? y2 : y1;
	var bottom = y1 < y2 ? y1 : y2;
	this.playhead=left;
	var tickL= 60/ (Work.global.bpm / Work.global.bpNote) /16; // len of a 16n in second

	for (var i=0; i<Work.global.seqXY.length; i++)
	if (!this.currentSel.has(i)){
		if (
			(Work.global.seqXY[i].x+Work.global.seqXY[i].d)>left 
			&& Work.global.seqXY[i].x<=right 
			&& (Work.global.scaledKeyboard?scaleY(Work.global.seqXY[i].y).key:Work.global.seqXY[i].y)>=(bottom-1)
			&& (Work.global.scaledKeyboard?scaleY(Work.global.seqXY[i].y).key:Work.global.seqXY[i].y)<=top
			&& (Work.global.seqXY[i].l==Work.global.layer_sel || through) 
		) {
			this.currentSelCount++; 
			Work.global.seqXY[i].s=1-Work.global.seqXY[i].s;
			this.currentSel.add(i);
		};
	};
//	Controls.saveTemp();		
};

Pianoroll.prototype.scroll=function(dir, step){
	if (dir=="up") { if (this.viewportB<vH()-this.viewportH) this.viewportB++};
	if (dir=="down") { this.viewportB--; if (this.viewportB<=0) this.viewportB=0; };
	if (dir=="left") { this.viewportL-=step; if (this.viewportL<=0) this.viewportL=0;};
	if (dir=="right") this.viewportL+=step;
	if (dir=="top") this.viewportB=vH()-this.viewportH;
	if (dir=="bottom") this.viewportB=0;
	if (dir=="beginning") {
		this.viewportL=0;
		this.playhead=this.startTick;
		this.playTick=0;
	};
	if (dir=="end") {
		var h=this.endTick-this.viewportW+1;
		this.viewportL= h>=0 ? h : 0;
		this.playhead=this.endTick;
	};
	Navbar.updateLR();
};
Pianoroll.prototype.historyPush=function(action){
	if (this.history[this.historyPos-1] && this.history[this.historyPos-1].cause==action 
		&& action!=null){
		this.history.pop();		
	} else {
		var hislen=this.history.length;
		for (var i=0; i<hislen-1-this.historyPos; i++){
			this.history.pop();
		};
		this.historyPos++;
	};
	this.history.push({cause: action, data: copyObj(Work)});
};
Pianoroll.prototype.undo=function(){
	this.stop();
	if (this.historyPos>0) {
		this.historyPos--;
		Work=copyObj(this.history[this.historyPos].data);
	 	if (this.history[this.historyPos+1].cause){
			if (this.history[this.historyPos+1].cause.includes("Layer")) Controls.init();
		};
		this.updateEndTick();
//		Controls.saveTemp();
	};
};
Pianoroll.prototype.redo=function(){
	this.stop();
	if (this.historyPos<this.history.length-1) {
		this.historyPos++;
		Work=copyObj(this.history[this.historyPos].data);
		if (this.history[this.historyPos].cause){
			if (this.history[this.historyPos].cause.includes("Layer")) Controls.init();
		};
		this.updateEndTick(); 	
//		Controls.saveTemp();
	};
};
Pianoroll.prototype.delNotes=function(){
	this.stop();
	var s=[];
	for (var i=0; i<Work.global.seqXY.length; i++) {
		if (Work.global.seqXY[i].s===0) 
			s.push(copyObj(Work.global.seqXY[i]));
	};
	Work.global.seqXY=s;
	this.updateEndTick();	
	this.historyPush("del note");
	
//	pianoroll.updateChords();
//	Controls.saveTemp();
};
Pianoroll.prototype.move=function(dir, alt){
//		var tickL= 60/ (Work.global.bpm / Work.global.bpNote) /16; // len of a 16n in second

	var top= -Infinity, left= Infinity, right= -Infinity, bottom= Infinity;
	for (var i=0; i<Work.global.seqXY.length; i++)
	if (Work.global.seqXY[i].s==1)
	{
		if (left>Work.global.seqXY[i].x) left=Work.global.seqXY[i].x;
		if (right<(Work.global.seqXY[i].x+Work.global.seqXY[i].d)-1) 
			right=(Work.global.seqXY[i].x+Work.global.seqXY[i].d)-1;
// 		var yy= Work.global.scaledKeyboard ?
// 				scaleY(Work.global.seqXY[i].y).key
// 				: Work.global.seqXY[i].y;
		var yy=Work.global.seqXY[i].y;

		var cc=0, yyy;
		for (var ii=yy+1; ii<yy+12; ii++) {
			cc++;
			if (ii<88 && Composer.diatonic_mask[ii]==1) break;
		}				
		yyy = yy + (Work.global.scaledKeyboard?(alt==12?12:cc):alt);
		if (top<yyy) top=yyy;
		cc=0;
		for (var ii=yy-1; ii>yy-12; ii--) {
			cc++;
			if (ii>0 && Composer.diatonic_mask[ii]==1) break;
		}				
		yyy = yy - (Work.global.scaledKeyboard?(alt==12?12:cc):alt);
		if (bottom>yyy) bottom=yyy;		
	};
	
	if (dir=="up" && top<=87){
		for (var i=0; i<Work.global.seqXY.length; i++) {
			if (Work.global.seqXY[i].s==1) {
				var yy=Work.global.seqXY[i].y;				
				var cc=0;
				for (var ii=yy+1; ii<yy+12; ii++) {
					cc++;
					if (ii<88 && Composer.diatonic_mask[ii]==1) break;
				}				
				alt = Work.global.scaledKeyboard?(alt==12?12:cc):alt;
				Work.global.seqXY[i].y+=alt;
				var ty = Work.global.scaledKeyboard ?
						 scaleY(Work.global.seqXY[i].y).key
						 : Work.global.seqXY[i].y;
				if (this.viewportB < ty-this.viewportH+1)
					this.viewportB = ty-this.viewportH+1;			
			};
		};
	};
	if (dir=="down" && bottom>=0){
		for (var i=0; i<Work.global.seqXY.length; i++) {
			if (Work.global.seqXY[i].s==1) {
				var yy=Work.global.seqXY[i].y;				
				var cc=0;
				for (var ii=yy-1; ii>yy-12; ii--) {
					cc++;
					if (ii>0 && Composer.diatonic_mask[ii]==1) break;
				}				
				alt = Work.global.scaledKeyboard?(alt==12?12:cc):alt;
				Work.global.seqXY[i].y-=alt;
				var ty = Work.global.scaledKeyboard ?
						 scaleY(Work.global.seqXY[i].y).key
						 : Work.global.seqXY[i].y;
				if (this.viewportB > ty)
					this.viewportB = ty;
			};
		};
	};
	
	if (dir=="up" || dir=="down") {
		if (this.selCount()==1){
			var i, j;
			for (var ii=0; ii<Work.global.seqXY.length; ii++)
			if (Work.global.seqXY[ii].s) {
				i=ii;
				break;
			};
			var ins = this.layer[Work.global.layer_sel].instrument;
			if (ins) {
				ins.triggerAttackRelease(Global.chromatic_scale[Work.global.seqXY[i].y], 
				Tone.Time("8n"), Tone.now(), this.volumeScale);	
			};
		};
	};
	
	if (dir=="right"){
		for (var i=0; i<Work.global.seqXY.length; i++)
			if (Work.global.seqXY[i].s==1) {
				Work.global.seqXY[i].x+=alt;
// 				if (this.viewportL < Work.global.seqXY[i].x+Work.global.seqXY[i].d-this.viewportW+1)
// 					this.viewportL = Work.global.seqXY[i].x+Work.global.seqXY[i].d-this.viewportW+1;
			};
	};

	if (dir=="left"){
		for (var i=0; i<Work.global.seqXY.length; i++){
			var offset=alt;
			if (left<offset) offset=left;
			if (Work.global.seqXY[i].s==1) {
				Work.global.seqXY[i].x-=offset;
// 				if (this.viewportL > Work.global.seqXY[i].x)
// 					this.viewportL = Work.global.seqXY[i].x;
			};
		};
	};

	if (dir=="right" || dir=="left")
		pianoroll.updateEndTick();

	this.historyPush("MOVE");

//	pianoroll.updateChords();

//	Controls.saveTemp();	
};

Pianoroll.prototype.deSelectAll=function(){
	for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].s==1) 
			Work.global.seqXY[i].s=0;
	this.historyLastAction=null;
//	Controls.saveTemp();	
};
Pianoroll.prototype.selCount=function(){
	var c=0;
	for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].s==1) {
			c++;
	};
	return c;
};
Pianoroll.prototype.selectedNotes=function(){
	var r=[];
	for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].s==1) {
			r.push(i);
	};
	return r;
};
Pianoroll.prototype.trisect=function(){
	var r=this.selectedNotes();
	for (var i=0; i<r.length; i++){
		Work.global.seqXY.push({
			x: Work.global.seqXY[r[i]].x+Work.global.seqXY[r[i]].d*1/3,
			y: Work.global.seqXY[r[i]].y,
			d: Work.global.seqXY[r[i]].d/3,
			v: Work.global.seqXY[r[i]].v,
			l: Work.global.seqXY[r[i]].l,
			s: 1,
			p: 1
		});
		Work.global.seqXY.push({
			x: Work.global.seqXY[r[i]].x+Work.global.seqXY[r[i]].d*2/3,
			y: Work.global.seqXY[r[i]].y,
			d: Work.global.seqXY[r[i]].d/3,
			v: Work.global.seqXY[r[i]].v,
			l: Work.global.seqXY[r[i]].l,
			s: 1
		});
		Work.global.seqXY[r[i]].d=Work.global.seqXY[r[i]].d/3;
	}
	this.historyPush("trisect");
//	Controls.saveTemp();		
};

Pianoroll.prototype.bisect=function(){
	var r=this.selectedNotes();
	for (var i=0; i<r.length; i++){
		Work.global.seqXY.push({
			x: Work.global.seqXY[r[i]].x+Work.global.seqXY[r[i]].d/2,
			y: Work.global.seqXY[r[i]].y,
			d: Work.global.seqXY[r[i]].d/2,
			v: Work.global.seqXY[r[i]].v,
			l: Work.global.seqXY[r[i]].l,
			s: 1,
			p: 1
		});
		Work.global.seqXY[r[i]].d=Work.global.seqXY[r[i]].d/2;
	}
	this.historyPush("bisect");	
//	Controls.saveTemp();		
};

Pianoroll.prototype.merge=function(){
	var r=this.selectedNotes();
	
	if (r.length<=1) return;
	
	var connectedSamekey=true;
	var totalLen=0;
	var k0=Work.global.seqXY[r[0]].y;
	for (var i=1; i<r.length; i++) 
		if (Work.global.seqXY[r[i]].y!=k0) {
			connectedSamekey=false;
			break;
			return;
		}
	
	var max=-Infinity, min=Infinity;
	for (var i=0; i<r.length; i++) {
		if (max<Work.global.seqXY[r[i]].x+Work.global.seqXY[r[i]].d)
			max=Work.global.seqXY[r[i]].x+Work.global.seqXY[r[i]].d;
		if (min>Work.global.seqXY[r[i]].x)
			min=Work.global.seqXY[r[i]].x;
	}
	
	var d=max-min

	this.delNotes();
	
	Work.global.seqXY.push({
		x: min,
		y: k0,
		d: d,
		l: Work.global.layer_sel,
		s: 1,
		v: 1
	});

	this.updateEndTick();
	
	this.historyPush("merge");	
//	Controls.saveTemp();		
};

Pianoroll.prototype.drawPianoRoll=function(){
// pink 255,100,255

	var octpos;
	var h=this.height / this.viewportH;
	var w=this.width / this.viewportW;
	
	var tickPerMeas = Work.global.bpMeas * (16/Work.global.bpNote)	

	// draw Rhythm
	
	// draw Rhythm
	// if (Work.global.showRhythm) {
	// var mt= Work.global.bpMeas / Work.global.bpNote * 16; // ticks in a measure
	// var mw= w * mt; //measure width
	// var tog=1;
	// var alpha=1;
	// this.ctx.save();
	// for (var i=0; i<this.endTick; i++)
	// if (i % mt ==0){
	// 	var ii = Math.floor(i/mt) % Work.layer[Work.global.layer_sel].rhythm.length;
	// 	if (Math.floor(i/mt) >= Work.layer[Work.global.layer_sel].rhythm.length) alpha=0.5;
	// 	var xo= i * w - this.viewportL * w;  // x offset	
	// 	var oo=0;	
	// 	for (var j=0; j<Work.layer[Work.global.layer_sel].rhythm[ii].length; j++) {
	// 		tog=1-tog;	
 	// 		this.ctx.fillStyle = "rgba(100,150,200,"+(tog==0?0.3*alpha:0.7*alpha)+")";
	// 		this.ctx.fillRect(	xo + mw * oo +1.5,
	// 							0,
	// 							mw * Work.layer[Work.global.layer_sel].rhythm[ii][j]-1.5,
	// 							this.height
	// 						 );
	// 		oo+=Work.layer[Work.global.layer_sel].rhythm[ii][j];
	// 	};
	// };			
	// this.ctx.restore();			
	// };
	
	// draw horizontal lines (piano key lines)
	for (var i=Math.floor(this.viewportB); i<Math.ceil(this.viewportH+this.viewportB); i++){
		octpos= i % 12;
		if (octpos == 1 || octpos == 4 || octpos == 6 
			|| octpos == 9 || octpos == 11)
		this.ctx.fillStyle= motf.color.get('white',this.rollScheme.blackKeysAlt);
		else this.ctx.fillStyle= motf.color.get('white',this.rollScheme.whiteKeysAlt);
		this.ctx.fillRect(0,this.height-(i-this.viewportB)*h-h,
			this.width,h-1);
	};

	// draw vertical lines
	for (var i=Math.floor(this.viewportL); i<Math.ceil(this.viewportL+this.viewportW); i++){
		// odd measures
		if (Math.floor(i / tickPerMeas) % 2 ==1) {
			this.ctx.fillStyle= motf.color.get('white',this.rollScheme.altMeasAlt)
			this.ctx.fillRect(w*(i-this.viewportL),0,w,this.height);
		};
		// beginning column
		if (i == this.startTick-1) {
			this.ctx.fillStyle=motf.color.get("yellow",0.5);
			this.ctx.fillRect(w*(i-this.viewportL),0,w,this.height);
		};
		// ending column
		if (i == this.endTick) {
			this.ctx.fillStyle=motf.color.get("yellow",0.5);
			this.ctx.fillRect(w*(i-this.viewportL),0,w,this.height);
		};

		// thin vertical tick separating lines
		var lod = 4;
		if (this.viewportW / 32 > 8) lod= 8;
		if (this.viewportW / 32 > 16) lod= 16;
		if (this.viewportW / 32 < 4) lod= 2;
		if (this.viewportW / 32 < 2) lod= 1;

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth=1;
		if (i % (tickPerMeas/Work.global.bpMeas) ==0) 
			this.ctx.strokeStyle = "rgba(0,0,0,1)";
		else 
			this.ctx.strokeStyle = "rgba(0,0,0,0.1)";

		if (i % lod ==0){
		this.ctx.moveTo(w*(i-this.viewportL), 0);
		this.ctx.lineTo(w*(i-this.viewportL), this.height);
		this.ctx.stroke();
		};
		this.ctx.restore();
	};
	
// 	// draw vertical lines
// 	for (var i=0; i<Math.ceil(this.viewportW); i++){
// 		// odd measures
// 		if (Math.floor((i+this.viewportL) / tickPerMeas) % 2 ==1) {
// 			this.ctx.fillStyle="rgba(255,255,255,0.15)";
// 			this.ctx.fillRect(w*(i-this.viewportL+Math.floor(this.viewportL)),0,w,this.height);
// 		};
// 		// beginning column
// 		if (Math.floor(i+this.viewportL) == 0 && this.endTick>0) {
// 			this.ctx.fillStyle="rgba(180,200,220,0.3)";
// 			this.ctx.fillRect(w*(i-this.viewportL+Math.floor(this.viewportL)),0,w,this.height);
// 		};
// 		// ending column
// 		if (Math.floor(i+this.viewportL) == this.endTick) {
// 			this.ctx.fillStyle="rgba(180,200,220,0.3)";
// 			this.ctx.fillRect(w*(i-this.viewportL+Math.floor(this.viewportL)),0,w,this.height);
// 		};
// 
// 		// thin vertical tick separating lines
// 		var lod = 4;
// 		if (this.viewportW / 32 > 8) lod= 8;
// 		if (this.viewportW / 32 > 16) lod= 16;
// 		if (this.viewportW / 32 < 4) lod= 2;
// 		if (this.viewportW / 32 < 2) lod= 1;
// 
// 		this.ctx.save();
// 		this.ctx.beginPath();
// 		this.ctx.lineWidth=1;
// 		if (Math.floor(i+this.viewportL) % (tickPerMeas/Work.global.bpMeas) ==0) 
// 			this.ctx.strokeStyle = "rgba(0,0,0,1)";
// 		else 
// 			this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
// 
// 		if (Math.floor(i+this.viewportL) % lod ==0){
// 		this.ctx.moveTo(w*(i-this.viewportL+Math.floor(this.viewportL)), 0);
// 		this.ctx.lineTo(w*(i-this.viewportL+Math.floor(this.viewportL)), this.height);
// 		this.ctx.stroke();
// 		};
// 		this.ctx.restore();
// 	};

	const max_vel_height=12;
	
	if (Work.global.through) {
	// draw notes in out-focus layers
	for (var i=0; i<Work.global.seqXY.length; i++)
	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].d)>this.viewportL
	&& (Work.global.seqXY[i].x)<this.viewportL+this.viewportW
	&& Work.global.seqXY[i].l!=Work.global.layer_sel) 
	{
	
		// draw normal notes
		var left = (Work.global.seqXY[i].x -this.viewportL)*w, 
			top= this.height-(Work.global.seqXY[i].y-this.viewportB)*h-h,
			width= w * Work.global.seqXY[i].d,
			height= h,
			colorF;			
			
		var sel=this.selCount();
 		var sel=this.selCount();

		 if (Work.global.seqXY[i].t==1) {
			colorF=motf.color.get("indigo", this.outFocusNoteOpacity);	
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
				colorF=motf.color.get("yellow", this.outFocusNoteOpacity);
		} else if (Work.global.seqXY[i].t==2) {
			colorF=motf.color.get("purple", this.outFocusNoteOpacity);	
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
				colorF=motf.color.get("yellow", this.outFocusNoteOpacity);
		} else {
			colorF=motf.color.get("green", this.outFocusNoteOpacity);
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
				colorF=motf.color.get("yellow", this.outFocusNoteOpacity);
		};
		if (Work.layer[Work.global.seqXY[i].l].type=="percussion")
			colorF = motf.color.get("red", this.outFocusNoteOpacity);
		if (this.layer[Work.global.seqXY[i].l].channel.muted)
			colorF = motf.color.get("grey", this.outFocusNoteOpacity);

		// if (Work.global.seqXY[i].t==1) {
		// 	colorF="rgba(120,255,255,"+this.outFocusNoteOpacity+")";	
		// 	if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
		// 		colorF="rgba(255,150,230,"+this.outFocusNoteOpacity+")";	
		// } else {
		// 	colorF="rgba(130,255,160,0"+this.outFocusNoteOpacity+")";		
		// 	if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
		// 		colorF="rgba(255,240,170,"+this.outFocusNoteOpacity+")";	
		// };
		// if (Work.layer[Work.global.seqXY[i].l].type=="percussion")
		// 	colorF = "rgba(240,170,190,"+this.outFocusNoteOpacity+")";		
	

		this.ctx.beginPath();
		this.ctx.fillStyle= colorF;
		this.ctx.rect(left, top, width-1, height-1);
		this.ctx.fill();

		if ((Work.global.seqXY[i].s==1 && !this.isPlaying) 
		|| ((!this.layer[Work.global.seqXY[i].l].channel.muted &&
			this.isPlaying && this.playhead>=Work.global.seqXY[i].x && 
			this.playhead<(Work.global.seqXY[i].x+Work.global.seqXY[i].d)) &&
			(sel==0 || (sel>0 && Work.global.seqXY[i].s==1)))) { 
			
			this.ctx.save()
			
			colorF = "white";
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0 && 
				Work.layer[Work.global.seqXY[i].l].type!="percussion"){
				colorF = "red";	
			};	


 			var velH=h*max_vel_height*Work.global.seqXY[i].v/3;
// 			if (this.isPlaying)
// 				if (Math.round(Tone.now()*1000) % 2 == 0) velH=velH*0.96;
			
			var glow = this.layer[Work.global.seqXY[i].l].meter.getValue()*5;
			
			if (this.isPlaying)
			velH = velH * glow;

			var grd=this.ctx.createLinearGradient(0,top-velH,0,top);
			grd.addColorStop(0, motf.color.get(colorF, 0));
			grd.addColorStop(1, motf.color.get(colorF, 0.1));
			this.ctx.fillStyle = grd;
			this.ctx.fillRect(left, top-velH, width-1, velH);

			grd=this.ctx.createLinearGradient(0,h+top,0,h+top+velH);
			grd.addColorStop(0, motf.color.get(colorF, 0.1));
			grd.addColorStop(1, motf.color.get(colorF, 0));
			this.ctx.fillStyle = grd;
			this.ctx.fillRect(left, h+top, width-1, velH);
			
			this.ctx.restore();
		};
			
		if (Work.global.seqXY[i].s===1){
			colorB = "rgba(255,255,255,1)";
			lineW=Math.ceil(512/this.viewportW);
			if (lineW<1) lineW=1;
			if (lineW>4) lineW=4;

			this.ctx.strokeStyle = colorB;
			this.ctx.lineWidth=lineW;
			this.ctx.stroke();	
		};
	};		
	};

	// draw notes in current layer
	for (var i=0; i<Work.global.seqXY.length; i++)
	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].d)>this.viewportL
	&& (Work.global.seqXY[i].x)<this.viewportL+this.viewportW
	&& Work.global.seqXY[i].l==Work.global.layer_sel) 
	{
		// draw normal notes	
		var left = (Work.global.seqXY[i].x -this.viewportL)*w, 
			top= this.height-(Work.global.seqXY[i].y-this.viewportB)*h-h,
			width= w * Work.global.seqXY[i].d,
			height= h,
			colorF;
									
 		var sel=this.selCount();

		 if (Work.global.seqXY[i].t==1) {
			colorF=motf.color.get("indigo", 0.9);	
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
				colorF=motf.color.get("yellow", 0.9);
		} else if (Work.global.seqXY[i].t==2) {
			colorF=motf.color.get("purple", 0.9);	
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
				colorF=motf.color.get("yellow", 0.9);
		} else {
			colorF=motf.color.get("green", 0.9);
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0)
				colorF=motf.color.get("yellow", 0.9);
		};
		if (Work.layer[Work.global.seqXY[i].l].type=="percussion")
			colorF = motf.color.get("red", 0.9);
			if (this.layer[Work.global.seqXY[i].l].channel.muted)
			colorF = motf.color.get("grey", 0.9);

		this.ctx.beginPath();
		this.ctx.fillStyle= colorF;
		this.ctx.rect(left, top, width-1, height-1);
		this.ctx.fill();

		if ((Work.global.seqXY[i].s==1 && !this.isPlaying) 
		|| ((!this.layer[Work.global.seqXY[i].l].channel.muted &&
			this.isPlaying && this.playhead>=Work.global.seqXY[i].x && 
			this.playhead<(Work.global.seqXY[i].x+Work.global.seqXY[i].d)) &&
			(sel==0 || (sel>0 && Work.global.seqXY[i].s==1)))) 
		{
			
			this.ctx.save()
			
//			this.ctx.globalCompositeOperation = 'lighter';

			colorF = "white";
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0 && 
				Work.layer[Work.global.seqXY[i].l].type!="percussion"){
				colorF = "red";	
			};	

 			var velH=h*max_vel_height*Work.global.seqXY[i].v/3;
// 			if (this.isPlaying)
// 				if (Math.round(Tone.now()*1000) % 2 == 0) velH=velH*0.96;
			
			var glow = this.layer[Work.global.seqXY[i].l].meter.getValue()*10;
				
			if (this.isPlaying)
				velH = velH * glow;

			var grd=this.ctx.createLinearGradient(0,top-velH,0,top);
			grd.addColorStop(0, motf.color.get(colorF, 0));
			grd.addColorStop(0.5, motf.color.get(colorF, 0.2));
			grd.addColorStop(1, motf.color.get(colorF, 0.7));
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, top-velH, width-1, velH);

			grd=this.ctx.createLinearGradient(0,h+top,0,h+top+velH);
			grd.addColorStop(0, motf.color.get(colorF, 0.7));
			grd.addColorStop(0.5, motf.color.get(colorF, 0.2));
			grd.addColorStop(1, motf.color.get(colorF, 0));
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, h+top, width-1, velH);
			
			this.ctx.restore();
	
		};		

		if (Work.global.seqXY[i].s===1){
			colorB = motf.color.get("white", 0.8)
			lineW=Math.ceil(512/this.viewportW);
			if (lineW<1) lineW=1;
			if (lineW>4) lineW=4;

			this.ctx.strokeStyle = colorB;
			this.ctx.lineWidth=lineW;
			this.ctx.stroke();	

		}
	};

	// draw playhead
	this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth=3;
		this.ctx.strokeStyle = "rgba(255,255,255,1)";
		this.ctx.moveTo(w * (- this.viewportL + this.playhead) - 1.5, 0);
		this.ctx.lineTo(w * (- this.viewportL + this.playhead) - 1.5, this.height);
		this.ctx.stroke();
	this.ctx.restore();

//	this.ctx.globalCompositeOperation = 'source-over';

	//draw octave numbers
	for (var i=Math.floor(this.viewportB); i<Math.ceil(this.viewportH+this.viewportB); i++){
		if (i % 12 == 3 && i<vH()-1){
			this.ctx.save();	
			this.ctx.font = "bold 32px myFont";
//			this.ctx.font = Math.round(w)+"px Arial bold";
			this.ctx.fillStyle = "rgba(200,200,200,1)";
			this.ctx.translate(25, 
				this.height-(i-this.viewportB)*h);
			this.ctx.rotate(-Math.PI/2);
			this.ctx.fillText("C"+(Math.floor(i/12)+1), 0,0);
			this.ctx.restore();
		};
	};
		
	//draw measure numbers
	var display_step= Math.ceil( 140 / (w * tickPerMeas) );
	for (var i=0; i< Math.ceil(this.viewportL + this.viewportW); i++){
		if (i % (tickPerMeas*display_step) == 0){
			this.ctx.save();	
	// 		this.ctx.font = Math.round(h)+"px Arial bold";
			this.ctx.font = "bold 32px myFont";
			this.ctx.fillStyle = "rgba(200,200,200,1)";
			this.ctx.fillText("M" + (Math.floor(i/tickPerMeas)), 
				(i+1-this.viewportL)*w, 25);
			this.ctx.restore();
		};
	// 	if (i>=16 && i % (tickPerMeas*display_step/2) == 0) {
	// // Draw Chord Signs
	// 		this.ctx.font = "bold 16px myFont";
	// 		this.ctx.fillStyle = "rgba(120,255,255,0.7)";
	// 		var chs=this.chord[Math.floor(i / (tickPerMeas/2))-2];
	// 		if (chs!=undefined && chs.length>0)
	// //		for (var j=0; j<chs.length; j++) 
	// 		for (var j=0; j<1; j++) {
	// 			var ch=this.chord[Math.floor(i / (tickPerMeas/2))-2][j];
	// //			if (ch.length>6) ch=ch.substring(0,6)+"...";
	// 			this.ctx.fillText(ch,(i+1-this.viewportL)*w, 50+j*25);	
	// 		}
	// 		
	// 	};
	};	

	// draw rectangle selection
 	var ins= Controls.tempDrag=="" ? this.dragType : Controls.tempDrag;		
	if (ins=="rect" || ins=="span" || ins=="meas"){
		var left = this.selX1 < this.selX2 ? this.selX1 : this.selX2;
		var right = this.selX1 < this.selX2 ? this.selX2 : this.selX1;
		if (ins=="rect"){
			var top = this.selY1 < this.selY2 ? this.selY2 : this.selY1;
			var bottom = this.selY1 < this.selY2 ? this.selY1 : this.selY2;
		} else {
			var top = vH()-1;
			var bottom = 0;
		};
		this.ctx.fillStyle="rgba(255,100,255,0.4)";
		this.ctx.fillRect(
			w*(left-this.viewportL),
			this.height-h*(top-this.viewportB),
			w*(right-left),
			h*(top-bottom)
		);
	};
	
	// draw select measures
	for (var i=0; i<Work.global.seqIJ.length;i++)
	if (Work.global.seqIJ[i].sel===1) {
		this.ctx.fillStyle="rgba(255,255,255,0.4)";
		this.ctx.fillRect(
			w*(i-this.viewportL),
			0,
			w,
			h*(vH()-1+1)
		);
	};

	// if putting a new note on the roll
	if (this.newNote){
		this.ctx.beginPath();
		this.ctx.rect(this.curX-w/2, this.curY-h/2, w * Tone.Time(this.newNote)/Tone.Time("16n"), h);
		this.ctx.fillStyle= "rgba(0,255,0,0.5)";
		if (Composer.diatonic_mask[this.viewportB+Math.floor((this.height-this.curY)/h)]==0)
			this.ctx.fillStyle= "rgba(255,50,50,0.9)";
		this.ctx.fill();
		this.ctx.strokeStyle = "rgba(200,255,200,0.5)";
		this.ctx.lineWidth=2;
		this.ctx.stroke();		
	};
	
// 	this.ctx.strokeStyle="#FF0000";
// 	this.ctx.lineWidth=3;
// 	this.ctx.beginPath();
// 	this.ctx.moveTo(0,0);
// 	this.ctx.lineTo(0,this.height);
// 	this.ctx.lineTo(this.width,this.height);
// 	this.ctx.lineTo(this.width,0);
// 	this.ctx.lineTo(0,0);
// 	this.ctx.stroke();
	
};

// get the key (0..Composer.scale.length-1) on a scaled keyboard by a chromatic key (0..87)
function scaleY(y){
// 	var prev, next;
// 	for (var i=0; i<Composer.scale.length; i++)
// 	if (Composer.scale[i]==y) return {key:i, total: null, offset: 0};
// 	else {
// 		if (Composer.scale[i]<y) prev=i;
// 		if (prev && Composer.scale[i]>y) { next=i; break; };
// 	};
// //	if (next==null) next=Composer.scale.length-1;
// 	return {key:prev, total:Composer.scale[next]-Composer.scale[prev]-1, offset: y-Composer.scale[prev]};
	var prev, next;
	for (var i=0; i<Composer.scale.length; i++)
	if (Composer.scale[i]==y) return {key:i, total: null, offset: 0};
	else {
		if (Composer.scale[i]<y) prev=i;
		else {
			if (prev!=null && Composer.scale[i]>y) { 
			next=i; 
			break; 
			};
		};
	};
//	if (next==null) next=Composer.scale.length-1;
	return {key:prev, total:Composer.scale[next]-Composer.scale[prev]-1, offset: y-Composer.scale[prev]};
};

// console.log(scaleY(1));
// console.log(scaleY(85));
Pianoroll.prototype.drawScaledPianoRoll=function(){
// pink 255,100,255

	var octpos;
	var h=this.height / this.viewportH;
	var w=this.width / this.viewportW;
	
	var tickPerMeas = Work.global.bpMeas * (16/Work.global.bpNote)	
	
	var scale_n = motf.theory.scaleDict[Work.global.scale_id].len;
	
	// draw Rhythm
	if (Work.global.showRhythm) {
	var mt= Work.global.bpMeas / Work.global.bpNote * 16; // ticks in a measure
	var mw= w * mt; //measure width
	var tog=1;
	var alpha=1;
	this.ctx.save();
	for (var i=0; i<this.endTick; i++)
	if (i % mt ==0){
		var ii = Math.floor(i/mt) % Work.layer[Work.global.layer_sel].rhythm.length;
		if (Math.floor(i/mt) >= Work.layer[Work.global.layer_sel].rhythm.length) alpha=0.5;
		var xo= i * w - this.viewportL * w;  // x offset	
		var oo=0;	
		for (var j=0; j<Work.layer[Work.global.layer_sel].rhythm[ii].length; j++) {
			tog=1-tog;	
 			this.ctx.fillStyle = "rgba(100,150,200,"+(tog==0?0.3*alpha:0.7*alpha)+")";
			this.ctx.fillRect(	xo + mw * oo +1.5,
								0,
								mw * Work.layer[Work.global.layer_sel].rhythm[ii][j]-1.5,
								this.height
							 );
			oo+=Work.layer[Work.global.layer_sel].rhythm[ii][j];
		};
	};			
	this.ctx.restore();			
	};
		
	// draw horizontal lines (piano key lines)
	for (var i=0; i<Composer.scale.length; i++){
		octpos= Composer.scale[i] % 12;
		if ((octpos % 12) == (Work.global.key+3) % 12) this.ctx.fillStyle="rgba(100,200,100,0.3)";
		else if ((octpos % 12) == (Work.global.key+10) % 12) this.ctx.fillStyle="rgba(220,255,220,0.3)";
		else this.ctx.fillStyle="rgba(255,255,255,0.3)";		

		this.ctx.fillRect(0,
			this.height-(i-this.viewportB)*h-h+0.5,
			this.width,
			h-1);
	};		
		
	// draw vertical lines
	for (var i=Math.floor(this.viewportL); i<Math.ceil(this.viewportL+this.viewportW); i++){
		// odd measures
		if (Math.floor(i / tickPerMeas) % 2 ==1) {
			this.ctx.fillStyle="rgba(255,255,255,0.15)";
			this.ctx.fillRect(w*(i-this.viewportL),0,w,this.height);
		};
		// beginning column
		if (i == 0 && this.endTick>0) {
			this.ctx.fillStyle="rgba(255,255,150,0.4)";
			this.ctx.fillRect(w*(i-this.viewportL),0,w,this.height);
		};
		// ending column
		if (i == this.endTick) {
			this.ctx.fillStyle="rgba(255,255,150,0.4)";
			this.ctx.fillRect(w*(i-this.viewportL),0,w,this.height);
		};
		
		// thin vertical tick separating lines
		var lod = 4;
		if (this.viewportW / 32 > 8) lod= 8;
		if (this.viewportW / 32 > 16) lod= 16;
		if (this.viewportW / 32 < 4) lod= 2;
		if (this.viewportW / 32 < 2) lod= 1;

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth=1;
		if (i % (tickPerMeas/Work.global.bpMeas) ==0) 
			this.ctx.strokeStyle = "rgba(0,0,0,1)";
		else 
			this.ctx.strokeStyle = "rgba(0,0,0,0.1)";

		if (i % lod ==0){
		this.ctx.moveTo(w*(i-this.viewportL), 0);
		this.ctx.lineTo(w*(i-this.viewportL), this.height);
		this.ctx.stroke();
		};
		this.ctx.restore();
	};

//	this.ctx.globalCompositeOperation = 'xor';

	const max_vel_height=12;
	
	if (Work.global.through){
	// draw notes in other layers
	for (var i=0; i<Work.global.seqXY.length; i++)
	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].d)>this.viewportL
	&& (Work.global.seqXY[i].x)<this.viewportL+this.viewportW
	&& Work.global.seqXY[i].l!=Work.global.layer_sel) 
	{
		if (Composer.diatonic_mask[Work.global.seqXY[i].y]==1){
		// in scale notes	
		var left = (Work.global.seqXY[i].x -this.viewportL)*w, 
			top= this.height-(scaleY(Work.global.seqXY[i].y).key-this.viewportB)*h-h,
			width= w * Work.global.seqXY[i].d,
			height= h,
			colorF="rgba(130,255,160,"+this.outFocusNoteOpacity+")";		
			if (Work.global.seqXY[i].t==1) colorF="rgba(120,255,255,"+this.outFocusNoteOpacity+")";	
		} else {
		// off scale notes	
		var left = (Work.global.seqXY[i].x -this.viewportL)*w, 
			top= this.height-(scaleY(Work.global.seqXY[i].y).key
				+ scaleY(Work.global.seqXY[i].y).offset*0.2
				- scaleY(Work.global.seqXY[i].y).total*0.2/2
				- this.viewportB)*h-h,
			width= w * Work.global.seqXY[i].d,
			height= h*0.2,
			colorF="rgba(255,240,170,"+this.outFocusNoteOpacity+")";	
			if (Work.global.seqXY[i].t==1) colorF="rgba(255,150,230,"+this.outFocusNoteOpacity+")";
		};	
									
 		var sel=this.selCount();

		this.ctx.beginPath();
		this.ctx.fillStyle= colorF;
		this.ctx.rect(left, top, width-1, height-1);
		this.ctx.fill();

		if ((Work.global.seqXY[i].s==1 && !this.isPlaying) 
		|| ((!this.layer[Work.global.seqXY[i].l].channel.muted &&
			this.isPlaying && this.playhead>=Work.global.seqXY[i].x && 
			this.playhead<(Work.global.seqXY[i].x+Work.global.seqXY[i].d)) &&
			(sel==0 || (sel>0 && Work.global.seqXY[i].s==1)))) 
		{

			this.ctx.save()

//			this.ctx.globalCompositeOperation = 'lighter';

 			var velH=h*max_vel_height*Work.global.seqXY[i].v/3;

			colorF = "rgba(220,255,220,";
			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0){
				colorF = "rgba(255,220,220,";	
			};

// 			if (this.isPlaying)
// 				if (Math.round(Tone.now()*1000) % 2 == 0) velH=velH*0.96;

			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0){
				colorF = "rgba(255,220,220,";	
				hh=h*0.2;
			} else {
				colorF = "rgba(220,255,220,";
				hh=h;
			};
			
			var grd=this.ctx.createLinearGradient(0,top-velH,0,top);
			grd.addColorStop(0,colorF+"0)");
			grd.addColorStop(1,colorF+"0.6)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, top-velH, width-1, velH);

			grd=this.ctx.createLinearGradient(0,h+top,0,h+top+velH);
			grd.addColorStop(0,colorF+"0.6)");
			grd.addColorStop(1,colorF+"0)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, hh+top, width-1, velH);
			
			this.ctx.restore();
	
		};		

		if (Work.global.seqXY[i].s===1){
			colorB = "rgba(255,255,255,1)";
			lineW=Math.ceil(512/this.viewportW);
			if (lineW<1) lineW=1;
			if (lineW>4) lineW=4;

			this.ctx.strokeStyle = colorB;
			this.ctx.lineWidth=lineW;
			this.ctx.stroke();	
		}
	};
	};

	// draw notes in current layer
	for (var i=0; i<Work.global.seqXY.length; i++)
	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].d)>this.viewportL
	&& (Work.global.seqXY[i].x)<this.viewportL+this.viewportW
	&& Work.global.seqXY[i].l==Work.global.layer_sel) 
	{
		if (Composer.diatonic_mask[Work.global.seqXY[i].y]==1){
		// in scale notes	
		var left = (Work.global.seqXY[i].x -this.viewportL)*w, 
			top= this.height-(scaleY(Work.global.seqXY[i].y).key-this.viewportB)*h-h,
			width= w * Work.global.seqXY[i].d,
			height= h,
			colorF="rgba(130,255,160,0.9)";		
			if (Work.global.seqXY[i].t==1) 
				colorF="rgba(120,255,255,0.9)";	
		} else {
		// off scale notes	
		var left = (Work.global.seqXY[i].x -this.viewportL)*w, 
			top= this.height-(scaleY(Work.global.seqXY[i].y).key
				+ scaleY(Work.global.seqXY[i].y).offset*0.2
				- scaleY(Work.global.seqXY[i].y).total*0.2/2
				- this.viewportB)*h-h,
			width= w * Work.global.seqXY[i].d,
			height= h*0.2,
			colorF="rgba(255,240,170,0.9)";		
			if (Work.global.seqXY[i].t==1) 
				colorF="rgba(255,150,230,0.9)";		
		};			
			
 		var sel=this.selCount();

		this.ctx.beginPath();
		this.ctx.fillStyle= colorF;
		this.ctx.rect(left, top, width-1, height-1);
		this.ctx.fill();

		if ((Work.global.seqXY[i].s==1 && !this.isPlaying) 
		|| ((!this.layer[Work.global.seqXY[i].l].channel.muted &&
			this.isPlaying && this.playhead>=Work.global.seqXY[i].x && 
			this.playhead<(Work.global.seqXY[i].x+Work.global.seqXY[i].d)) &&
			(sel==0 || (sel>0 && Work.global.seqXY[i].s==1)))) 
		{

			this.ctx.save()

//			this.ctx.globalCompositeOperation = 'lighter';

 			var velH=h*max_vel_height*Work.global.seqXY[i].v/3;

			if (Composer.diatonic_mask[Work.global.seqXY[i].y]==0){
				colorF = "rgba(255,220,220,";	
				hh=h*0.2;
			} else {
				colorF = "rgba(220,255,220,";
				hh=h;
			};

// 			if (this.isPlaying)
// 				if (Math.round(Tone.now()*1000) % 2 == 0) velH=velH*0.96;
			var grd=this.ctx.createLinearGradient(0,top-velH,0,top);
			grd.addColorStop(0,colorF+"0)");
			grd.addColorStop(1,colorF+"0.6)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, top-velH, width-1, velH);

			grd=this.ctx.createLinearGradient(0,h+top,0,h+top+velH);
			grd.addColorStop(0,colorF+"0.6)");
			grd.addColorStop(1,colorF+"0)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, hh+top, width-1, velH);
			
			this.ctx.restore();
	
		};		

		if (Work.global.seqXY[i].s===1){
			colorB = "rgba(255,255,255,1)";
			lineW=Math.ceil(512/this.viewportW);
			if (lineW<1) lineW=1;
			if (lineW>4) lineW=4;

			this.ctx.strokeStyle = colorB;
			this.ctx.lineWidth=lineW;
			this.ctx.stroke();	

		}
	};
	
	// draw playhead
	this.ctx.save();
		this.ctx.beginPath();
		this.ctx.lineWidth=3;
		this.ctx.strokeStyle = "rgba(255,255,255,1)";
		this.ctx.moveTo(w * (- this.viewportL + this.playhead) + 1.5, 0);
		this.ctx.lineTo(w * (- this.viewportL + this.playhead) + 1.5, this.height);
		this.ctx.stroke();
	this.ctx.restore();	

//	this.ctx.globalCompositeOperation = 'source-over';

	//draw octave numbers
	for (var i=Math.floor(this.viewportB); i<Math.ceil(this.viewportH+this.viewportB); i++){
		if (Composer.scale[i] % 12 == (Work.global.key+3) % 12 && i<vH()-1){
			this.ctx.save();	
			this.ctx.font = "bold 32px myFont";
//			this.ctx.font = Math.round(w)+"px Arial bold";
			this.ctx.fillStyle = "rgba(200,200,200,1)";
			this.ctx.translate(25, 
				this.height-(i-this.viewportB)*h);
			this.ctx.rotate(-Math.PI/2);
			this.ctx.fillText("C"+(Math.floor(Composer.scale[i]/12)+1), 0,0);
			this.ctx.restore();
		};
	};
	
	//draw measure number & chord name
	var display_step= Math.ceil( 110 / (w * tickPerMeas) );
	for (var i=Math.floor(this.viewportL)-16; i< Math.ceil(this.viewportL + this.viewportW); i++)
	if (i % (tickPerMeas*display_step) == 0){
		this.ctx.save();	
// 		this.ctx.font = Math.round(h)+"px Arial bold";
		this.ctx.font = "bold 32px myFont";
		this.ctx.fillStyle = "rgba(200,200,200,1)";
		this.ctx.fillText("M" + (Math.floor(i/tickPerMeas)), 
			(i+1-this.viewportL)*w, 25);

		this.ctx.font = "bold 16px myFont";
		this.ctx.fillStyle = "rgba(120,255,255,0.7)";
		var chs=this.chord[Math.floor(i / tickPerMeas)];
		if (chs!=undefined && chs.length>0)
//		for (var j=0; j<chs.length; j++) 
		for (var j=0; j<1; j++) 
		{
			var ch=this.chord[Math.floor(i / tickPerMeas)][j];
//			if (ch.length>6) ch=ch.substring(0,6)+"...";
			this.ctx.fillText(ch,(i+1-this.viewportL)*w, 50+j*25);	
		}

		this.ctx.restore();
	};
	
	// draw rectangle selection
 	var ins= Controls.tempDrag=="" ? this.dragType : Controls.tempDrag;		
	if (ins=="rect" || ins=="span" || ins=="meas"){
		var left = this.selX1 < this.selX2 ? this.selX1 : this.selX2;
		var right = this.selX1 < this.selX2 ? this.selX2 : this.selX1;
		if (ins=="rect"){
			var top = this.selY1 < this.selY2 ? this.selY2 : this.selY1;
			var bottom = this.selY1 < this.selY2 ? this.selY1 : this.selY2;
		} else {
			var top = vH()-1;
			var bottom = 0;
		};
		this.ctx.fillStyle="rgba(255,100,255,0.4)";
		this.ctx.fillRect(
			w*(left-this.viewportL),
			this.height-h*(top-this.viewportB),
			w*(right-left),
			h*(top-bottom)
// 			w*(left-this.viewportL),
// 			this.height-h*(1+top-this.viewportB),
// 			w*(right-left+1),
// 			h*(top-bottom+1)
		);
	};
	
	// draw select measures
	for (var i=0; i<Work.global.seqIJ.length;i++)
	if (Work.global.seqIJ[i].sel===1) {
		this.ctx.fillStyle="rgba(255,255,255,0.4)";
		this.ctx.fillRect(
			w*(i-this.viewportL),
			0,
			w,
			h*(vH()-1+1)
		);
	};this.viewportB+Math.floor((this.height-this.curY)/h)

	// if putting a new note on the roll
	if (this.newNote){
		var tickY=this.viewportB+Math.floor((this.height-this.curY)/h);
		this.ctx.beginPath();
		this.ctx.rect(this.curX-w/2, this.curY-h/2, w * Tone.Time(this.newNote)/Tone.Time("16n"), h);
		this.ctx.fillStyle= "rgba(0,255,0,0.5)";
		if (Composer.diatonic_mask[Work.global.scaledKeyboard?Composer.scale[tickY]:tickY]==0)
			this.ctx.fillStyle= "rgba(255,50,50,0.8)";
		this.ctx.fill();
		this.ctx.strokeStyle = "rgba(200,255,200,0.5)";
		this.ctx.lineWidth=2;
		this.ctx.stroke();
	};
};

Pianoroll.prototype.resize=function(){
 	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight-Global.headerH; 
 	this.height=this.canvas.height;
 	this.width=this.canvas.width;
};

var t_lastframe=Date.now();
var frame_counter=0;

//var lastFrameT;

Pianoroll.prototype.animloop = function(){
 	
	// for FPS calculation
	frame_counter++;
	var time_elapsed = Date.now()-t_lastframe;
	if (time_elapsed>1000){
		var fps = Math.round(frame_counter/time_elapsed*1000);
		document.getElementById("fps").innerHTML="FPS: "+fps;
		var mc=6;
		var c="rgba("+(255*(mc-Math.round(fps/10))/mc)+","+(180*Math.round(fps/10)/mc)+","+(80*Math.round(fps/10)/mc)+",1)";
		document.getElementById("fps").style.background=c;
		t_lastframe = Date.now();
		frame_counter=0;	
	} 

	this.ctx.clearRect(0,0,this.width,this.height);
		
	if (Work.global.scaledKeyboard)
		this.drawScaledPianoRoll();
	else
		this.drawPianoRoll();

//	if (Work.global.showCanvas) canvas.drawCanvas();
		
// 	let totalTime= this.endTick * Tone.Time("16n");
// 	let screenTime= totalTime * this.viewportW / this.endTick;
	
	if (this.isPlaying) {
		
		// for playhead position calculation, use Tone.now
		if (this.startT == undefined) this.startT=Tone.now();
		let now = Tone.now();

		this.playhead = (now-this.startT) / Tone.Time(this.resolution) + this.selStart;

		if (this.playhead>this.selEnd) {
			if (sel==0) this.selStart=this.leadTick;	
			this.playTick=this.selStart;
			this.playhead=this.playTick;
			//this.playingFromT=Tone.now();
			this.viewportL=0;
			this.startT= Tone.now();

			// if (this.recorder.state=="started") {
			// 	this.stop();
			// 	return;
			// };		
			
	// 		if (this.improvising) {
	// //			console.log("improvising");
	// 			this.stop();
	// 			this.improviseX2("preset");
	// 			this.play();
	// 		};		
		};

		if (this.autoScrollingPaused== undefined || Tone.now()-this.autoScrollingPaused>1){
			// auto scrolling
			if (!this.mouseDown && this.viewportW<Work.global.seqIJ.length+1){

				var autoScrollOffset = -this.viewportW/2;	
				
				if (this.playhead-this.viewportL>this.viewportW/2)
					this.viewportL = this.playhead + autoScrollOffset;

				if (this.viewportL < 0) this.viewportL=0;
				if (this.viewportL > Work.global.seqIJ.length-this.viewportW+1) 
					this.viewportL = Work.global.seqIJ.length-this.viewportW+1;

				if (this.viewportL > 0
				&& this.viewportL< Work.global.seqIJ.length-this.viewportW+1)
					this.autoScrolling = 1;
				else 
					this.autoScrolling = 0;
			
				Navbar.updateLR();
			};
		};		
	};

	Global.updateMeter();
	
	this.anim = requestAnimationFrame(this.animloop.bind(this));	
}

Pianoroll.prototype.stop=function(){
	for (var i=0; i<this.layer.length; i++)
		this.layer[i].instrument.releaseAll();

	if (this.isPlaying) { 
		this.startT = null;
		Tone.Transport.stop(); 
		if (this.recorder.state=="started") {
			async function saveWhenRecordingDone(){ 
				const recording = await pianoroll.recorder.stop(); 
				const url = URL.createObjectURL(recording);
				const anchor = document.createElement("a");
				// Chrome only support .webm; Safari support .mp3!
				anchor.download = "recording.webm"; 
				anchor.href = url;
				anchor.click();
			};
			saveWhenRecordingDone();
		};

		this.autoScrolling=0;
		this.isPlaying=false; 
		this.newNote=null;

		this.unDim();
	};
}

Pianoroll.prototype.dim=function(){
	myLib.ramp(this.rollScheme, 'whiteKeysAlt', this.rollScheme.whiteKeys, this.rollScheme.whiteKeys-0.15,this.dimDuration);
	myLib.ramp(this.rollScheme, 'blackKeysAlt', this.rollScheme.blackKeys, this.rollScheme.blackKeys-0.15,this.dimDuration);
	myLib.ramp(this.rollScheme, 'altMeasAlt',  this.rollScheme.altMeas, this.rollScheme.altMeas-0.05,this.dimDuration);
}

Pianoroll.prototype.unDim=function(){
	myLib.ramp(this.rollScheme, 'whiteKeysAlt', this.rollScheme.whiteKeys-0.15, this.rollScheme.whiteKeys,this.dimDuration);
	myLib.ramp(this.rollScheme, 'blackKeysAlt', this.rollScheme.blackKeys-0.15, this.rollScheme.blackKeys,this.dimDuration);
	myLib.ramp(this.rollScheme, 'altMeasAlt',  this.rollScheme.altMeas-0.05, this.rollScheme.altMeas,this.dimDuration);
}

Pianoroll.prototype.play=function(){
	this.autoScrolling=0;

	if (Work.global.seqXY.length==0) return;

	if (!this.isPlaying) { 

//		if (this.unsaved) {
			Global.XYtoIJ();
			this.unsaved = false;
//		};
		
		sel=this.selCount();
		if (sel>0){
			this.selEnd = -Infinity;
			this.selStart = Infinity;
			for (var i=0; i<Work.global.seqXY.length; i++)
				if (Work.global.seqXY[i].s===1){
					if (this.selEnd< (Work.global.seqXY[i].x+Work.global.seqXY[i].d))
						this.selEnd= (Work.global.seqXY[i].x+Work.global.seqXY[i].d);
					if (this.selStart> Work.global.seqXY[i].x) 
						this.selStart= Work.global.seqXY[i].x;
				};
			this.playhead=this.selStart;
		} else {
			this.selEnd = this.endTick;
			this.selStart = this.playhead;
		};
		
		this.playTick=Math.floor(this.playhead);
		
		//this.playingFromT = Tone.now();
		this.isPlaying = true;  
		
		Tone.Transport.start();
		this.startT = Tone.now();

		this.dim();
	};
}

Pianoroll.prototype.record=()=>{
	pianoroll.recorder.start();
	pianoroll.scroll('beginning');
	pianoroll.play();
};


Pianoroll.prototype.playNext=function(t){ 
	var sel=this.selCount();

	if (this.playTick>this.selEnd) {
		if (sel==0) this.selStart=this.leadTick;	
		this.playTick=this.selStart;
		this.playhead=this.selStart;

		//this.playingFromT=Tone.now();

		// if (this.recorder.state=="started") {
		// 	this.stop();
		// 	return;
		// };		
		
// 		if (this.improvising) {
// //			console.log("improvising");
// 			this.stop();
// 			this.improviseX2("preset");
// 			this.play();
// 		};
	};

	let currentTick = this.playTick;

	// metronome
	var tickPerBeat = 16/Work.global.bpNote;
	var tickPerMeas = Work.global.bpMeas * tickPerBeat;
	if (Work.global.metronome){
		var tt=(this.playTick % tickPerMeas);
 		if (tt==0 && this.playTick<this.selEnd) 
			//Instruments.metronome[0].start();
			Instruments.drum2.triggerAttackRelease(0.01, t, Global.metroVolume);
 		for (i=1; i<Work.global.bpMeas; i++)
			if (tt == tickPerBeat * i) 
				//Instruments.metronome[1].start();
				Instruments.drum3.triggerAttackRelease(0.003, t, Global.metroVolume);
	};	

	if (Work.global.seqIJ[currentTick] && Work.global.seqIJ[currentTick].notes.length>0) 
	for (var i=0; i<Work.global.seqIJ[currentTick].notes.length; i++){
		if ((sel==0 || (sel>0 && Work.global.seqIJ[currentTick].notes[i].sel==1))
		&& Math.random()<Work.global.seqIJ[currentTick].notes[i].prob)
		{
			var ins=this.layer[Work.global.seqIJ[currentTick].notes[i].layer].instrument;
			var pedalOn=null;
			var pedal = Work.layer[Work.global.seqIJ[currentTick].notes[i].layer].pedal;
			if (pedal){
				for (var p=0; p<pedal.length; p++)
				if (pedal[p].tick <= currentTick)
					pedalOn = pedal[p].onOff;
				if (!pedalOn) ins.releaseAll();
			};
			if (pedalOn) {		
				if (ins!=null) ins.triggerAttack(
					Global.chromatic_scale[Work.global.seqIJ[currentTick].notes[i].note], 
					t+(Work.global.seqIJ[currentTick].notes[i].offset||0)*Tone.Time("16n")
					 +Math.random()*Tone.Time("16n")*0.6*Work.global.human_tem,
					Work.global.seqIJ[currentTick].notes[i].vel * this.volumeScale * (1+(Math.random()-0.5)*Work.global.human_vel)
				);
			} else {
				if (ins!=null) ins.triggerAttackRelease(
					Global.chromatic_scale[Work.global.seqIJ[currentTick].notes[i].note], 
					Tone.Time("16n").toSeconds()*Work.global.seqIJ[currentTick].notes[i].len, 
					t+(Work.global.seqIJ[currentTick].notes[i].offset||0)*Tone.Time("16n")
					 +Math.random()*Tone.Time("16n")*0.6*Work.global.human_tem,
					Work.global.seqIJ[currentTick].notes[i].vel * this.volumeScale * (1+(Math.random()-0.5)*Work.global.human_vel)
				);
			};
		};	
	};

	this.playTick++;
};

Pianoroll.prototype.zoom=function(dir, step){
	if (dir=="x-in") if (this.viewportW>8) this.viewportW--;
	if (dir=="x-out") this.viewportW++;
	if (dir=="y-in") if (this.viewportH>0) this.viewportH--;
	if (dir=="y-out" && this.viewportH<vH()) this.viewportH++;
}
Pianoroll.prototype.tempo=function(dir, step){
	if (dir=="up") if (Global.bpm<Global.bpm_range[1]) {
		Global.bpm+=1;
		this.setBpm(Global.bpm);
	};
	if (dir=="down") if (Global.bpm>Global.bpm_range[0]) {
		Global.bpm-=1;
		this.setBpm(Global.bpm);
	};
}
Pianoroll.prototype.setNewNote=function(n){
	this.newNote=n;
}

Pianoroll.prototype.selectAll=function(through){
	for (var i=0; i<Work.global.seqXY.length; i++)
	if (through || Work.global.seqXY[i].l==Work.global.layer_sel)
		Work.global.seqXY[i].s=1;
}
Pianoroll.prototype.getNote=function(x,y){
	var w=this.width / this.viewportW;
	var h=this.height / this.viewportH;
		var tickL= 60/ (Work.global.bpm / Work.global.bpNote) /16; // len of a 16n in second
	var r;
	for (var i=0; i<Work.global.seqXY.length; i++) 
	if (Work.global.seqXY[i].l == Work.global.layer_sel || Work.global.through==1) {
		if (
		   x > (Work.global.seqXY[i].x-this.viewportL)*w 
		&& y > (this.height-((Work.global.scaledKeyboard ? scaleY(Work.global.seqXY[i].y).key : Work.global.seqXY[i].y)
				-this.viewportB)*h - h)
		&& x < ((Work.global.seqXY[i].x+Work.global.seqXY[i].d)-this.viewportL)*w
		&& y < (this.height-((Work.global.scaledKeyboard ? scaleY(Work.global.seqXY[i].y).key : Work.global.seqXY[i].y)
				-this.viewportB)*h)
		){
			r=i;
			break;
		};
	};
	return r;
};
Pianoroll.prototype.copyNotes=function(){
	this.clipboard=[];
	for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].s===1) 
			this.clipboard.push(copyObj(Work.global.seqXY[i]));
};
Pianoroll.prototype.cutNotes=function(){
	this.copyNotes();
	this.delNotes();
};

Pianoroll.prototype.adjustVel=function(a){
	var ns=this.selectedNotes();
	if (ns.length==0) return;
	for (var i=0; i<ns.length; i++) {
		Work.global.seqXY[ns[i]].v=Work.global.seqXY[ns[i]].v*(1+a*0.01);
		if (Work.global.seqXY[ns[i]].v<0.05) Work.global.seqXY[ns[i]].v=0.05;
		if (Work.global.seqXY[ns[i]].v> 3) Work.global.seqXY[ns[i]].v= 3;
	};
//	Controls.saveTemp();		
}

Pianoroll.prototype.pasteNotes=function(){
	if (this.clipboard.length===0) return;

 	this.deSelectAll();
	
// 	for (var i=0; i<this.clipboard.length; i++)
// 		this.clipboard[i].s=1;
	
	for (var i=0; i<this.clipboard.length; i++)
	Work.global.seqXY.push({
		x: this.clipboard[i].x,
		y: this.clipboard[i].y,
		d: this.clipboard[i].d,
		v: this.clipboard[i].v,
		l: parseInt(Work.global.layer_sel),
		s: this.clipboard[i].s,
		p: this.clipboard[i].p
	});

	this.updateEndTick();
	
	this.historyPush("paste notes");
//	Controls.saveTemp();		
//	pianoroll.updateChords();
};

Pianoroll.prototype.pasteInsertNotes=function(){
	if (this.clipboard.length===0) return;

 	this.deSelectAll();
 	
 	var left=999999, right=-999999;
	for (var i=0; i<this.clipboard.length; i++)
	{
		if (this.clipboard[i].x+this.clipboard[i].d>right)
			right=this.clipboard[i].x+this.clipboard[i].d;
		if (this.clipboard[i].x<left)
			left=this.clipboard[i].x;
	};
	var len=right-left;
	
	for (var i=0; i<Work.global.seqXY.length; i++)
	if (Work.global.seqXY[i].x>=this.playhead && 
		(Work.global.layer_sel==Work.global.seqXY[i].l || Work.global.through)) 
		Work.global.seqXY[i].x+=len;
	
	for (var i=0; i<this.clipboard.length; i++)
	Work.global.seqXY.push({
		x: this.clipboard[i].x-left+this.playhead,
		y: this.clipboard[i].y,
		d: this.clipboard[i].d,
		v: this.clipboard[i].v,
		l: this.clipboard[i].l, // parseInt(Work.global.layer_sel),
		s: this.clipboard[i].s
	});

	this.updateEndTick();
	
	this.historyPush("paste insert notes");
//	Controls.saveTemp();	
	
//	pianoroll.updateChords();	
};

Pianoroll.prototype.setBpm=function(bpm){
//	Tone.Transport.bpm.rampTo(bpm, 0.01);
	Tone.Transport.bpm.value=0.01;
}

Pianoroll.prototype.saveToLocal=function(){
	var output=JSON.stringify(Work);
	
//	output=String.fromCharCode.apply(String, pako.gzip(output,{to:'string'}));
//	output=zip(output);

	var a = document.body.appendChild(
		document.createElement("a")
	);
	a.download = Work.global.workname+".motf";
	a.href = "data:text/plain;base64," + 
		btoa(output);
	a.click();
	document.body.removeChild(a);
}

Pianoroll.prototype.autoZoom=function(xy){
	//this.updateEndTick();
	
	if (xy==null) xy="xy";
	
	if (xy=="xy" || xy=="y") {
		var Ymax=-99999, Ymin=99999;
		for (var i=0; i<Work.global.seqXY.length; i++)
		if ((Work.global.seqXY[i].l==Work.global.layer_sel || Work.global.through))
		{
			var yy= Work.global.scaledKeyboard ? scaleY(Work.global.seqXY[i].y).key :Work.global.seqXY[i].y;
			if (yy!=null && Ymax<yy) Ymax=yy;
			if (yy!=null && Ymin>yy) Ymin=yy;
		};
		if (Ymax==-99999) Ymax= Work.global.scaledKeyboard ? Composer.scale.length : 88;
		if (Ymin==99999) Ymin= 0;
		this.viewportH = Ymax - Ymin + 1 + 4;
		if (Work.global.scaledKeyboard && this.viewportH>Composer.scale.length)
			this.viewportH=Composer.scale.length;
		if (this.viewportH<36) this.viewportH=36;
		this.viewportB = Ymin - Math.round((this.viewportH-(Ymax-Ymin + 1)) / 2);
		if (this.viewportB<0) this.viewportB=0;

		if (Work.global.scaledKeyboard && this.viewportH>(Composer.scale.length-this.viewportB)){
			this.viewportH=Composer.scale.length-this.viewportB;
		};
	};

	if (xy=="xy" || xy=="x"){
		var Xmax=-Infinity, Xmin=Infinity;
		for (var i=0; i<Work.global.seqXY.length; i++)
		{
			if (Xmax<Work.global.seqXY[i].x+Work.global.seqXY[i].d) Xmax=Work.global.seqXY[i].x+Work.global.seqXY[i].d;
			if (Xmin>Work.global.seqXY[i].x) Xmin=Work.global.seqXY[i].x;
		};
		if (Xmax==-Infinity) Xmax= Work.global.bpMeas * 4 * (16 / Work.global.bpNote);
		if (Xmin==Infinity) Xmin= 0;
		this.viewportL = 0; // Math.floor(Xmin)-1;
		this.viewportW = Math.ceil(Xmax)+16;
 		if (this.viewportW< this.minW) 
 			this.viewportW=this.minW;
 		if (this.viewportW> this.maxW) 
 			this.viewportW=this.maxW;
//		Navbar.updateLR();
	};
	
	this.initVW=this.viewportW;
	this.initVH=this.viewportH;
	
	Navbar.updateLR();
}

Pianoroll.prototype.getOctListFromSel=function(){
	var seeds=[];
	var selC=this.selCount();
	if (selC==0) return;
	Global.XYtoIJ();
	for (var i=0; i<Work.global.seqIJ.length; i++) {
		var noteC=0;
		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
			if (Work.global.seqIJ[i].notes[j].sel==1) {
				noteC++;
				seeds.push({
					x: i, 
					y: Work.global.seqIJ[i].notes[j].note, 
					l: Work.global.seqIJ[i].notes[j].len
				});
			};
		if (noteC>1) return [];
	};
// 	for (var i=0; i<seeds.length-1; i++)
// 		if (seeds[i].x+seeds[i].l!=seeds[i+1].x)
// 			return [];
	if (seeds.length==0) return [];
//	return seeds;
	this.currentSeeds=copyObj(seeds);
};

Pianoroll.prototype.improviseX2=function(){
	this.improvising=1;

	let tempSeq=[];
	for (var i=0; i<Work.global.seqXY.length; i++) 
		if (Work.global.seqXY[i].t!=1)
			tempSeq.push(copyObj(Work.global.seqXY[i]));
	Work.global.seqXY=tempSeq;

	Global.XYtoIJ();	

	if (this.rootSeeds.length==0) {
		this.getOctListFromSel(); 
		this.rootSeeds=copyObj(this.currentSeeds);
	} else 
		this.currentSeeds=copyObj(this.rootSeeds);

	this.deSelectAll();	
	this.improvise({
		"rhythm":"11111111",
		"suggester":[{"d":0,"p":0},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0},
					{"d":-2,"p":0},{"d":3,"p":0},{"d":-3,"p":0},{"d":4,"p":0},
					{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],
		"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]],
		"chordOrScale": 0,  // 1 chord - 0 scale
		"melodayVariation": 0
	});

	this.getOctListFromSel();	
	this.deSelectAll();	
	this.improvise({
		"rhythm":"11111111",
		"suggester":[{"d":0,"p":0.2},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.5},
					{"d":-2,"p":0.5},{"d":3,"p":0},{"d":-3,"p":0},{"d":4,"p":0},
					{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],
		"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]],
		"chordOrScale": 0.9,   // 1 chord - 0 scale
		"melodayVariation": 0
	});

	this.getOctListFromSel();	
	this.deSelectAll();	
	this.improvise({
		"rhythm":"random",
		"suggester":[{"d":0,"p":1},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":1},
					{"d":-2,"p":1},{"d":3,"p":0.5},{"d":-3,"p":0.5},{"d":4,"p":0},
					{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],
		"iparams":[["0","1"],["0","0.1"],["0","1"],["0","1"],["0","1"],["0","1"]],
		"chordOrScale": 0.3,   // 1 chord - 0 scale
		"melodayVariation": 1
	});

// 	this.deSelectAll();	
// 	this.improvise({
// 		"rhythm":"random",
// 		"suggester":[{"d":0,"p":0},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0},
// 					{"d":-2,"p":0},{"d":3,"p":0},{"d":-3,"p":0},{"d":4,"p":0},
// 					{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],
// 		"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]],
// 		"chordOrScale": 0.3,   // 1 chord - 0 scale
// 		"melodayVariation": 1
// 	});

	this.deSelectAll();	
	Global.XYtoIJ();
	
	this.autoZoom("y");		
//	Controls.saveTemp();	
	
}

Pianoroll.prototype.improvise=function(params){
// 	this.improvising=1;
// 	Global.XYtoIJ();	
// 	if (this.rootSeeds.length==0) {
// 		this.getOctListFromSel(); 
// 		this.rootSeeds=copyObj(this.currentSeeds);
// 	} else 
// 		this.currentSeeds=copyObj(this.rootSeeds);
// 	

	if (this.currentSeeds==null) return;
	var notes_input=copyObj(this.currentSeeds);
//	console.log(notes_input);
	if (notes_input.length==0) return;
	
	if (params.melodayVariation) {
		var chords=Theory.getSlimChordsByKeyScale(Work.global.key, Work.global.scale_id);
		for (var i=0; i<notes_input.length; i++){
			notes_input[i].y = Composer.getChordNote(notes_input[i].y, 
				Math.floor(Math.random()*4), chords[Composer.scaleNByChroma(notes_input[i].y)-1]);
// 			notes_input[i].y = Composer.getChordNote(notes_input[i].y, 
// 				Math.floor(Math.random()*5)-1, chords[Composer.scaleNByChroma(notes_input[i].y)-1]);
		};
	};
	
	var tl=0;
	for (var i=0; i<notes_input.length; i++)
		tl+=notes_input[i].l;
	var nIndex=0;
	for (var i=0; i<notes_input.length; i++){
// 	console.log(
// 			params,
// 			{x:notes_input[i].x, y:notes_input[i].y, l:notes_input[i].l},
// 			((i==notes_input.length-1) ? 
// 			{x:notes_input[i].x+notes_input[i].l, y:notes_input[0].y, l:1}
// 			: {x:notes_input[i+1].x, y:notes_input[i+1].y, l:1})
// 			);
		var notes=Composer.split(
			params,
			{x:notes_input[i].x, y:notes_input[i].y, l:notes_input[i].l},
			((i==notes_input.length-1) ? 
			{x:notes_input[i].x+notes_input[i].l, y:notes_input[0].y, l:1}
			: {x:notes_input[i+1].x, y:notes_input[i+1].y, l:1})
		);
		if (notes == null) return;
		nIndex+=notes.length;
		for (var j=0; j<notes.length; j++){
			this.addNote(
				{
					x: notes[j].x,
					y: notes[j].y + 12, 
					d: notes[j].l, 
					s:1, 
					v:1,
					p: 1,
					l: Work.global.layer_sel, 
					t: 1 // type: 0: normal note; 1: just improvised
				},
				"improvise"
			);
		};
		// how to force anim run for at least 1 frame here?		
	};
//	Controls.saveTemp();	
}

Pianoroll.prototype.updateChords=function(){
	var tpMeas = Work.global.bpMeas / Work.global.bpNote * 8;
	var mn = Math.ceil(this.endTick / tpMeas);
	this.chord=[];
	for (var i=2; i<mn; i++){
		var cns=new Set();
		for (var j=0; j<Work.global.seqXY.length; j++){
		if (Work.global.seqXY[j].x < tpMeas*(i+1) 
		&& (Work.global.seqXY[j].x+Work.global.seqXY[j].d) > tpMeas*i
		//&& (Work.global.seqXY[j].l==Work.global.layer_sel || Work.global.through)
		&& (Work.layer[Work.global.seqXY[j].l].name=="Chord"))
			cns.add(Global.chromatic_scale[Work.global.seqXY[j].y]);		
		};
		var arr = Array.from(cns);
		var ch="";
		if (arr.length>0) ch=Tonal.Chord.detect(arr);
		if (ch!="cant find name" && ch.length<7)
			this.chord.push(ch);
	};
};

Pianoroll.prototype.updateChords1=function(){
	this.chord=[];
	var tpMeas = Work.global.bpMeas / Work.global.bpNote * 16;
	var mn = Math.ceil(this.endTick / tpMeas);
	if (mn > Work.global.chord.length) mn=Work.global.chord.length;
	for (var i=0; i<mn; i++){ 
		var arr=[];
		for (var k=0; k<12; k++) if (Work.global.chord[i].mask[k]==1)
			arr.push(Global.chromatic_scale[27+k]);
		console.log(arr);
		if (arr.length>0) ch=Tonal.Chord.detect(arr);
		if (ch!="cant find name" && ch.length<9)
			this.chord.push(ch);
	};
};

Pianoroll.prototype.init=function(){
	Tone.Transport.bpm.value=Work.global.bpm;
	pianoroll.master.volume.volume.value = document.getElementById("input_master_volume").value;
	pianoroll.master.reverb.decay = document.getElementById("input_master_roomsize").value;

	this.resize();

	var f=this.playNext.bind(this);
	Tone.Transport.scheduleRepeat(function(t){f(t);}, this.resolution);
	this.anim = requestAnimationFrame(this.animloop.bind(this));
	
 	this.updateEndTick();
	this.autoZoom("xy");
		
 	this.historyPush(); 

	this.scroll("beginning");
}

Pianoroll.prototype.detectKeyScale=function(){

	var notes=[], selected=this.selectedNotes();

	if (selected.length==0) return;
	for (var i=0; i<selected.length; i++) notes.push(Work.global.seqXY[selected[i]]);
	var ksFits = motf.theory.keyScaleFit1(notes);
	var ksFit1 = ksFits.bestMatches[0];
	console.log(ksFits);
	 
	document.getElementById("select_key").selectedIndex=ksFit1.key;	
	document.getElementById("select_scale").selectedIndex=ksFit1.scale_id;
	document.getElementById("select_mode").selectedIndex=ksFit1.mode;
	Work.global.scale_id=ksFit1.scale_id;
	Work.global.key=ksFit1.key;
	Work.global.mode=ksFit1.mode;
	Composer.init();
}

Pianoroll.prototype.getNotesByMeas=function(meas_id){
	let r=[];
	let measW= Work.global.bpMeas / Work.global.bpNote * 16;
	for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].x >= measW * meas_id 
		&& Work.global.seqXY[i].x < measW * (meas_id+1))
			r.push(Work.global.seqXY[i]);
	return r;
}

// generate chords according to autoChord and save to Work.global.autoChord
Pianoroll.prototype.autoSimpleChordByKey=function(guitarSwipe){
	// let chords=Theory.getChordsByMelodyKeyScale(Work.global.key, Work.global.scale_id, Work.global.mode,
	// 	0,this.endMeas);
	// Work.global.autoChord=[];
	// for (var i=2; i<chords.length; i++) if (chords[i]){
	// 	Work.global.autoChord.push(chords[i]);
	// 	var c = 0;
	// 	for (var k=0; k<12; k++) if (chords[i].mask[k]==1){
	// 		c++;
	// 		var newNote1={
	// 			x: Work.global.bpMeas / Work.global.bpNote * 8 * i + ((c-1)*guitarSwipe),
	// 			y: 27 + k,
	// 			d: Work.global.bpMeas / Work.global.bpNote * 8, //6, 
	// 			s: 0, 
	// 			v: 1, 
	// 			l: 3, //Work.global.layer_sel,
	// 			t: 1 // type: 0: normal note; 1: just improvised			
	// 		};
	// 		// var newNote2={
	// 		// 	x: Work.global.bpMeas / Work.global.bpNote * 8 * i + 6 + ((c-1)*guitarSwipe),
	// 		// 	y: 27 + k,
	// 		// 	d: Work.global.bpMeas / Work.global.bpNote * 2, 
	// 		// 	s: 0, 
	// 		// 	v: 1, 
	// 		// 	l: 3, //Work.global.layer_sel,
	// 		// 	t: 1 // type: 0: normal note; 1: just improvised			
	// 		// };
	// 		if (c==1) newNote1.y += 12; else if (c==3) newNote1.y-=12;
	// 		this.addNote(newNote1);
	// 		// if (c==1) newNote2.y += 12; else if (c==3) newNote2.y-=12;
	// 		// this.addNote(newNote2);
	// 	}
	// };
	var chorder = new motf.Chorder(this, 4, 3, 0);

	this.autoZoom("y");
	//this.updateChords();
 	this.historyPush("auto chord simple"); 	
}

// generate chords according to Work.global.chord (pre-defined, not according to current melody)
Pianoroll.prototype.autoSimpleChordByKey_1=function(){
	let chords=Work.global.chord;
	for (var i=0; i<chords.length; i++) {
		for (var k=0; k<12; k++) if (chords[i].mask[k]==1)
		this.addNote({
				x: Work.global.bpMeas / Work.global.bpNote * 16 * i,
				y: 27 + k,
				d: Work.global.bpMeas / Work.global.bpNote * 16, 
				s: 1, 
				v: 1, 
				p: 1,
				l: Work.global.layer_sel,
				t: 1 // type: 0: normal note; 1: just improvised			
		});
	};
	this.autoZoom("y");
	this.updateChords();
 	this.historyPush("auto chord simple"); 	
}

var pianoroll=new Pianoroll();

pianoroll.recorder = new Tone.Recorder();
//pianoroll.recorder.channelCount = 2;

pianoroll.master.volume = new Tone.Volume(0).toDestination();
pianoroll.master.metro_vol= new Tone.Volume(0).toDestination();
pianoroll.master.rhythm_vol= new Tone.Volume(0).toDestination();

pianoroll.master.reverb =new Tone.Reverb({
	"wet": 0.6,
	"decay": 1.5,
	"preDelay": 0.01
}).connect(pianoroll.master.volume);

// pianoroll.master.reverb = new Tone.Freeverb(0.5).toDestination();
// pianoroll.master.reverb.set({wet : 0.2 });

// pianoroll.master.compressor = new Tone.Compressor(-20, 3).toDestination();

// pianoroll.master.volume = new Tone.Volume(0).connect(pianoroll.master.reverb);

// pianoroll.master.volume.connect(pianoroll.master.compressor);

pianoroll.master.volume.connect(Global.fft);
pianoroll.master.volume.connect(Global.meter);
pianoroll.master.volume.connect(pianoroll.recorder);
//pianoroll.master.metro_vol.connect(Global.meter);
//pianoroll.master.rhythm_vol.connect(Global.meter);

//pianoroll.master.rhythm_vol.connect(pianoroll.recorder);
