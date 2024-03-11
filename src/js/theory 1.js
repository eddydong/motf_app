var Theory= {};

(function(){

// var tsd=Tonal.ScaleDictionary.all();
// var scaleDict=[];
// for (var i=0; i<tsd.length; i++) {
// 	var c=0;
// 	for (var j=0; j<12; j++) if (tsd[i].chroma[j]==1) c++;
// 	scaleDict.push({id: i, name: tsd[i].name, mask: tsd[i].chroma, len: c});
// };
// 
// var cts=Tonal.ChordType.all();
// var cns=Tonal.ChordType.symbols();
// var chordDict=[];
// for (var i=0; i<cts.length; i++) {
// 	var c=0;
// 	for (var j=0; j<12; j++) if (cts[i].chroma[j]==1) c++;
// 	chordDict.push({id: i, symbol: cns[i], mask: cts[i].chroma, len: c});
// };
//
// var output=JSON.stringify({chordDict: chordDict, scaleDict: scaleDict});
// var a = document.body.appendChild( document.createElement("a") );
// a.download = "dict.js";
// a.href = "data:text/plain;base64," + btoa(output);
// a.click();
// document.body.removeChild(a);

const chordDict=[{"id":0,"symbol":"5","mask":"100000010000","len":2},{"id":1,"symbol":"M7#5sus4","mask":"100001001001","len":4},{"id":2,"symbol":"7#5sus4","mask":"100001001010","len":4},{"id":3,"symbol":"sus4","mask":"100001010000","len":3},{"id":4,"symbol":"M7sus4","mask":"100001010001","len":4},{"id":5,"symbol":"7sus4","mask":"100001010010","len":4},{"id":6,"symbol":"7no5","mask":"100010000010","len":3},{"id":7,"symbol":"aug","mask":"100010001000","len":3},{"id":8,"symbol":"M7b6","mask":"100010001001","len":4},{"id":9,"symbol":"maj7#5","mask":"100010001001","len":4},{"id":10,"symbol":"7#5","mask":"100010001010","len":4},{"id":11,"symbol":"7b13","mask":"100010001010","len":4},{"id":12,"symbol":"M","mask":"100010010000","len":3},{"id":13,"symbol":"maj7","mask":"100010010001","len":4},{"id":14,"symbol":"7","mask":"100010010010","len":4},{"id":15,"symbol":"6","mask":"100010010100","len":4},{"id":16,"symbol":"7add6","mask":"100010010110","len":5},{"id":17,"symbol":"7b6","mask":"100010011010","len":5},{"id":18,"symbol":"Mb5","mask":"100010100000","len":3},{"id":19,"symbol":"M7b5","mask":"100010100001","len":4},{"id":20,"symbol":"7b5","mask":"100010100010","len":4},{"id":21,"symbol":"maj#4","mask":"100010110001","len":5},{"id":22,"symbol":"7#11","mask":"100010110010","len":5},{"id":23,"symbol":"M6#11","mask":"100010110100","len":5},{"id":24,"symbol":"7#11b13","mask":"100010111010","len":6},{"id":25,"symbol":"m#5","mask":"100100001000","len":3},{"id":26,"symbol":"mb6M7","mask":"100100001001","len":4},{"id":27,"symbol":"m7#5","mask":"100100001010","len":4},{"id":28,"symbol":"m","mask":"100100010000","len":3},{"id":29,"symbol":"m/ma7","mask":"100100010001","len":4},{"id":30,"symbol":"m7","mask":"100100010010","len":4},{"id":31,"symbol":"m6","mask":"100100010100","len":4},{"id":32,"symbol":"mMaj7b6","mask":"100100011001","len":5},{"id":33,"symbol":"dim","mask":"100100100000","len":3},{"id":34,"symbol":"oM7","mask":"100100100001","len":4},{"id":35,"symbol":"m7b5","mask":"100100100010","len":4},{"id":36,"symbol":"dim7","mask":"100100100100","len":4},{"id":37,"symbol":"o7M7","mask":"100100100101","len":5},{"id":38,"symbol":"4","mask":"100101000010","len":4},{"id":39,"symbol":"madd4","mask":"100101010000","len":4},{"id":40,"symbol":"m7add11","mask":"100101010010","len":5},{"id":41,"symbol":"+add#9","mask":"100110001000","len":4},{"id":42,"symbol":"7#5#9","mask":"100110001010","len":5},{"id":43,"symbol":"7#9","mask":"100110010010","len":5},{"id":44,"symbol":"13#9","mask":"100110010110","len":6},{"id":45,"symbol":"7#9b13","mask":"100110011010","len":6},{"id":46,"symbol":"maj7#9#11","mask":"100110110001","len":6},{"id":47,"symbol":"7#9#11","mask":"100110110010","len":6},{"id":48,"symbol":"13#9#11","mask":"100110110110","len":7},{"id":49,"symbol":"7#9#11b13","mask":"100110111010","len":7},{"id":50,"symbol":"sus2","mask":"101000010000","len":3},{"id":51,"symbol":"M9#5sus4","mask":"101001001001","len":5},{"id":52,"symbol":"sus24","mask":"101001010000","len":4},{"id":53,"symbol":"M9sus4","mask":"101001010001","len":5},{"id":54,"symbol":"11","mask":"101001010010","len":5},{"id":55,"symbol":"9sus4","mask":"101001010010","len":5},{"id":56,"symbol":"13sus4","mask":"101001010110","len":6},{"id":57,"symbol":"9no5","mask":"101010000010","len":4},{"id":58,"symbol":"13no5","mask":"101010000110","len":5},{"id":59,"symbol":"M#5add9","mask":"101010001000","len":4},{"id":60,"symbol":"maj9#5","mask":"101010001001","len":5},{"id":61,"symbol":"9#5","mask":"101010001010","len":5},{"id":62,"symbol":"9b13","mask":"101010001010","len":5},{"id":63,"symbol":"Madd9","mask":"101010010000","len":4},{"id":64,"symbol":"maj9","mask":"101010010001","len":5},{"id":65,"symbol":"9","mask":"101010010010","len":5},{"id":66,"symbol":"6/9","mask":"101010010100","len":5},{"id":67,"symbol":"maj13","mask":"101010010101","len":6},{"id":68,"symbol":"M7add13","mask":"101010010101","len":6},{"id":69,"symbol":"13","mask":"101010010110","len":6},{"id":70,"symbol":"M9b5","mask":"101010100001","len":5},{"id":71,"symbol":"9b5","mask":"101010100010","len":5},{"id":72,"symbol":"13b5","mask":"101010100110","len":6},{"id":73,"symbol":"9#5#11","mask":"101010101010","len":6},{"id":74,"symbol":"maj9#11","mask":"101010110001","len":6},{"id":75,"symbol":"9#11","mask":"101010110010","len":6},{"id":76,"symbol":"69#11","mask":"101010110100","len":6},{"id":77,"symbol":"M13#11","mask":"101010110101","len":7},{"id":78,"symbol":"13#11","mask":"101010110110","len":7},{"id":79,"symbol":"9#11b13","mask":"101010111010","len":7},{"id":80,"symbol":"m9#5","mask":"101100001010","len":5},{"id":81,"symbol":"madd9","mask":"101100010000","len":4},{"id":82,"symbol":"mM9","mask":"101100010001","len":5},{"id":83,"symbol":"m9","mask":"101100010010","len":5},{"id":84,"symbol":"m69","mask":"101100010100","len":5},{"id":85,"symbol":"m13","mask":"101100010110","len":6},{"id":86,"symbol":"mMaj9b6","mask":"101100011001","len":6},{"id":87,"symbol":"m9b5","mask":"101100100010","len":5},{"id":88,"symbol":"m11A","mask":"101101001010","len":6},{"id":89,"symbol":"m11","mask":"101101010010","len":6},{"id":90,"symbol":"b9sus","mask":"110001010010","len":5},{"id":91,"symbol":"11b9","mask":"110001010010","len":5},{"id":92,"symbol":"7sus4b9b13","mask":"110001011010","len":6},{"id":93,"symbol":"alt7","mask":"110010000010","len":4},{"id":94,"symbol":"7#5b9","mask":"110010001010","len":5},{"id":95,"symbol":"Maddb9","mask":"110010010000","len":4},{"id":96,"symbol":"M7b9","mask":"110010010001","len":5},{"id":97,"symbol":"7b9","mask":"110010010010","len":5},{"id":98,"symbol":"13b9","mask":"110010010110","len":6},{"id":99,"symbol":"7b9b13","mask":"110010011010","len":6},{"id":100,"symbol":"7#5b9#11","mask":"110010101010","len":6},{"id":101,"symbol":"7b9#11","mask":"110010110010","len":6},{"id":102,"symbol":"13b9#11","mask":"110010110110","len":7},{"id":103,"symbol":"7b9b13#11","mask":"110010111010","len":7},{"id":104,"symbol":"mb6b9","mask":"110100001000","len":4},{"id":105,"symbol":"7b9#9","mask":"110110010010","len":6}];

const scaleDict=[{"id":0,"name":"major pentatonic","mask":"101010010100","len":5},{"id":1,"name":"ionian pentatonic","mask":"100011010001","len":5},{"id":2,"name":"mixolydian pentatonic","mask":"100011010010","len":5},{"id":3,"name":"ritusen","mask":"101001010100","len":5},{"id":4,"name":"egyptian","mask":"101001010010","len":5},{"id":5,"name":"neopolitan major pentatonic","mask":"100011100010","len":5},{"id":6,"name":"vietnamese 1","mask":"100101011000","len":5},{"id":7,"name":"pelog","mask":"110100011000","len":5},{"id":8,"name":"kumoijoshi","mask":"110001011000","len":5},{"id":9,"name":"hirajoshi","mask":"101100011000","len":5},{"id":10,"name":"iwato","mask":"110001100010","len":5},{"id":11,"name":"in-sen","mask":"110001010010","len":5},{"id":12,"name":"lydian pentatonic","mask":"100010110001","len":5},{"id":13,"name":"malkos raga","mask":"100101001010","len":5},{"id":14,"name":"locrian pentatonic","mask":"100101100010","len":5},{"id":15,"name":"minor pentatonic","mask":"100101010010","len":5},{"id":16,"name":"minor six pentatonic","mask":"100101010100","len":5},{"id":17,"name":"flat three pentatonic","mask":"101100010100","len":5},{"id":18,"name":"flat six pentatonic","mask":"101010011000","len":5},{"id":19,"name":"scriabin","mask":"110010010100","len":5},{"id":20,"name":"whole tone pentatonic","mask":"100010101010","len":5},{"id":21,"name":"lydian #5P pentatonic","mask":"100010101001","len":5},{"id":22,"name":"lydian dominant pentatonic","mask":"100010110010","len":5},{"id":23,"name":"minor #7M pentatonic","mask":"100101010001","len":5},{"id":24,"name":"super locrian pentatonic","mask":"100110100010","len":5},{"id":25,"name":"minor hexatonic","mask":"101101010001","len":6},{"id":26,"name":"augmented","mask":"100110011001","len":6},{"id":27,"name":"major blues","mask":"101110010100","len":6},{"id":28,"name":"piongio","mask":"101001010110","len":6},{"id":29,"name":"prometheus neopolitan","mask":"110010100110","len":6},{"id":30,"name":"prometheus","mask":"101010100110","len":6},{"id":31,"name":"mystery #1","mask":"110010101010","len":6},{"id":32,"name":"six tone symmetric","mask":"110011001100","len":6},{"id":33,"name":"whole tone","mask":"101010101010","len":6},{"id":34,"name":"messiaen's mode #5","mask":"110001110001","len":6},{"id":35,"name":"minor blues","mask":"100101110010","len":6},{"id":36,"name":"locrian major","mask":"101011101010","len":7},{"id":37,"name":"double harmonic lydian","mask":"110010111001","len":7},{"id":38,"name":"harmonic minor","mask":"101101011001","len":7},{"id":39,"name":"altered","mask":"110110101010","len":7},{"id":40,"name":"locrian #2","mask":"101101101010","len":7},{"id":41,"name":"mixolydian b6","mask":"101011011010","len":7},{"id":42,"name":"lydian dominant","mask":"101010110110","len":7},{"id":43,"name":"lydian","mask":"101010110101","len":7},{"id":44,"name":"lydian augmented","mask":"101010101101","len":7},{"id":45,"name":"dorian b2","mask":"110101010110","len":7},{"id":46,"name":"melodic minor","mask":"101101010101","len":7},{"id":47,"name":"locrian","mask":"110101101010","len":7},{"id":48,"name":"ultralocrian","mask":"110110101100","len":7},{"id":49,"name":"locrian 6","mask":"110101100110","len":7},{"id":50,"name":"augmented heptatonic","mask":"100111011001","len":7},{"id":51,"name":"dorian #4","mask":"101100110110","len":7},{"id":52,"name":"lydian diminished","mask":"101100110101","len":7},{"id":53,"name":"phrygian","mask":"110101011010","len":7},{"id":54,"name":"leading whole tone","mask":"101010101011","len":7},{"id":55,"name":"lydian minor","mask":"101010111010","len":7},{"id":56,"name":"phrygian dominant","mask":"110011011010","len":7},{"id":57,"name":"balinese","mask":"110101011001","len":7},{"id":58,"name":"neopolitan major","mask":"110101010101","len":7},{"id":59,"name":"aeolian (minor)","mask":"101101011010","len":7},{"id":60,"name":"harmonic major","mask":"101011011001","len":7},{"id":61,"name":"double harmonic major","mask":"110011011001","len":7},{"id":62,"name":"dorian","mask":"101101010110","len":7},{"id":63,"name":"hungarian minor","mask":"101100111001","len":7},{"id":64,"name":"hungarian major","mask":"100110110110","len":7},{"id":65,"name":"oriental","mask":"110011100110","len":7},{"id":66,"name":"flamenco","mask":"110110110010","len":7},{"id":67,"name":"todi raga","mask":"110100111001","len":7},{"id":68,"name":"mixolydian","mask":"101011010110","len":7},{"id":69,"name":"persian","mask":"110011101001","len":7},{"id":70,"name":"ionian (major)","mask":"101011010101","len":7},{"id":71,"name":"enigmatic","mask":"110010101011","len":7},{"id":72,"name":"major augmented","mask":"101011001101","len":7},{"id":73,"name":"lydian #9","mask":"100110110101","len":7},{"id":74,"name":"messiaen's mode #4","mask":"111001111001","len":8},{"id":75,"name":"purvi raga","mask":"110011111001","len":8},{"id":76,"name":"spanish heptatonic","mask":"110111011010","len":8},{"id":77,"name":"bebop","mask":"101011010111","len":8},{"id":78,"name":"bebop minor","mask":"101111010110","len":8},{"id":79,"name":"bebop major","mask":"101011011101","len":8},{"id":80,"name":"bebop locrian","mask":"110101111010","len":8},{"id":81,"name":"minor bebop","mask":"101101011011","len":8},{"id":82,"name":"diminished","mask":"101101101101","len":8},{"id":83,"name":"ichikosucho","mask":"101011110101","len":8},{"id":84,"name":"minor six diminished","mask":"101101011101","len":8},{"id":85,"name":"half-whole diminished","mask":"110110110110","len":8},{"id":86,"name":"kafi raga","mask":"100111010111","len":8},{"id":87,"name":"messiaen's mode #6","mask":"101011101011","len":8},{"id":88,"name":"composite blues","mask":"101111110110","len":9},{"id":89,"name":"messiaen's mode #3","mask":"101110111011","len":9},{"id":90,"name":"messiaen's mode #7","mask":"111101111101","len":10},{"id":91,"name":"eddy_1","mask":"101101011001","len":7},{"id":92,"name":"chromatic","mask":"111111111111","len":12}];


const keyNames=["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];

// function keyScaleFit1(notes) {
// 	var maxScore=-Infinity, maxRes=[];
// 	var totalDuration=0;
// 	for (var i=0; i<notes.length; i++) totalDuration+=notes[i].d;
// 	for (var k=0; k<12; k++) {
// 		for (var s=0; s<scaleDict.length-1; s++) 
// 		{	
// 			var mask = transpose(scaleDict[s].mask, k);
// 			var inScaleDuration=0, outScaleCount=0;
// 			var map=Array(12).fill(0);
// 			for (var n=0; n<notes.length; n++){
// 				if (mask[(notes[n].y+9)%12]=='1') {
// 					map[(notes[n].y+9)%12]=1;
// 					inScaleDuration+=notes[n].d;
// 				};
// 			};
// 			for (var i=0; i<12; i++) 
// 				if (mask[i]=="1" && map[i]==0) outScaleCount++;
// 			var score= inScaleDuration / totalDuration - outScaleCount / 12;
// 			if (score > maxScore) maxScore = score;
// 		}
// 	};
// 	for (var k=0; k<12; k++) {
// 		for (var s=0; s<scaleDict.length-1; s++) 
// 		{	
// 			var mask = transpose(scaleDict[s].mask, k);
// 			var inScaleDuration=0, outScaleCount=0;
// 			var map=Array(12).fill(0);
// 			for (var n=0; n<notes.length; n++){
// 				if (mask[(notes[n].y+9)%12]=='1') {
// 					map[(notes[n].y+9)%12]=1;
// 					inScaleDuration+=notes[n].d;
// 				};
// 			};
// 			for (var i=0; i<12; i++) 
// 				if (mask[i]=="1" && map[i]==0) outScaleCount++;
// 			var score= inScaleDuration / totalDuration - outScaleCount / 12;
// 			if (score == maxScore) 
// 			{
// 				maxRes.push({maxK:k, maxKN: keyNames[k],
//  					 maxS: s, maxSN: scaleDict[s].name});
// 			}
// 		}
// 	};
// 	return {
// 		confidence: maxScore,
// 		bestMatches: maxRes
// 	};
// };


function keyScaleFit1(notes) {
	var maxScore=-Infinity, maxRes=[];
	var totalDuration=0;
	for (var i=0; i<notes.length; i++) totalDuration+=notes[i].d;
	for (var k=0; k<12; k++) {
		for (var s=0; s<scaleDict.length; s++) 
		{	
			var mask = transpose(scaleDict[s].mask, k);
			var inScaleDuration=0, outScaleCount=0;
			var map=Array(12).fill(0);
			for (var n=0; n<notes.length; n++){
				if (mask[(notes[n].y+9)%12]=='1') {
					map[(notes[n].y+9)%12]=1;
					inScaleDuration+=notes[n].d;
				};
			};
			for (var i=0; i<12; i++) 
				if (mask[i]=="1" && map[i]==0) outScaleCount++;
			var score= inScaleDuration / totalDuration; // - outScaleCount / 48;
			if (score > maxScore) maxScore = score;
		}
	};
	for (var k=0; k<12; k++) {
		for (var s=0; s<scaleDict.length; s++) 
		{	
			var mask = transpose(scaleDict[s].mask, k);
			var inScaleDuration=0, outScaleCount=0;
			var map=Array(12).fill(0);
			for (var n=0; n<notes.length; n++){
				if (mask[(notes[n].y+9)%12]=='1') {
					map[(notes[n].y+9)%12]=1;
					inScaleDuration+=notes[n].d;
				};
			};
			for (var i=0; i<12; i++) 
				if (mask[i]=="1" && map[i]==0) outScaleCount++;
			var score= inScaleDuration / totalDuration; // - outScaleCount / 48;
			if (score == maxScore) 
			{
				maxRes.push({maxK:k, maxKN: keyNames[k],
 					 maxS: s, maxSN: scaleDict[s].name});
			}
		}
	};
	return {
		confidence: maxScore,
		bestMatches: maxRes
	};
};



// console.log(keyScaleFit([{y: 27, d: 1},{y: 30, d: 1},{y: 32, d: 1},{y: 33, d: 1},{y: 34, d: 1}
// ,{y: 37, d: 1}]));
//console.log(keyScaleFit([{y: 27, d: 1},{y: 31, d: 1},{y: 34, d: 1}]));

function transpose(mask, offset){
	var res="";
	for (var i=0; i<12; i++) res+= mask[(i+12-offset) % 12];
	return res;
};

function getChordsByKeyScale(key_id, scale_id){
	var mask= transpose(scaleDict[scale_id].mask, key_id);
//	console.log(mask);
	var maxHitRate=-999, bestFit=[];
	for (var k=0; k<12; k++)
		for (var c=0; c<chordDict.length; c++) {
			var chordKeyC=0, scaleKeyC=0, hitC=0;
			var chord=transpose(chordDict[c].mask, k);
			var fit=true;
			for (var i=0; i<12; i++) 
				if (chord[i]=='1' && mask[i]!='1') { fit=false; break; };
			if (fit) bestFit.push({
				key: k, 
				keyN: keyNames[k],
				chord: c, 
				chordN: chordDict[c].symbol, 
				mask: chord
			});
		};
	return bestFit;
}
// var cs=getChordsByKeyScale(0, 35); // blues minor
// var cs=getChordsByKeyScale(0, 70); // major
// console.log(cs);

function endTick(){
	// get whole length of current layer in ticks
	let endTick=-99999;
	for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].l == Work.global.layer_sel &&
			endTick < (Work.global.seqXY[i].x+Work.global.seqXY[i].d))
			endTick = (Work.global.seqXY[i].x+Work.global.seqXY[i].d);
	endTick= Math.ceil(endTick);
	if (endTick==-99999) endTick=0;
	return endTick;
}

Theory.resolution=1;

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

// function getMinIndex(arr){
// 	var min=Infinity, minI;
// 	for (var i=0; i<arr.length; i++) 
// 		if (min>arr[i]) {
// 			min=arr[i];
// 			minI=i;
// 		};
// 	return minI;
// }

function getWeightedKeys(){
	var map=getWeightedMaps(), res=[];
	console.log("weight map", map);
	for (var m=0; m<map.length; m++)
		res.push(getMaxIndex(map[m]));
	return res;
};

// for current layer
function getWeightedMaps(){
	// weight definition (for each bpMeas)
	let weight = [
		[5],
		[5,1],
		[5,1,1],
		[5,1,2.5,1],
		[5,1,1,2.5,1],
		[5,1,1,2.5,1,1],
		[5,1,1,1,2.5,1,1],
		[5,1,1,1,2.5,1,1,1]
	][Work.global.bpMeas-1];

	// get the measure count of current layer
	let measW = Work.global.bpMeas / Work.global.bpNote * 16;
	let measC = Math.ceil(endTick() / measW);
	
	let res=[];
	
	for (var meas=0; meas<measC; meas++){
	
		// grab notes from measure #meas
		let notes=[];
		for (var i=0; i<Work.global.seqXY.length; i++)
		if (Work.global.seqXY[i].l==Work.global.layer_sel)
//		&& Work.global.seqXY[i].t!=1)
		{								
			if (Work.global.seqXY[i].x >= measW * meas
			&& Work.global.seqXY[i].x + Work.global.seqXY[i].d <= measW * (meas+1)) 
			{
				notes.push({
					note: Work.global.seqXY[i],
					weight: weight[
								Math.floor((Work.global.seqXY[i].x-meas*measW) 
								/ (16 / Work.global.bpNote))
							] 
				});
			}
			else if (Work.global.seqXY[i].x < measW * meas
			&& Work.global.seqXY[i].x + Work.global.seqXY[i].d > measW * meas
			&& Work.global.seqXY[i].x + Work.global.seqXY[i].d - measW * meas>0)
				notes.push({
					note: {
						x: measW * meas,
						y: Work.global.seqXY[i].y,
						d: Work.global.seqXY[i].x + Work.global.seqXY[i].d - measW * meas,
						s: Work.global.seqXY[i].s,
						v: Work.global.seqXY[i].v,
						l: Work.global.seqXY[i].l,
						t: Work.global.seqXY[i].t,
					},
					weight: weight[0] 
				});
			else if (Work.global.seqXY[i].x < measW * (meas+1)
			&& Work.global.seqXY[i].x + Work.global.seqXY[i].d > measW * (meas+1)
			&& measW * (meas+1) - Work.global.seqXY[i].x > 0)
			{
				notes.push({
					note: {
						x: Work.global.seqXY[i].x,
						y: Work.global.seqXY[i].y,
						d: measW * (meas+1) - Work.global.seqXY[i].x,
						s: Work.global.seqXY[i].s,
						v: Work.global.seqXY[i].v,
						l: Work.global.seqXY[i].l,
						t: Work.global.seqXY[i].t,
					},
					weight: weight[
								Math.floor((Work.global.seqXY[i].x-meas*measW) 
								/ (16 / Work.global.bpNote))
							] 
				})
			}
			else 
			// if (Work.global.seqXY[i].x < measW * meas
			// && Work.global.seqXY[i].x+Work.global.seqXY[i].d > measW * (meas+1))
				notes.push({
					note: {
						x: measW * meas,
						y: Work.global.seqXY[i].y,
						d: measW,
						s: Work.global.seqXY[i].s,
						v: Work.global.seqXY[i].v,
						l: Work.global.seqXY[i].l,
						t: Work.global.seqXY[i].t,
					},
					weight: weight[0] 
				});
		};

//console.log("meas",meas, "notes",notes);

		// map the notes into the 12 keys with note duration * weight
		var map=[];
		for (var k=0; k<12; k++){
			map.push(0);
			for (var n=0; n<notes.length; n++)
				if ((notes[n].note.y+9) % 12 == k){
					map[k] += notes[n].note.d / 16 * notes[n].weight;	
				};
		};
		
		// push the weighted mapping of measure #meas into the result
		res.push(map);
	
	};
	
	return res;
}

// automatically generate chords according to the melody (all notes on current layer)
// considering all chords that fit in ANY key/scale pairs
function getChordsByMelody(){
	// get the measure count of current layer
	let measW = Work.global.bpMeas / Work.global.bpNote * 16;
	let measC = Math.ceil(endTick() / measW);

	let weightMaps=getWeightedMaps(); 
	
	let res=[];
	
	for (var m=0; m<measC; m++){
		res.push([]);
		let maxMatch=0;
		for (var c=0; c<chordDict.length; c++) 
		for (var k=0; k<12; k++){
			let match=0;
			let currentChord = transpose(chordDict[c].mask, k);
			for (var mk=0; mk<12; mk++){
				match += currentChord[mk] * weightMaps[m][mk];
			};
			if (maxMatch < match) maxMatch = match;		
		};
		for (var c=0; c<chordDict.length; c++) 
		for (var k=0; k<12; k++) {
			let match=0;
			let currentChordMask = transpose(chordDict[c].mask, k);
			for (var mk=0; mk<12; mk++){
				match += currentChordMask[mk] * weightMaps[m][mk];
			};
			let chordKeyC=0;
			for (var i=0; i<currentChordMask.length; i++) chordKeyC+=parseInt(currentChordMask[i]);
			if ( maxMatch == match 
				&& (chordKeyC==3 || chordKeyC==4) 
//  					&& chordDict[c].symbol.indexOf('#')==-1 
//  					&& chordDict[c].symbol.indexOf('b')==-1
//  					&& chordDict[c].symbol.indexOf('sus')==-1
//  					&& chordDict[c].symbol.indexOf('add')==-1
//  					&& chordDict[c].symbol.indexOf('6')==-1
//  					&& chordDict[c].symbol.indexOf('no')==-1
//  					&& chordDict[c].symbol.indexOf('alt')==-1
			) {
				res[m].push({
					maxMatch, 
					key_id: k, 
					keyN: keyNames[k], 
					chord_id: c, 
					chordN: chordDict[c].symbol, 
					chordKeyC: chordKeyC,
					mask: transpose(chordDict[c].mask, k)
				});
			};		
		};		
	};
	
	return res;
}

// automatically generate chords according to the melody (all notes on current layer)
// considering chords that fit in given key/scale pair
// function getChordsByMelodyKeyScale1(key, scale){
// 	// get the measure count of current layer
// 	let measW = Work.global.bpMeas / Work.global.bpNote * 16;
// 	let measC = Math.ceil(endTick() / measW);
// 	let weightKeys=getWeightedMaps(); 
// 	let chords=getChordsByKeyScale(key, scale);
// 	let res=[];
// 	for (var m=0; m<measC; m++){
// 		res.push([]);
// 		let maxMatch=0;
// 		for (var c=0; c<chords.length; c++) {
// 			let match=0;
// 			for (var mk=0; mk<12; mk++)
// 				match += chords[c].mask[mk] * weightMaps[m][mk];
// 			if (maxMatch < match) maxMatch = match;		
// 		};
// 		for (var c=0; c<chords.length; c++) {
// 			let match=0;
// 			for (var mk=0; mk<12; mk++)
// 				match += chords[c].mask[mk] * weightMaps[m][mk];
// 			let chordKeyC=0;
// 			for (var i=0; i<12; i++) chordKeyC+=parseInt(chords[c].mask[i]);
// 			if ( 
// //			maxMatch == match && 
// match>0 &&
// 				(chordKeyC==3 || chordKeyC==4) 
// 				&& (chords[c].chordN=="M" ||chords[c].chordN=="m" ||chords[c].chordN=="7")
// //  					&& chords[c].chordN.indexOf('#')==-1 
// //  					&& chords[c].chordN.indexOf('b')==-1
// // // 					&& chords[c].chordN.indexOf('sus')==-1
// // // 					&& chords[c].chordN.indexOf('add')==-1
// //  					&& chords[c].chordN.indexOf('6')==-1
// //  					&& chords[c].chordN.indexOf('no')==-1
// //  					&& chords[c].chordN.indexOf('alt')==-1
// 			) {
// 				res[m].push(chords[c]);
// 			};		
// 		};		
// 	};
// 	
// 	return res;
// }

// c1/c2: {name (I,ii,...V7), mask}
function voiceLeadingScore(c1, c2){
	// by number of keys in the chord
	var k1=0, k2=0;
	for (var i=0; i<12; i++) {
		if (c1.mask[i]==1) k1++;
		if (c2.mask[i]==1) k2++;
	};
	let minChord= k1 > k2 ? c2 : c1;
	let maxChord= k1 > k2 ? c1 : c2;
	let maxKC= k1 > k2 ? k1 : k2;
	let score=0;	
	for (var k=0; k<12; k++) if (maxChord.mask[k]==1) {
		let upC=0;
		for (var i=k; i<k+12; i++)
			if (minChord.mask[i % 12]==1) {
				upC = i-k;// Math.pow(i-k, 2);
				break;
			}
		if (upC==0) upC=1.3;
		let downC=0;
		for (var i=k+12; i>k; i--)
			if (minChord.mask[i % 12]==1) {
				downC = k+12-i; //Math.pow(k+12-i, 2);
				break;
			}
		if (downC==0) downC=1.3;
		score += upC > downC ? downC : upC;
	}
	score=score/maxKC; //console.log(c1,c2,score);
	return score;
}

// Simply use the "k"th diatonic chord to accompany the "k"th diatonic key in the scale
// Example: For D Major, "k" of E, or the 2nd diatonic key in D Major, will be accompanied with the 2nd diatonic chord, or Em
function getChordsByMelodyKeyScale(key_id, scale_id, firstMeas, lastMeas){

	let chords=getDiatonicChordsByKeyScale(key_id, scale_id);
	console.log("chords",chords);

	let weightKeys=getWeightedKeys(); 
	console.log("weightKeys",weightKeys);

	let res=[];
	for (var i=0; i<weightKeys.length; i++) res.push(chords[getScaleIndexFromMaskIndex(scale_id, key_id, weightKeys[i][0])-1]);
	
	return res;
}

// function getChordsByMelodyKeyScale(key_id, scale_id, firstMeas, lastMeas){
// 
// 	let weightKeys=getWeightedKeys(); 
// 	console.log("weightKeys",weightKeys);
// 
// 	let chords=getSlimChordsByKeyScale(key_id, scale_id);
// 	console.log("chords",chords);
// 	
// 	let chordMap=[];
// 	
// 	for (var m=firstMeas; m<lastMeas; m++){
// 		let cs=[];
// 		for (var c=0; c<chords.length; c++)
// 			if (chords[c].mask[weightKeys[m][0]]=='1' 
// 				&& chords[c].mask[weightKeys[m][1]]=='1')
// 				cs.push(c);
// 		chordMap.push(cs);
// 	};
// 	
// 	for (var m=firstMeas; m<lastMeas; m++){
// 		if (chordMap[m].length==0) {
// 			let cs=[];
// 			for (var c=0; c<chords.length; c++)
// 				if (chords[c].mask[weightKeys[m][0]]=='1')
// 					cs.push(c);
// 			for (var i=0; i<cs.length; i++) chordMap[m].push(cs[i]);
// 		}
// 	};
// 	
// 	console.log("chordMap",chordMap);
// 
// 	let chordRes=[];
// 	
// 	for (var m=firstMeas; m<lastMeas; m++){
// 		if (m==0) {
// 			// if the first chord - try to use the I chord
// 			if (chordMap[m].indexOf(0)>-1) chordRes[m]=0;
// 			else { // if I chord not fit in the first measure...
// 				chordRes[m]=chordMap[m][0]; // to be upgraded				
// 			}
// 		} else { // if m>0
// 			let min=Infinity, minC; 
// 			for (var c=0; c<chordMap[m].length; c++) {
// //			console.log(m, c, chords[chordRes[m-1]], chords[chordMap[m][c]]);
// 				let score= 0;
// 				if (chords[chordRes[m-1]] && chords[chordMap[m][c]]) 
// 					voiceLeadingScore(chords[chordRes[m-1]], chords[chordMap[m][c]]);
// //				if (score==0) score=2;  
// //				if (chordMap[m][c]==0) score=score*0.8;
// //				else if (chordMap[m][c]==4 || chordMap[m][c]==6) score=score*0.5;
// //				else if (chordMap[m][c]==3) score=score*0.4;
// //				if (chordRes.indexOf(chordMap[m][c])>-1) score=score+1;
// //				if (chordMap[m][c]==chordRes[m-1]) score=score*1.5;
// 
// 				if (min > score) {
// 					min=score;
// 					minC=chordMap[m][c];
// 				}
// 			};
// 			chordRes[m]=minC;
// 		};
// 	};
// 	
// 	console.log("chordRes",chordRes);	
// 	
// 	let res=[];
// 	for (var i=0; i< chordRes.length; i++) res.push(chords[chordRes[i]]);
// 	
// 	return res;
// }

// function getChordsByMelodyKeyScale(key_id, scale_id, firstMeas, lastMeas){
// 	console.log("key_id, scale_id, firstMeas, lastMeas",key_id, scale_id, firstMeas, lastMeas);
// 
// 	// get the measure count of current layer
// // 	let measW = Work.global.bpMeas / Work.global.bpNote * 16;
// // 	let measC = Math.ceil(endTick() / measW);
// 
// 	let weightKeys=getWeightedKeys(); 
// 	console.log("weightKeys",weightKeys);
// 
// 	let chords=getSlimChordsByKeyScale(key_id, scale_id);
// 	console.log("chords",chords);
// 	
// 	let chordMap=[];
// 	
// 	for (var m=firstMeas; m<lastMeas; m++){
// 		let cs=[];
// 		for (var c=0; c<chords.length; c++)
// 			if (chords[c].mask[weightKeys[m][0]]=='1' 
// 				&& chords[c].mask[weightKeys[m][1]]=='1')
// 				cs.push(c);
// //		if (cs.length==0) cs.push(0);
// 		chordMap.push(cs);
// 	};
// 	
// 	for (var m=firstMeas; m<lastMeas; m++){
// 		if (chordMap[m].length==0) {
// 			let cs=[];
// 			for (var c=0; c<chords.length; c++)
// 				if (chords[c].mask[weightKeys[m][0]]=='1')
// 					cs.push(c);
// 	//		if (cs.length==0) cs.push(0);
// 			for (var i=0; i<cs.length; i++) chordMap[m].push(cs[i]);
// 		}
// 	};
// 	
// 	
// //	if (chordMap.length==0) return [];
// 	
// 	console.log("chordMap",chordMap);
// 
// 	let chordRes=[];
// 	
// 	for (var m=firstMeas; m<lastMeas; m++){
// 		if (m==0) {
// 			// if the first chord - try to use the I chord
// 			if (chordMap[m].indexOf(0)>-1) chordRes[m]=0;
// 			else { // if I chord not fit in the first measure...
// 				chordRes[m]=chordMap[m][0]; // to be upgraded				
// 			}
// 		} else { // if m>0
// 			let min=Infinity, minC; console.log(m);
// 			for (var c=0; c<chordMap[m].length; c++) {
// //			console.log(m, c, chords[chordRes[m-1]], chords[chordMap[m][c]]);
// 				let score= 0;
// 				if (chords[chordRes[m-1]] && chords[chordMap[m][c]]) 
// 					voiceLeadingScore(chords[chordRes[m-1]], chords[chordMap[m][c]]);
// //				if (score==0) score=2;  
// //				if (chordMap[m][c]==0) score=score*0.8;
// //				else if (chordMap[m][c]==4 || chordMap[m][c]==6) score=score*0.5;
// //				else if (chordMap[m][c]==3) score=score*0.4;
// //				if (chordRes.indexOf(chordMap[m][c])>-1) score=score+1;
// //				if (chordMap[m][c]==chordRes[m-1]) score=score*1.5;
// 
// 				if (min > score) {
// 					min=score;
// 					minC=chordMap[m][c];
// 				}
// 			};
// 			chordRes[m]=minC;
// 		};
// 	};
// 	
// 	console.log("chordRes",chordRes);	
// 	
// 	let res=[];
// 	for (var i=0; i< chordRes.length; i++) res.push(chords[chordRes[i]]);
// 	
// 	return res;
// }

// function getChordsByMelodyKeyScale1(key, scale){
// 	// get the measure count of current layer
// 	let measW = Work.global.bpMeas / Work.global.bpNote * 16;
// 	let measC = Math.ceil(endTick() / measW);
// 
// 	let weightKeys=getWeightedKeys(); 
// 	let chords=getChordsByKeyScale(key, scale);
// 
// 	let chordMap=[];
// 	
// 	for (var m=0; m<measC; m++){
// 		let cs=[];
// 		for (var c=0; c<chords.length; c++)
// 			if (chords[c].mask[weightKeys[m]]=='1')
// 				cs.push(c);
// 		chordMap.push(cs);
// 	};
// 
// 	let chordRes=[];
// 	for (var m=0; m<measC; m++){
// 		if (m==0) {
// 			// if the first chord - try to use the I chord
// 			if (chordMap[m].indexOf(0)>-1) chordRes[m]=0;
// 			else { // if I chord not fit in the first measure...
// 				chordRes[m]=chordMap[m][0]; // to be upgraded				
// 			}
// 		} else { // if m>0
// 			let min=Infinity, minC;
// 			for (var c=0; c<chordMap[m].length; c++) {
// 				let score= voiceLeadingScore(chords[chordRes[m-1]], chords[chordMap[m][c]]);
// 				if (score==0) score=4;  
// 				if (chordMap[m][c]==0) score=score*0.2;
// 				else if (chordMap[m][c]==4 || chordMap[m][c]==6) score=score*0.5;
// 				else if (chordMap[m][c]==3) score=score*0.4;
// 				if (chordRes.indexOf(chordMap[m][c])>-1) score=score*3;
// 				if (min > score) {
// 					min=score;
// 					minC=chordMap[m][c];
// 				}
// 			};
// 			chordRes[m]=minC;
// 		};
// 	};
// 	console.log(chordRes);
// 	let res=[];
// 	for (var i=0; i< chordRes.length; i++) res.push(chords[chordRes[i]]);
// 	return res;
// }

// get the I, ii, iii, IV, V, iv, V7 chords by given Key
// function getSimpleChordsByKey(key){
// 	var chords=[];
// 	chords.push({name: "I", mask: "100010010000"});
// 	chords.push({name: "ii", mask: "001001000100"});
// 	chords.push({name: "iii", mask: "000010010001"});
// 	chords.push({name: "IV", mask: "100001000100"});
// 	chords.push({name: "V", mask: "001000010001"});
// 	chords.push({name: "vi", mask: "100010000100"});
// 	chords.push({name: "V7", mask: "001001010001"});
// 	for (var i=0; i<chords.length; i++) chords[i].mask=transpose(chords[i].mask, key);
// 	return chords;
// }


// turn mask index (0..11) to scale key index (0..ScaleKeyCount-1), with 0 standing for "mask index not in scale"
// s: scale id for scaleDict; k: key of 0..12; n: mask index (0..11)
// return scale key index(0..ScaleKeyCount-1)
// note: For both mask & scale index, 0 is always the Tonic/Root pitch, since we have transposed back to key of C by the param "k"
// Example: input (70, 2, 4), or the E in D Major, and output will be 2, or the second diatonic pitch in D Major
// Jan 8, 2024
function getScaleIndexFromMaskIndex(s, k, n){
	var si=0;
	for (var i=k; i<12; i++) {
		if (scaleDict[s].mask[(i+12-k) % 12]==1) {
			si++;
			if (i==n) return si;
		};
	};
	for (var i=0; i<k; i++) {
		if (scaleDict[s].mask[(i+12-k) % 12]==1) {
			si++;
			if (i==n) return si;
		};
	};
	return 0;
}

// find the closest key in scale to the given key(i)
function findClosest(scale, i){
	var min=Infinity, minI; 
	for (var k=0; k<24; k++)
		if (scale.mask[k % 12]==1)
			if (min>Math.abs(k-i) && Math.abs(k-i)<2
				&& k<=i // only left search allowed
				){
				min=Math.abs(k-i);
				minI=k % 12;
			}
	return minI;
}

function getTriadFromScaleKey(scale, key, add5){
	var res=Array(12).fill(0);
	var harmony;
	harmony=[(0+key)%12,(4+key)%12,(7+key)%12];
	if (add5 && scale.mask[7]==1) harmony.push(7);
	for (var h=0; h<harmony.length; h++) 
//		if (h!=2 || scale.mask[harmony[h]]==1)	// for the dominant note we don't compromise!
			res[findClosest(scale, harmony[h])]=1; 
			
	var resS="";
	for (var i=0; i<12; i++) resS+=res[i];
	return resS;
};

// get the I, ii, iii, IV, V... triad chords by given key_id & scale_id
function getDiatonicChordsByKeyScale(key_id, scale_id){
	var scale = scaleDict[scale_id];
	var mk;
	for (var k=0; k<12; k++) 
	if (scale.mask[k]==1) mk=k;
	var res=[];	
	var kc=0;
	for (var k=0; k<12; k++) 
	if (scale.mask[k]==1){
		kc++;
		if (k==mk) // if the last diatonic chord, add the dominent key (e.g.: for the 7th diatonic chord for C Major, Bo, we add in the key G, and Bo+G => G7)
		res.push({name:"No. "+kc, mask:getTriadFromScaleKey(scale, k, 1),});
		else res.push({name:"No. "+kc, mask:getTriadFromScaleKey(scale, k, 0)});
	}
	for (var i=0; i<kc; i++) res[i].mask=transpose(res[i].mask, key_id);
	return res;
}

//console.log(getSlimChordsByKeyScale(9, 45));


// function getTriadFromScaleKey(scale, key, add5){
// 	var res=Array(12).fill(0);
// 	var harmony;
// 	harmony=[(0+key)%12,(4+key)%12,(7+key)%12];
// 	if (add5 && scale.mask[7]==1) harmony.push(7);
// 	for (var h=0; h<harmony.length; h++) 
// //		if (h!=2 || scale.mask[harmony[h]]==1)	// for the dominant note we don't compromise!
// 			res[findClosest(scale, harmony[h])]=1; 
// 			
// 	var resS="";
// 	for (var i=0; i<12; i++) resS+=res[i];
// 	return resS;
// };
// 
// // get the I, ii, iii, IV, V... triad chords by given key_id & scale_id
// function getSlimChordsByKeyScale(key_id, scale_id){
// 	var scale = scaleDict[scale_id];
// 	var mk;
// 	for (var k=0; k<12; k++) 
// 	if (scale.mask[k]==1) mk=k;
// 	var res=[];	
// 	var kc=0;
// 	for (var k=0; k<12; k++) 
// 	if (scale.mask[k]==1){
// 		kc++;
// 		if (k==mk) res.push({name:"No. "+kc, mask:getTriadFromScaleKey(scale, k, 1)});
// 		else res.push({name:"No. "+kc, mask:getTriadFromScaleKey(scale, k, 0)});
// 	}
// 	for (var i=0; i<kc; i++) res[i].mask=transpose(res[i].mask, key_id);
// 	return res;
// }
// //console.log(getSlimChordsByKeyScale(0, 70));

// K: key for the project; S: scale for the project; sK: key number in the scaled keyboard; cK: key number in the chromatic keyboard starting from the root / tonic key given K
function getScaleKeynumByKey(){
}

function getKeyByScaleKeynum(){
}

function test(s){
	Work.global.seqXY=[];
	Work.global.chord=[];
	var slim=getSlimChordsByKeyScale(0, s);
	for (var i=0; i<slim.length; i++){
		Work.global.chord.push(slim[i]);
		for (var k=0; k<12; k++) if (slim[i].mask[k]==1)
		pianoroll.addNote({
			x: 16*i,
			y: 27+k,
			d: 16,
			l: Work.global.layer_sel,
			v: 1,
			s: 1,
			t: 1
		});
	}
	pianoroll.historyPush("theory test");
	pianoroll.updateChords();
	Controls.init();	
	pianoroll.autoZoom();
	pianoroll.scroll("beginning");
}

// Exporting

// Will be replaced by keyScaleFit1
//Theory.keyScaleFit=keyScaleFit;

// get best-fit key and scale by analyzing the melody
// ([note])=>[{bestMatches: {key_id, key_name, scale_id, scale_name}, confidence}]
Theory.keyScaleFit1=keyScaleFit1;

// get all chords that fit in given key-scale pair
// (key_id, scale_id)=>[{key_id, key_name, chord_id, chord_name}]
Theory.getChordsByKeyScale=getChordsByKeyScale;

// get weighted key map for each measure
Theory.getWeightedMaps=getWeightedMaps;

// get weighted dominant key for each measure
Theory.getWeightedKeys=getWeightedKeys;

// get the simple chords (I, ii, iii, IV, V, iv, V7) by given Key (no matter what in scale)
//Theory.getSimpleChordsByKey=getSimpleChordsByKey;

// get the simple chords (I, ii, iii, IV, V, iv, V7) by given Key and Scale
Theory.getDiatonicChordsByKeyScale=getDiatonicChordsByKeyScale;

// calculate the voice leading score of 2 adjacent chords
Theory.voiceLeadingScore=voiceLeadingScore;

// automatically generate chords according to the melody (all notes on current layer)
// considering all chords that fit in any key/scale pairs
Theory.getChordsByMelody=getChordsByMelody;

// automatically generate chords according to the melody (all notes on current layer)
// considering chords that fit in given key/scale pair
Theory.getChordsByMelodyKeyScale=getChordsByMelodyKeyScale;

// automatically generate chords according to the melody (all notes on current layer)
// considering only the simple chords that fit in the given key
// the fitting logic: is the weighted key (by getWeightedKeys()) included in the chord?
//Theory.getChordsByMelodyKeySimple=getChordsByMelodyKeySimple;

// [{name, mask}], in Key C
Theory.scaleDict=scaleDict;

// [{symbol, mask}], in Key C
Theory.chordDict=chordDict; 

Theory.transpose=transpose;

Theory.getTriadFromScaleKey=getTriadFromScaleKey;

Theory.test=test;

Theory.getScaleIndexFromMaskIndex=getScaleIndexFromMaskIndex;

})();



