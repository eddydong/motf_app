// getting distinct scales


// the original dict 
const scaleDict=[{"id":0,"name":"major pentatonic","mask":"101010010100","len":5},{"id":1,"name":"ionian pentatonic","mask":"100011010001","len":5},{"id":2,"name":"mixolydian pentatonic","mask":"100011010010","len":5},{"id":3,"name":"ritusen","mask":"101001010100","len":5},{"id":4,"name":"egyptian","mask":"101001010010","len":5},{"id":5,"name":"neopolitan major pentatonic","mask":"100011100010","len":5},{"id":6,"name":"vietnamese 1","mask":"100101011000","len":5},{"id":7,"name":"pelog","mask":"110100011000","len":5},{"id":8,"name":"kumoijoshi","mask":"110001011000","len":5},{"id":9,"name":"hirajoshi","mask":"101100011000","len":5},{"id":10,"name":"iwato","mask":"110001100010","len":5},{"id":11,"name":"in-sen","mask":"110001010010","len":5},{"id":12,"name":"lydian pentatonic","mask":"100010110001","len":5},{"id":13,"name":"malkos raga","mask":"100101001010","len":5},{"id":14,"name":"locrian pentatonic","mask":"100101100010","len":5},{"id":15,"name":"minor pentatonic","mask":"100101010010","len":5},{"id":16,"name":"minor six pentatonic","mask":"100101010100","len":5},{"id":17,"name":"flat three pentatonic","mask":"101100010100","len":5},{"id":18,"name":"flat six pentatonic","mask":"101010011000","len":5},{"id":19,"name":"scriabin","mask":"110010010100","len":5},{"id":20,"name":"whole tone pentatonic","mask":"100010101010","len":5},{"id":21,"name":"lydian #5P pentatonic","mask":"100010101001","len":5},{"id":22,"name":"lydian dominant pentatonic","mask":"100010110010","len":5},{"id":23,"name":"minor #7M pentatonic","mask":"100101010001","len":5},{"id":24,"name":"super locrian pentatonic","mask":"100110100010","len":5},{"id":25,"name":"minor hexatonic","mask":"101101010001","len":6},{"id":26,"name":"augmented","mask":"100110011001","len":6},{"id":27,"name":"major blues","mask":"101110010100","len":6},{"id":28,"name":"piongio","mask":"101001010110","len":6},{"id":29,"name":"prometheus neopolitan","mask":"110010100110","len":6},{"id":30,"name":"prometheus","mask":"101010100110","len":6},{"id":31,"name":"mystery #1","mask":"110010101010","len":6},{"id":32,"name":"six tone symmetric","mask":"110011001100","len":6},{"id":33,"name":"whole tone","mask":"101010101010","len":6},{"id":34,"name":"messiaen's mode #5","mask":"110001110001","len":6},{"id":35,"name":"minor blues","mask":"100101110010","len":6},{"id":36,"name":"locrian major","mask":"101011101010","len":7},{"id":37,"name":"double harmonic lydian","mask":"110010111001","len":7},{"id":38,"name":"harmonic minor","mask":"101101011001","len":7},{"id":39,"name":"altered","mask":"110110101010","len":7},{"id":40,"name":"locrian #2","mask":"101101101010","len":7},{"id":41,"name":"mixolydian b6","mask":"101011011010","len":7},{"id":42,"name":"lydian dominant","mask":"101010110110","len":7},{"id":43,"name":"lydian","mask":"101010110101","len":7},{"id":44,"name":"lydian augmented","mask":"101010101101","len":7},{"id":45,"name":"dorian b2","mask":"110101010110","len":7},{"id":46,"name":"melodic minor","mask":"101101010101","len":7},{"id":47,"name":"locrian","mask":"110101101010","len":7},{"id":48,"name":"ultralocrian","mask":"110110101100","len":7},{"id":49,"name":"locrian 6","mask":"110101100110","len":7},{"id":50,"name":"augmented heptatonic","mask":"100111011001","len":7},{"id":51,"name":"dorian #4","mask":"101100110110","len":7},{"id":52,"name":"lydian diminished","mask":"101100110101","len":7},{"id":53,"name":"phrygian","mask":"110101011010","len":7},{"id":54,"name":"leading whole tone","mask":"101010101011","len":7},{"id":55,"name":"lydian minor","mask":"101010111010","len":7},{"id":56,"name":"phrygian dominant","mask":"110011011010","len":7},{"id":57,"name":"balinese","mask":"110101011001","len":7},{"id":58,"name":"neopolitan major","mask":"110101010101","len":7},{"id":59,"name":"aeolian (minor)","mask":"101101011010","len":7},{"id":60,"name":"harmonic major","mask":"101011011001","len":7},{"id":61,"name":"double harmonic major","mask":"110011011001","len":7},{"id":62,"name":"dorian","mask":"101101010110","len":7},{"id":63,"name":"hungarian minor","mask":"101100111001","len":7},{"id":64,"name":"hungarian major","mask":"100110110110","len":7},{"id":65,"name":"oriental","mask":"110011100110","len":7},{"id":66,"name":"flamenco","mask":"110110110010","len":7},{"id":67,"name":"todi raga","mask":"110100111001","len":7},{"id":68,"name":"mixolydian","mask":"101011010110","len":7},{"id":69,"name":"persian","mask":"110011101001","len":7},{"id":70,"name":"ionian (major)","mask":"101011010101","len":7},{"id":71,"name":"enigmatic","mask":"110010101011","len":7},{"id":72,"name":"major augmented","mask":"101011001101","len":7},{"id":73,"name":"lydian #9","mask":"100110110101","len":7},{"id":74,"name":"messiaen's mode #4","mask":"111001111001","len":8},{"id":75,"name":"purvi raga","mask":"110011111001","len":8},{"id":76,"name":"spanish heptatonic","mask":"110111011010","len":8},{"id":77,"name":"bebop","mask":"101011010111","len":8},{"id":78,"name":"bebop minor","mask":"101111010110","len":8},{"id":79,"name":"bebop major","mask":"101011011101","len":8},{"id":80,"name":"bebop locrian","mask":"110101111010","len":8},{"id":81,"name":"minor bebop","mask":"101101011011","len":8},{"id":82,"name":"diminished","mask":"101101101101","len":8},{"id":83,"name":"ichikosucho","mask":"101011110101","len":8},{"id":84,"name":"minor six diminished","mask":"101101011101","len":8},{"id":85,"name":"half-whole diminished","mask":"110110110110","len":8},{"id":86,"name":"kafi raga","mask":"100111010111","len":8},{"id":87,"name":"messiaen's mode #6","mask":"101011101011","len":8},{"id":88,"name":"composite blues","mask":"101111110110","len":9},{"id":89,"name":"messiaen's mode #3","mask":"101110111011","len":9},{"id":90,"name":"messiaen's mode #7","mask":"111101111101","len":10},{"id":91,"name":"eddy_1","mask":"101101011001","len":7},{"id":92,"name":"chromatic","mask":"111111111111","len":12}];


