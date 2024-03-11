var Motf = {};

(function(){

var theory = {
	// Properties

	chordDict: [{"id":0,"symbol":"5","mask":"100000010000","len":2},{"id":1,"symbol":"M7#5sus4","mask":"100001001001","len":4},{"id":2,"symbol":"7#5sus4","mask":"100001001010","len":4},{"id":3,"symbol":"sus4","mask":"100001010000","len":3},{"id":4,"symbol":"M7sus4","mask":"100001010001","len":4},{"id":5,"symbol":"7sus4","mask":"100001010010","len":4},{"id":6,"symbol":"7no5","mask":"100010000010","len":3},{"id":7,"symbol":"aug","mask":"100010001000","len":3},{"id":8,"symbol":"M7b6","mask":"100010001001","len":4},{"id":9,"symbol":"maj7#5","mask":"100010001001","len":4},{"id":10,"symbol":"7#5","mask":"100010001010","len":4},{"id":11,"symbol":"7b13","mask":"100010001010","len":4},{"id":12,"symbol":"M","mask":"100010010000","len":3},{"id":13,"symbol":"maj7","mask":"100010010001","len":4},{"id":14,"symbol":"7","mask":"100010010010","len":4},{"id":15,"symbol":"6","mask":"100010010100","len":4},{"id":16,"symbol":"7add6","mask":"100010010110","len":5},{"id":17,"symbol":"7b6","mask":"100010011010","len":5},{"id":18,"symbol":"Mb5","mask":"100010100000","len":3},{"id":19,"symbol":"M7b5","mask":"100010100001","len":4},{"id":20,"symbol":"7b5","mask":"100010100010","len":4},{"id":21,"symbol":"maj#4","mask":"100010110001","len":5},{"id":22,"symbol":"7#11","mask":"100010110010","len":5},{"id":23,"symbol":"M6#11","mask":"100010110100","len":5},{"id":24,"symbol":"7#11b13","mask":"100010111010","len":6},{"id":25,"symbol":"m#5","mask":"100100001000","len":3},{"id":26,"symbol":"mb6M7","mask":"100100001001","len":4},{"id":27,"symbol":"m7#5","mask":"100100001010","len":4},{"id":28,"symbol":"m","mask":"100100010000","len":3},{"id":29,"symbol":"m/ma7","mask":"100100010001","len":4},{"id":30,"symbol":"m7","mask":"100100010010","len":4},{"id":31,"symbol":"m6","mask":"100100010100","len":4},{"id":32,"symbol":"mMaj7b6","mask":"100100011001","len":5},{"id":33,"symbol":"dim","mask":"100100100000","len":3},{"id":34,"symbol":"oM7","mask":"100100100001","len":4},{"id":35,"symbol":"m7b5","mask":"100100100010","len":4},{"id":36,"symbol":"dim7","mask":"100100100100","len":4},{"id":37,"symbol":"o7M7","mask":"100100100101","len":5},{"id":38,"symbol":"4","mask":"100101000010","len":4},{"id":39,"symbol":"madd4","mask":"100101010000","len":4},{"id":40,"symbol":"m7add11","mask":"100101010010","len":5},{"id":41,"symbol":"+add#9","mask":"100110001000","len":4},{"id":42,"symbol":"7#5#9","mask":"100110001010","len":5},{"id":43,"symbol":"7#9","mask":"100110010010","len":5},{"id":44,"symbol":"13#9","mask":"100110010110","len":6},{"id":45,"symbol":"7#9b13","mask":"100110011010","len":6},{"id":46,"symbol":"maj7#9#11","mask":"100110110001","len":6},{"id":47,"symbol":"7#9#11","mask":"100110110010","len":6},{"id":48,"symbol":"13#9#11","mask":"100110110110","len":7},{"id":49,"symbol":"7#9#11b13","mask":"100110111010","len":7},{"id":50,"symbol":"sus2","mask":"101000010000","len":3},{"id":51,"symbol":"M9#5sus4","mask":"101001001001","len":5},{"id":52,"symbol":"sus24","mask":"101001010000","len":4},{"id":53,"symbol":"M9sus4","mask":"101001010001","len":5},{"id":54,"symbol":"11","mask":"101001010010","len":5},{"id":55,"symbol":"9sus4","mask":"101001010010","len":5},{"id":56,"symbol":"13sus4","mask":"101001010110","len":6},{"id":57,"symbol":"9no5","mask":"101010000010","len":4},{"id":58,"symbol":"13no5","mask":"101010000110","len":5},{"id":59,"symbol":"M#5add9","mask":"101010001000","len":4},{"id":60,"symbol":"maj9#5","mask":"101010001001","len":5},{"id":61,"symbol":"9#5","mask":"101010001010","len":5},{"id":62,"symbol":"9b13","mask":"101010001010","len":5},{"id":63,"symbol":"Madd9","mask":"101010010000","len":4},{"id":64,"symbol":"maj9","mask":"101010010001","len":5},{"id":65,"symbol":"9","mask":"101010010010","len":5},{"id":66,"symbol":"6/9","mask":"101010010100","len":5},{"id":67,"symbol":"maj13","mask":"101010010101","len":6},{"id":68,"symbol":"M7add13","mask":"101010010101","len":6},{"id":69,"symbol":"13","mask":"101010010110","len":6},{"id":70,"symbol":"M9b5","mask":"101010100001","len":5},{"id":71,"symbol":"9b5","mask":"101010100010","len":5},{"id":72,"symbol":"13b5","mask":"101010100110","len":6},{"id":73,"symbol":"9#5#11","mask":"101010101010","len":6},{"id":74,"symbol":"maj9#11","mask":"101010110001","len":6},{"id":75,"symbol":"9#11","mask":"101010110010","len":6},{"id":76,"symbol":"69#11","mask":"101010110100","len":6},{"id":77,"symbol":"M13#11","mask":"101010110101","len":7},{"id":78,"symbol":"13#11","mask":"101010110110","len":7},{"id":79,"symbol":"9#11b13","mask":"101010111010","len":7},{"id":80,"symbol":"m9#5","mask":"101100001010","len":5},{"id":81,"symbol":"madd9","mask":"101100010000","len":4},{"id":82,"symbol":"mM9","mask":"101100010001","len":5},{"id":83,"symbol":"m9","mask":"101100010010","len":5},{"id":84,"symbol":"m69","mask":"101100010100","len":5},{"id":85,"symbol":"m13","mask":"101100010110","len":6},{"id":86,"symbol":"mMaj9b6","mask":"101100011001","len":6},{"id":87,"symbol":"m9b5","mask":"101100100010","len":5},{"id":88,"symbol":"m11A","mask":"101101001010","len":6},{"id":89,"symbol":"m11","mask":"101101010010","len":6},{"id":90,"symbol":"b9sus","mask":"110001010010","len":5},{"id":91,"symbol":"11b9","mask":"110001010010","len":5},{"id":92,"symbol":"7sus4b9b13","mask":"110001011010","len":6},{"id":93,"symbol":"alt7","mask":"110010000010","len":4},{"id":94,"symbol":"7#5b9","mask":"110010001010","len":5},{"id":95,"symbol":"Maddb9","mask":"110010010000","len":4},{"id":96,"symbol":"M7b9","mask":"110010010001","len":5},{"id":97,"symbol":"7b9","mask":"110010010010","len":5},{"id":98,"symbol":"13b9","mask":"110010010110","len":6},{"id":99,"symbol":"7b9b13","mask":"110010011010","len":6},{"id":100,"symbol":"7#5b9#11","mask":"110010101010","len":6},{"id":101,"symbol":"7b9#11","mask":"110010110010","len":6},{"id":102,"symbol":"13b9#11","mask":"110010110110","len":7},{"id":103,"symbol":"7b9b13#11","mask":"110010111010","len":7},{"id":104,"symbol":"mb6b9","mask":"110100001000","len":4},{"id":105,"symbol":"7b9#9","mask":"110110010010","len":6}],
	scaleDict: [{"id":0,"name":"major pentatonic","len":5,"modes":["101010010100","101001010010","100101001010","101001010100","100101010010"]},{"id":1,"name":"ionian pentatonic","len":5,"modes":["100011010001","110100011000","101000110001","100011000110","110001101000"]},{"id":2,"name":"mixolydian pentatonic","len":5,"modes":["100011010010","110100101000","101001010001","100101000110","101000110100"]},{"id":3,"name":"neopolitan major pentatonic","len":5,"modes":["100011100010","111000101000","110001010001","100010100011","101000111000"]},{"id":4,"name":"vietnamese 1","len":5,"modes":["100101011000","101011000100","101100010010","110001001010","100010010101"]},{"id":5,"name":"lydian pentatonic","len":5,"modes":["100010110001","101100011000","110001100010","100011000101","110001011000"]},{"id":6,"name":"locrian pentatonic","len":5,"modes":["100101100010","101100010100","110001010010","100010100101","101001011000"]},{"id":7,"name":"minor six pentatonic","len":5,"modes":["100101010100","101010100100","101010010010","101001001010","100100101010"]},{"id":8,"name":"flat six pentatonic","len":5,"modes":["101010011000","101001100010","100110001010","110001010100","100010101001"]},{"id":9,"name":"scriabin","len":5,"modes":["110010010100","100100101001","100101001100","101001100100","100110010010"]},{"id":10,"name":"whole tone pentatonic","len":5,"modes":["100010101010","101010101000","101010100010","101010001010","101000101010"]},{"id":11,"name":"lydian dominant pentatonic","len":5,"modes":["100010110010","101100101000","110010100010","100101000101","101000101100"]},{"id":12,"name":"minor #7M pentatonic","len":5,"modes":["100101010001","101010001100","101000110010","100011001010","110010101000"]},{"id":13,"name":"super locrian pentatonic","len":5,"modes":["100110100010","110100010100","101000101001","100010100110","101001101000"]},{"id":14,"name":"minor hexatonic","len":6,"modes":["101101010001","110101000110","101010001101","101000110110","100011011010","110110101000"]},{"id":15,"name":"augmented","len":6,"modes":["100110011001","110011001100","100110011001","110011001100","100110011001","110011001100"]},{"id":16,"name":"major blues","len":6,"modes":["101110010100","111001010010","110010100101","100101001011","101001011100","100101110010"]},{"id":17,"name":"piongio","len":6,"modes":["101001010110","100101011010","101011010100","101101010010","110101001010","101010010101"]},{"id":18,"name":"prometheus neopolitan","len":6,"modes":["110010100110","100101001101","101001101100","100110110010","110110010100","101100101001"]},{"id":19,"name":"prometheus","len":6,"modes":["101010100110","101010011010","101001101010","100110101010","110101010100","101010101001"]},{"id":20,"name":"mystery #1","len":6,"modes":["110010101010","100101010101","101010101100","101010110010","101011001010","101100101010"]},{"id":21,"name":"whole tone","len":6,"modes":["101010101010","101010101010","101010101010","101010101010","101010101010","101010101010"]},{"id":22,"name":"messiaen's mode #5","len":6,"modes":["110001110001","100011100011","111000111000","110001110001","100011100011","111000111000"]},{"id":23,"name":"ionian (major)","len":7,"modes":["101011010101","101101010110","110101011010","101010110101","101011010110","101101011010","110101101010"]},{"id":24,"name":"major augmented","len":7,"modes":["101011001101","101100110110","110011011010","100110110101","110110101100","101101011001","110101100110"]},{"id":25,"name":"locrian major","len":7,"modes":["101011101010","101110101010","111010101010","110101010101","101010101011","101010101110","101010111010"]},{"id":26,"name":"double harmonic lydian","len":7,"modes":["110010111001","100101110011","101110011100","111001110010","110011100101","100111001011","111001011100"]},{"id":27,"name":"harmonic minor","len":7,"modes":["101101011001","110101100110","101011001101","101100110110","110011011010","100110110101","110110101100"]},{"id":28,"name":"altered","len":7,"modes":["110110101010","101101010101","110101010110","101010101101","101010110110","101011011010","101101101010"]},{"id":29,"name":"augmented heptatonic","len":7,"modes":["100111011001","111011001100","110110011001","101100110011","110011001110","100110011101","110011101100"]},{"id":30,"name":"harmonic major","len":7,"modes":["101011011001","101101100110","110110011010","101100110101","110011010110","100110101101","110101101100"]},{"id":31,"name":"balinese","len":7,"modes":["110101011001","101010110011","101011001110","101100111010","110011101010","100111010101","111010101100"]},{"id":32,"name":"double harmonic major","len":7,"modes":["110011011001","100110110011","110110011100","101100111001","110011100110","100111001101","111001101100"]},{"id":33,"name":"hungarian major","len":7,"modes":["100110110110","110110110100","101101101001","110110100110","101101001101","110100110110","101001101101"]},{"id":34,"name":"flamenco","len":7,"modes":["110110110010","101101100101","110110010110","101100101101","110010110110","100101101101","101101101100"]},{"id":35,"name":"persian","len":7,"modes":["110011101001","100111010011","111010011100","110100111001","101001110011","100111001110","111001110100"]},{"id":36,"name":"enigmatic","len":7,"modes":["110010101011","100101010111","101010111100","101011110010","101111001010","111100101010","111001010101"]},{"id":37,"name":"messiaen's mode #4","len":8,"modes":["111001111001","110011110011","100111100111","111100111100","111001111001","110011110011","100111100111","111100111100"]},{"id":38,"name":"purvi raga","len":8,"modes":["110011111001","100111110011","111110011100","111100111001","111001110011","110011100111","100111001111","111001111100"]},{"id":39,"name":"spanish heptatonic","len":8,"modes":["110111011010","101110110101","111011010110","110110101101","101101011011","110101101110","101011011101","101101110110"]},{"id":40,"name":"bebop","len":8,"modes":["101011010111","101101011110","110101111010","101011110101","101111010110","111101011010","111010110101","110101101011"]},{"id":41,"name":"diminished","len":8,"modes":["101101101101","110110110110","101101101101","110110110110","101101101101","110110110110","101101101101","110110110110"]},{"id":42,"name":"minor six diminished","len":8,"modes":["101101011101","110101110110","101011101101","101110110110","111011011010","110110110101","101101101011","110110101110"]},{"id":43,"name":"kafi raga","len":8,"modes":["100111010111","111010111100","110101111001","101011110011","101111001110","111100111010","111001110101","110011101011"]},{"id":44,"name":"messiaen's mode #6","len":8,"modes":["101011101011","101110101110","111010111010","110101110101","101011101011","101110101110","111010111010","110101110101"]},{"id":45,"name":"composite blues","len":9,"modes":["101111110110","111111011010","111110110101","111101101011","111011010111","110110101111","101101011111","110101111110","101011111101"]},{"id":46,"name":"messiaen's mode #3","len":9,"modes":["101110111011","111011101110","110111011101","101110111011","111011101110","110111011101","101110111011","111011101110","110111011101"]},{"id":47,"name":"messiaen's mode #7","len":10,"modes":["111101111101","111011111011","110111110111","101111101111","111110111110","111101111101","111011111011","110111110111","101111101111","111110111110"]}],
	scaleDictOld: [{"id":0,"name":"major pentatonic","mask":"101010010100","len":5},{"id":1,"name":"ionian pentatonic","mask":"100011010001","len":5},{"id":2,"name":"mixolydian pentatonic","mask":"100011010010","len":5},{"id":3,"name":"ritusen","mask":"101001010100","len":5},{"id":4,"name":"egyptian","mask":"101001010010","len":5},{"id":5,"name":"neopolitan major pentatonic","mask":"100011100010","len":5},{"id":6,"name":"vietnamese 1","mask":"100101011000","len":5},{"id":7,"name":"pelog","mask":"110100011000","len":5},{"id":8,"name":"kumoijoshi","mask":"110001011000","len":5},{"id":9,"name":"hirajoshi","mask":"101100011000","len":5},{"id":10,"name":"iwato","mask":"110001100010","len":5},{"id":11,"name":"in-sen","mask":"110001010010","len":5},{"id":12,"name":"lydian pentatonic","mask":"100010110001","len":5},{"id":13,"name":"malkos raga","mask":"100101001010","len":5},{"id":14,"name":"locrian pentatonic","mask":"100101100010","len":5},{"id":15,"name":"minor pentatonic","mask":"100101010010","len":5},{"id":16,"name":"minor six pentatonic","mask":"100101010100","len":5},{"id":17,"name":"flat three pentatonic","mask":"101100010100","len":5},{"id":18,"name":"flat six pentatonic","mask":"101010011000","len":5},{"id":19,"name":"scriabin","mask":"110010010100","len":5},{"id":20,"name":"whole tone pentatonic","mask":"100010101010","len":5},{"id":21,"name":"lydian #5P pentatonic","mask":"100010101001","len":5},{"id":22,"name":"lydian dominant pentatonic","mask":"100010110010","len":5},{"id":23,"name":"minor #7M pentatonic","mask":"100101010001","len":5},{"id":24,"name":"super locrian pentatonic","mask":"100110100010","len":5},{"id":25,"name":"minor hexatonic","mask":"101101010001","len":6},{"id":26,"name":"augmented","mask":"100110011001","len":6},{"id":27,"name":"major blues","mask":"101110010100","len":6},{"id":28,"name":"piongio","mask":"101001010110","len":6},{"id":29,"name":"prometheus neopolitan","mask":"110010100110","len":6},{"id":30,"name":"prometheus","mask":"101010100110","len":6},{"id":31,"name":"mystery #1","mask":"110010101010","len":6},{"id":32,"name":"six tone symmetric","mask":"110011001100","len":6},{"id":33,"name":"whole tone","mask":"101010101010","len":6},{"id":34,"name":"messiaen's mode #5","mask":"110001110001","len":6},{"id":35,"name":"minor blues","mask":"100101110010","len":6},{"id":36,"name":"locrian major","mask":"101011101010","len":7},{"id":37,"name":"double harmonic lydian","mask":"110010111001","len":7},{"id":38,"name":"harmonic minor","mask":"101101011001","len":7},{"id":39,"name":"altered","mask":"110110101010","len":7},{"id":40,"name":"locrian #2","mask":"101101101010","len":7},{"id":41,"name":"mixolydian b6","mask":"101011011010","len":7},{"id":42,"name":"lydian dominant","mask":"101010110110","len":7},{"id":43,"name":"lydian","mask":"101010110101","len":7},{"id":44,"name":"lydian augmented","mask":"101010101101","len":7},{"id":45,"name":"dorian b2","mask":"110101010110","len":7},{"id":46,"name":"melodic minor","mask":"101101010101","len":7},{"id":47,"name":"locrian","mask":"110101101010","len":7},{"id":48,"name":"ultralocrian","mask":"110110101100","len":7},{"id":49,"name":"locrian 6","mask":"110101100110","len":7},{"id":50,"name":"augmented heptatonic","mask":"100111011001","len":7},{"id":51,"name":"dorian #4","mask":"101100110110","len":7},{"id":52,"name":"lydian diminished","mask":"101100110101","len":7},{"id":53,"name":"phrygian","mask":"110101011010","len":7},{"id":54,"name":"leading whole tone","mask":"101010101011","len":7},{"id":55,"name":"lydian minor","mask":"101010111010","len":7},{"id":56,"name":"phrygian dominant","mask":"110011011010","len":7},{"id":57,"name":"balinese","mask":"110101011001","len":7},{"id":58,"name":"neopolitan major","mask":"110101010101","len":7},{"id":59,"name":"aeolian (minor)","mask":"101101011010","len":7},{"id":60,"name":"harmonic major","mask":"101011011001","len":7},{"id":61,"name":"double harmonic major","mask":"110011011001","len":7},{"id":62,"name":"dorian","mask":"101101010110","len":7},{"id":63,"name":"hungarian minor","mask":"101100111001","len":7},{"id":64,"name":"hungarian major","mask":"100110110110","len":7},{"id":65,"name":"oriental","mask":"110011100110","len":7},{"id":66,"name":"flamenco","mask":"110110110010","len":7},{"id":67,"name":"todi raga","mask":"110100111001","len":7},{"id":68,"name":"mixolydian","mask":"101011010110","len":7},{"id":69,"name":"persian","mask":"110011101001","len":7},{"id":70,"name":"ionian (major)","mask":"101011010101","len":7},{"id":71,"name":"enigmatic","mask":"110010101011","len":7},{"id":72,"name":"major augmented","mask":"101011001101","len":7},{"id":73,"name":"lydian #9","mask":"100110110101","len":7},{"id":74,"name":"messiaen's mode #4","mask":"111001111001","len":8},{"id":75,"name":"purvi raga","mask":"110011111001","len":8},{"id":76,"name":"spanish heptatonic","mask":"110111011010","len":8},{"id":77,"name":"bebop","mask":"101011010111","len":8},{"id":78,"name":"bebop minor","mask":"101111010110","len":8},{"id":79,"name":"bebop major","mask":"101011011101","len":8},{"id":80,"name":"bebop locrian","mask":"110101111010","len":8},{"id":81,"name":"minor bebop","mask":"101101011011","len":8},{"id":82,"name":"diminished","mask":"101101101101","len":8},{"id":83,"name":"ichikosucho","mask":"101011110101","len":8},{"id":84,"name":"minor six diminished","mask":"101101011101","len":8},{"id":85,"name":"half-whole diminished","mask":"110110110110","len":8},{"id":86,"name":"kafi raga","mask":"100111010111","len":8},{"id":87,"name":"messiaen's mode #6","mask":"101011101011","len":8},{"id":88,"name":"composite blues","mask":"101111110110","len":9},{"id":89,"name":"messiaen's mode #3","mask":"101110111011","len":9},{"id":90,"name":"messiaen's mode #7","mask":"111101111101","len":10},{"id":91,"name":"eddy_1","mask":"101101011001","len":7},{"id":92,"name":"chromatic","mask":"111111111111","len":12}],
	keyNames: ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"],

	// Private Methods

	transpose(mask, offset){
		var res="";
		for (var i=0; i<12; i++) res+= mask[(i+12-offset) % 12];
		return res;
	},

	// find the closest key in scale to the given key(i)
	findClosest(mask, i){
		var min=Infinity, minI; 
		for (var k=0; k<24; k++)
			if (mask[k % 12]==1)
				if (min>Math.abs(k-i) && Math.abs(k-i)<2
					&& k<=i // only left search allowed
					){
					min=Math.abs(k-i);
					minI=k % 12;
				}
		return minI;
	},

	getTriadByKeyScaleMode(key, scale, mode_id, add5){
		var res=Array(12).fill(0);
		var harmony;
		harmony=[(0+key)%12,(4+key)%12,(7+key)%12];
		if (add5 && scale.modes[mode_id][7]==1) harmony.push(7);
		for (var h=0; h<harmony.length; h++) 
	//		if (h!=2 || scale.mask[harmony[h]]==1)	// for the dominant note we don't compromise!
				res[theory.findClosest(scale.modes[mode_id], harmony[h])]=1; 
				
		var resS="";
		for (var i=0; i<12; i++) resS+=res[i];
		return resS;
	},

	// Public Methods / Classes

	getDiatonicChordsByKeyScaleMode(key, scale_id, mode_id){
		var scale = theory.scaleDict[scale_id];
		var mk;
		for (var k=0; k<12; k++) 
		if (scale.modes[mode_id][k]==1) mk=k;
		var res=[];	
		var kc=0;
		for (var k=0; k<12; k++) 
		if (scale.modes[mode_id][k]==1){
			kc++;
			// if the last diatonic chord, add the dominent key (e.g.: for the 7th diatonic chord for C Major, Bo, we add in the key G, and Bo+G => G7)
			res.push({name:"No. "+kc, mask: theory.getTriadByKeyScaleMode(k, scale, mode_id, k==mk),});
		}
		for (var i=0; i<kc; i++) res[i].mask = theory.transpose(res[i].mask, key);
		return res;
	},

	// n: current note; o: offset in chord scale; c: chord (a set of notes)
	getChordNote(n,o,c) {
		var nn=(n + 9) % 12;
		if (c.mask[nn]==0) {
			throw "note "+n+" is not in chord ["+c.name+"] "+c.mask;
			return null;
		};
		
		var oc=0;
		if (o>0) {
			for (var i=n+1; i<88; i++) {
				if (c.mask[(i % 12 + 9) % 12]==1) oc++;
				if (oc==o) return i;
			};
		} else if (o<0) {
			for (var i=n-1; i>=0; i--) {
				if (c.mask[(i % 12 + 9) % 12]==1) oc--;
				if (oc==o) return i;
			};
		} else return n;
	},

	// get note# in current scale by given chromatic key c
	// for instance given c=41, if current scale is 70-major, then output 2 (41/D is the 2nd note in a major scale)
	scaleNByChroma(c){
		var mask=Theory.scaleDict[Work.global.scale_id].mask;
		var k= (c+9) % 12;
		var cc=0; 
		for (var i=0; i<12; i++) {
			if (mask[i]==1) cc++;
			if (i==k) break;
		}; 
		return cc;
	}
}

class Context {
	constructor(key = 0, scaleId = 23, mode = 0, bpMeas = 4, bpNote = 4, bpm = 120) {
		if (key < 0 || key > 12) throw "Context: key out of range.";
		if (scaleId < 0 || scaleId > theory.scaleDict.length - 1) throw "Context: scaleId out of range.";
		if (mode < 0 || mode > theory.scaleDict[scaleId].len - 1) throw "Context: mode out of range.";
		this.key = key;
		this.scaleId = scaleId;
		this.modeLen = theory.scaleDict[scaleId].len;
		this.mode = mode;
		this.bpMeas = bpMeas;
		this.bpNote = bpNote;
		this.bpm = bpm;
		this.root = 60 + key;
		this.update();
	}
	update(){
		this.scale= this.scaleUpdate();		
		this.diatonic_mask = this.generate_diatonic_mask();
		this.chords = theory.getDiatonicChordsByKeyScaleMode(this.key, this.scaleId, this.mode);
	}
	scaleUpdate(){
		var scale=[];
		var mask=Motf.theory.transpose(Motf.theory.scaleDict[this.scaleId].modes[this.mode], this.key);
		for (var i=0; i<88; i++)
			if (mask[(i+9) % 12]==1) scale.push(i);
		return scale;
	}
	generate_diatonic_mask(){
		var scale = [];
		var mask = theory.transpose(theory.scaleDict[this.scaleId].modes[this.mode], this.key);
		for (var i=0; i<88; i++)
			if (mask[(i+9) % 12]==1) scale.push(1); else scale.push(0);
		return scale;
	}
	// n: MIDI pitch number, e.g. 60 = C4
	inScale(n) {
		if (n < 21 || n > 108) throw "inScale: note out of range.";
		return theory.transpose(theory.scaleDict[this.scaleId].modes[this.mode], this.key)[n % 12] == 1;
	}
	// n: current note; m: steps to move up(+) or down(-)
	getNoteByScaleMove(n, m) {
		if (!this.inScale(n)) throw "moveByScale: note"+n+" not in scale s"+this.scaleId+" m"+this.mode+" k"+this.key;
		var off = 0, pos = n;
		while (off != m) {
			pos = pos + (m > 0 ? 1 : -1);
			while (!this.inScale(pos)) {
				pos = pos + (m > 0 ? 1 : -1);
			}
			off = off + (m > 0 ? 1 : -1);
		};
		return pos;
	}
}

class AutoDrumer {
	constructor(proll, layer){
		this.proll = proll,
		this.layer = layer
	}
	fill(){
		for (var i=0; i< this.proll.endTick; i++) {
			if (i % 4 == 0)
			pianoroll.addNote({
					x: i,
					y: 36 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0 // type: 0: normal note; 1: just improvised			
			});
			if (i % 64 == 0)
			pianoroll.addNote({
					x: i,
					y: 43 - 21,
					d: 8, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0 // type: 0: normal note; 1: just improvised			
			});	
			if (i % 32 == 22)
			pianoroll.addNote({
					x: i,
					y: 37 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0 // type: 0: normal note; 1: just improvised			
			});
			if (i % 16 == 8)
			pianoroll.addNote({
					x: i,
					y: 38 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0 // type: 0: normal note; 1: just improvised			
			});
		}
	}	
}

class Imp1 {
	rhythm4 = [[1,1,1,1],[2,1,1],[1,2,1],[1,1,2],[3,1],[1,3],[2,2],[4]];
    suggester = {values: [0,  -1,  1,   -2,   2,  -3,   3,  -4,   4,  -5,  5], 
                chances: [1,   1,  1,  0.2, 0.1, 0.1, 0.3,   0,   0,   0,  0]}
	constructor(ctx, parent, home, rhythm){
		this.ctx = ctx;  
		this.rhythm = rhythm;
		this.parent = parent;
		this.home = home;
		this.steps = this.rhythm4[rhythm].length;
		this.draft = [{note: this.parent.note, len: this.rhythm4[this.rhythm][0] / 4 * this.parent.len}];
		this.variant = [];
		this.search(1);
		this.pick = null;
		if (this.variant.length>0) this.repick(); // get a random pick
	}
	// populat the variant(s) list
	search(n){
		if (n == this.steps) {
			var last = this.draft[this.draft.length-1].note;
			if (last == this.ctx.getNoteByScaleMove(this.home,1) ||
				last == this.ctx.getNoteByScaleMove(this.home,0) ||
				last == this.ctx.getNoteByScaleMove(this.home,-1)||
				last == this.ctx.getNoteByScaleMove(this.home,-3)) {
				this.variant.push(myLib.deepCopy(this.draft));
			}
		} else for (var i=0; i<this.suggester.values.length; i++) if (Math.random()<this.suggester.chances[i]) {
			var targetY = this.ctx.getNoteByScaleMove(this.draft[n-1].note, this.suggester.values[i]);
			if (targetY > this.ctx.root + 18) { while (targetY > this.ctx.root + 18) targetY -= 12;};
			if (targetY < this.ctx.root - 18) { while (targetY < this.ctx.root - 18) targetY += 12;};
			this.draft.push({note: targetY, len: this.rhythm4[this.rhythm][n] / 4 * this.parent.len});
			this.search(n+1);
			this.draft.pop();
		};
	}
	// get a new pick from the varian(s)
	repick(){
		this.pick = this.variant[Math.floor(Math.random()*this.variant.length)];
	}
	// mutate a pick by random note pitch modifications 
	mutate(){
		for (var i=1; i<this.pick.length; i++){
			this.pick[i].note = ctx.getNoteByScaleMove(this.pick[i].note, 
				Math.floor(Math.random()*3)-1);
		}    
	}
	// transpose the pick to a new home
	transTo(newHome){
		var dist = newHome - this.pick[0].note;
		this.pick[0].note = newHome;
		for (var i=1; i<this.pick.length; i++){
			this.pick[i].note += dist;
			while (!ctx.inScale(this.pick[i].note))
				this.pick[i].note--;
		}
	}
}

Motf.theory = theory;
Motf.Context = Context;
Motf.AutoDrumer = AutoDrumer;
Motf.Imp1 = Imp1;

//console.log(transpose(scaleDict[23].modes[0], 2)[n % 12] == 1);

})()
