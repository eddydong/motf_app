var myLib={};

(function(){

function arrayEqual(a, b) {
    a = a.sort();
    b = b.sort();
    if (a.length != b.length) 
 	   return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) 
        return false;
    }
    return true;
}

// a, b: {x, y}
function getDist(a,b){
	return Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));
}

function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// from, to: {x, y}
// output: 0 ~ PI*2
function getAngle(from, to){
	var dx = to.x-from.x;
	var dy = to.y-from.y;
	var a=Math.atan(dy/dx);
	if (dx<0) { a+=Math.PI; };
	return (a+Math.PI*2) % (Math.PI*2);
};

function deepCopy(o){
	return JSON.parse(JSON.stringify(o));
}

function byChance(p){
	if (Math.random()<p) return true;
	return false;
}

function oneOrMinusOne(){
	if (byChance(0.5)) return 1;
	return -1;
}

function sum(arr){
	var s=0;
	for (var i=0; i<arr.length; i++)
		s+=arr[i];
	return s;
}

function inRange(n,l,r){
	return n>=l && n<=r;
}

function minIndex(a){
	return a.indexOf(Math.min(...a));
}

function arrayDel(a, i){
	return a.filter((_, index) => index !== i);
}

function maxIndex(a){
	return a.indexOf(Math.max(...a));
}

// arr: {values: [value1, value2,... valueN], chances: [chance1, chance2,... chanceN]}
// where chance1 + chance2 + ... + chanceN == 1
function randPick(choices){
	var s = sum(choices.chances);
	if (choices.chances.length!=choices.values.length)
		return null;
	var ch=deepCopy(choices);
	for (var i=0; i<ch.chances.length; i++)
		ch.chances[i]=ch.chances[i]/s;
	var flags = [0];
	for (var i=0; i<ch.chances.length; i++)
		flags.push(flags[i]+ch.chances[i]);
	var rand = Math.random();
	for (var i=0; i<ch.chances.length; i++)
		if (inRange(rand, flags[i], flags[i+1])) {
			return ch.values[i];
		}
	return null;
}

// get a random element form a give array
function pick(a){
	return a[Math.floor(Math.random()*a.length)];
}

function getMaxIndex(arr){
	var max=0, maxI=[];
	for (var i=0; i<arr.length; i++) 
		if (max<arr[i]) {
			max=arr[i];
			maxI[0]=i;
		};
	max=0;
	for (var i=0; i<arr.length; i++) 
		if ((max<arr[i] && arr[i]) && i!=maxI[0]) {
			max=arr[i];
			maxI[1]=i;
		};
	if (maxI.length==1) maxI[1]=maxI[0];
	return maxI;
}

myLib.animQueue=[];
function ramp(object, property, from, to, inSeconds=0.15){
	for (var i=0; i<myLib.animQueue.length; i++)
	if (myLib.animQueue[i][0]===object && myLib.animQueue[i][1]===property
		&& myLib.animQueue[i][2] != null){
		clearInterval(myLib.animQueue[i][2]);
		object[property] = to;
		myLib.animQueue[i][2] = null;
	};		

	var step = (to-from) / (inSeconds / 0.01);
	object[property] = from;

	myLib.animQueue.push([object, property,
		setInterval(function(){
		if (Math.abs(object[property]+step - to)<Math.abs(step)){
			for (var i=0; i<myLib.animQueue.length; i++)
			if (myLib.animQueue[i][0]===object && myLib.animQueue[i][1]===property
				&& myLib.animQueue[i][2] != null){
				clearInterval(myLib.animQueue[i][2]);
				object[property] = to;
				myLib.animQueue[i][2] = null;
			};		
		} else 
			object[property]+=step;
	},10)]);
}

// Export

myLib.deepCopy = deepCopy;
myLib.arrayEqual = arrayEqual;
myLib.byChance = byChance;
myLib.oneOrMinusOne = oneOrMinusOne;
myLib.randPick = randPick;
myLib.getDist = getDist;
myLib.getAngle = getAngle;
myLib.getUuid = getUuid;
myLib.arrayDel = arrayDel;
myLib.pick = pick;
myLib.getMaxIndex = getMaxIndex;
myLib.ramp = ramp;

})();