var dict = [];
for (var i=0; i<scaleDict.length; i++){
	dict.push([]);
	dict[i]=getModes(i);
}

var dup = [];
for (var i=0; i<scaleDict.length; i++)
for (var j=0; j<dict[i].length; j++){
	for (var m=0; m<scaleDict.length; m++)
	for (var n=0; n<dict[m].length; n++){
		if ((i!=m && j!=n) && dict[i][j]==dict[m][n]) {
			var isDup=false;
			for (var k=0; k<dup.length; k++)
				if (myLib.arrayEqual(dup[k],[i,m])) {
					isDup=true;
					break;
				}
			if (!isDup) dup.push([i,m]);
		}
	}
}

var s=[];
for (var i=0; i<scaleDict.length; i++){
	s.push([]);
	s[i].push(i);
	for (var j=0; j<dup.length; j++){
		if (dup[j][0]==i) s[i].push(dup[j][1]);
		if (dup[j][1]==i) s[i].push(dup[j][0]);
	}	
}

//console.log(s);

var ss=[];
for (var i=0; i<s.length; i++){
	ss.push([]);
	for (var j=0; j<s[i].length; j++)
		ss[i].push([s[i][j], scaleDict[s[i][j]].name]);
}

//console.log(ss);

var dict=[];
for (var i=0; i<scaleDict.length; i++){
	var isDup=false;
	for (var j=0; j<s[i].length; j++)
		for (var k=0; k<dict.length; k++)
			if (dict[k]==s[i][j]){
				isDup=true;
				break;
			}
	if (!isDup) dict.push(i);
}

var scaleDict1=[];
for (var i=0; i<dict.length; i++)
	scaleDict1.push([dict[i],scaleDict[dict[i]].name]);

//console.log(JSON.stringify(scaleDict1));


var dic=[[0,"major pentatonic"],[1,"ionian pentatonic"],[2,"mixolydian pentatonic"],[5,"neopolitan major pentatonic"],[6,"vietnamese 1"],[12,"kumoijoshi"],[14,"in-sen"],[16,"minor six pentatonic"],[18,"flat six pentatonic"],[19,"scriabin"],[20,"whole tone pentatonic"],[22,"lydian dominant pentatonic"],[23,"minor #7M pentatonic"],[24,"super locrian pentatonic"],[25,"minor hexatonic"],[26,"augmented"],[27,"major blues"],[28,"piongio"],[29,"prometheus neopolitan"],[30,"prometheus"],[31,"mystery #1"],[33,"whole tone"],[34,"messiaen's mode #5"],[36,"locrian major"],[37,"double harmonic lydian"],[38,"harmonic minor"],[39,"altered"],[43,"lydian"],[50,"augmented heptatonic"],[60,"lydian diminished"],[57,"balinese"],[61,"double harmonic major"],[64,"hungarian major"],[66,"flamenco"],[69,"todi raga"],[71,"enigmatic"],[74,"messiaen's mode #4"],[75,"purvi raga"],[76,"spanish heptatonic"],[77,"bebop"],[82,"diminished"],[84,"minor six diminished"],[86,"kafi raga"],[87,"messiaen's mode #6"],[88,"composite blues"],[89,"messiaen's mode #3"],[90,"messiaen's mode #7"],[72,"eddy_1"],[92,"chromatic"]];

var res=[];
for (var i=0; i<dic.length; i++)
	res.push(scaleDict[dic[i][0]]);
	
console.log(JSON.stringify(res));


function getModesByScaleID(sid){
	var scale = scaleDict[sid];
	var result = [];
	for (var i = 0; i < scale.len; i++){
		var counter = -1;
		var s = {...scale}; // deep copy
		for (var j = 0; j < 12; j++){
			if (s.mask[j] == 1) counter++;
			if (counter == i){
				result.push(s.mask.substring(j)+
					s.mask.substring(0,j));
				s.mask[j] = 2;
				break;
			}
		}
	}
	return result;
}

function getScale(sid){
	return {id: sid,
			name: scaleDict[sid].name, 
			len: getModesByScaleID(sid).length,
			modes: getModesByScaleID(sid)};
}

var s=[];
for (var i=0; i<scaleDict.length; i++)
	s.push(getScale(i));

console.log(JSON.stringify(s));

