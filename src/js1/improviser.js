var Improviser={};

(function(){

// piano event protocol: 
// 0-87: release & hit a piano key (+21 => midi code); 
// 88: hold;
// 89: rest; 

const HOLD = 88;
const REST = 89;


function Verse(context){
	this.context = context;
	this.resolution = 0.5; // unit: beat
	this.bars = 4;
	this.length = context.bpMeas / this.resolution * this.bars;
	this.buffer = [];
}
Verse.prototype.improvise = function(){
	this.buffer=[];
	this.buffer.push(this.context.root);
	var lastNote = this.context.root;
	var actionChoices = {values:["NOTE","HOLD","REST"],chances:[0.3,0.69,0.01]};
	for (var i=1; i<this.length; i++){
		var offset= 1/(this.lastNote-this.context.root);
		var stepChoices = {values:[2,-2,-5,-7],chances:[0.7,0.1,0.18,0.02]};
		var action=myLib.randPick(actionChoices);
		if (i & 8 == 0) {
			action = "NOTE";
		}
		if (action=="REST")
			this.buffer.push(REST);
		else if (action=="HOLD")
			this.buffer.push(HOLD);
		else if (action=="NOTE") {
			var newNote = lastNote + myLib.randPick(stepChoices);
			this.buffer.push(newNote);
			lastNote = newNote;
		};
	};
	return this.buffer;
}
Verse.prototype.log = function(){
	return this.buffer;
}


function matrix12(){
	// generate random row1
	var tones=[];
	for (var i=0; i<12; i++) tones.push(i);
	var res=[];
	function getO(n=12){
		if (n==1){
			res.push(tones[0]);
			return;
		};
		var i = Math.floor(Math.random()*tones.length);
		var tone = tones[i];
		tones.splice(i,1);
		res.push(tone);
		getO(n-1);
	};
	getO();

	// generate 12-tone matrix from row1
//	var row1=res; 
	var row1=[0,10,1,5,4,6,2,11,3,8,7,9];
	var mat=[row1];
	for (var i=1; i<12; i++) {
		var row=[];
		for (var j=0; j<12; j++)
			row.push((12-row1[i]+row1[j])%12);
		mat.push(row);
	};
	return mat;
}
	
var mat12 = matrix12();

//console.log(mat12);

function nextFromMat12(mat, note){
	var y=Math.floor(Math.random()*12);
	var x=mat[y].indexOf(note);
	return {x,y};
}

//console.log(nextFromMat12(mat12, 4));

// Export

Improviser.HOLD = HOLD;
Improviser.REST = REST;
Improviser.Verse = Verse;

})()
