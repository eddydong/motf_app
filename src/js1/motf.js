var motf = {};

(function(){

var color = {
	palette: {
		red: [255,140,130],
		green: [160,255,170],
		blue: [140,150,255],
		indigo: [150,255,255],
		purple: [255,160,255],
		yellow: [255,255,150],
		white: [255,255,255],
		grey: [100,100,100],
		black: [0,0,0],
	},
	get(name, opacity){
		return "rgba("+this.palette[name][0]+","+this.palette[name][1]+","+this.palette[name][2]+","+opacity+")";		
	}
}

var improviser = {
	piano:{
		rhythm:[[2,1,1,2,1,1],[2,1,2,1,2],[3,2,1,1,1],[2,2,2,2],[3,2,1,2],[3,2,2,1],[2,1,2,3],
					[2,3,1,2],[2,1,3,2],[4,2,1,1],[4,4/3,4/3,4/3],[6,1,1],[4,2,2]],
		rhythm_alter:[[1,1,1,1,1,1,1,1],[2,1,1,2,1,1],[2,1,2,1,2],[3,2,1,1,1],
					[2,2,2,2],[3,2,1,2],[3,2,2,1],[2,1,2,3],[2,3,1,2],[2,1,3,2],
					[4,2,1,1],[4,4/3,4/3,4/3],[6,1,1],[4,2,2]],
		pitchStep: {values: [   0,   1,    -1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [   0,    1,    1,     0,    0,    0,    0,    0,    0]},
		pitchRange:[-18, 18],
		leadingToNext: true
	},
	bassline:{
		rhythm: [[2,2,2,2]],
		rhythm_alter:[[2,2,2,2]],
		pitchStep: {values: [   0,   -1,    1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [ 0.4,    1,    1,     0,    0,  0.3,  0.7,  0.7,  0.3]},
		pitchRange:[-12, 12],
		leadingToNext: true
	},
	bassBasic:{
		rhythm: [[3,1,3,1]],
		rhythm_alter:[[2,1,1,2,1,1]],
		pitchStep: {values: [   0,   -1,    1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [   1,    1,    1,   0.5,  0.5,  0.7,  0.3,  0.7,  0.3]},
		pitchRange:[-7, 7],
		leadingToNext: true
	},
	bassWalking:{
		rhythm: [[2,1,1,2,1,1,],[2,1,2,1,2],[3,2,1,1,1]],
		rhythm_alter:[[3,2,1,2],[5,1,1,1]],
		pitchStep: {values: [   0,   -1,    1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [ 0.6,  0.9,  0.9,   0.4,  0.4,  0.7,  0.3,  0.7,  0.3]},
		pitchRange:[-12, 12],
		leadingToNext: true
	},
	jazz:{
		rhythm:[[2,1,1,2,1,1],[2,1,2,1,2],[3,2,1,1,1],[2,2,2,2],[3,2,1,2],[3,2,2,1],[2,1,2,3],
					[2,3,1,2],[2,1,3,2],[4,2,1,1],[4,4/3,4/3,4/3],[6,1,1],[4,2,2]],
		rhythm_alter:[[1,1,1,1,1,1,1,1],[2,1,1,2,1,1],[2,1,2,1,2],[3,2,1,1,1],
					[2,2,2,2],[3,2,1,2],[3,2,2,1],[2,1,2,3],[2,3,1,2],[2,1,3,2],
					[4,2,1,1],[4,4/3,4/3,4/3],[6,1,1],[4,2,2]],
		pitchStep: {values: [   0,   -1,    1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [ 0.3,  0.7,  0.7,   0.5,  0.5,  0.3,  0.5,  0.5,  0.3]},
		pitchRange:[-18, 18],
		leadingToNext: true
	},
	counter_melody:{
		rhythm:[[8]],//[7,1],[6,2],[5,3],[4,4],[8]],
		rhythm_alter:[[1,1,1,1,1,1,1,1],[2,1,1,2,1,1],[2,1,2,1,2],[3,2,1,1,1]],
		pitchStep: {values: [   0,   -1,    1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [ 0.3,  0.9,  0.9,   0.3,  0.3,  0.6,  0.2,  0.6,  0.2]},
		pitchRange:[-18, 18],
		leadingToNext: true
	},
	vocal:{
		rhythm:[[2,2,2,2],[3,2,1,2],[3,2,2,1],[2,1,2,3],[2,3,1,2],[2,1,3,2],[4,2,1,1],[4,4/3,4/3,4/3],
				[2,2,4],[3,1,4],[1,1,6],[2,6],[1,1,1,5],[2,1,1,4],
				[-2,2,-2,2],[3,2,-1,2],[3,-2,2,-1],[2,-1,2,3],[2,3,-1,2],[2,-1,3,-2],[4,2,-1,1],[4,-4/3,4/3,4/3],
				[2,2,4],[3,1,4],[1,1,6],[2,6],[1,1,1,5],[2,1,1,4]],
		rhythm_alter:[[6,1,1],[6, 2],[4,4],[8]],
		pitchStep: {values: [   0,   -1,    1,    -2,    2,   -3,    3,   -4,    4], 
				   chances: [ 0.5,  0.9,  0.9,   0.4,  0.4,  0.6,  0.6,  0.3,  0.3]},
		pitchRange:[-7, 12],
		leadingToNext: false
	}
}

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
	},

	// notes: in format of Work.global.seqXY
	keyScaleFit1(notes) {
		var maxScore=-Infinity, maxRes=[];
		var totalDuration=0;
		for (var i=0; i<notes.length; i++) totalDuration+=notes[i].d;
		for (var k=0; k<12; k++) {
			for (var s=0; s<motf.theory.scaleDict.length-1; s++) 
			for (var m=0; m<motf.theory.scaleDict[s].len-1; m++)
			{	
				var mask = this.transpose(motf.theory.scaleDict[s].modes[m], k);
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
				var score= inScaleDuration / totalDuration - outScaleCount / 12;
				if (score > maxScore) maxScore = score;
			}
		};
		for (var k=0; k<12; k++) {
			for (var s=0; s<motf.theory.scaleDict.length-1; s++) 
			for (var m=0; m<motf.theory.scaleDict[s].len-1; m++)
			{	
				var mask = this.transpose(motf.theory.scaleDict[s].modes[m], k);
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
				var score= inScaleDuration / totalDuration - outScaleCount / 12;
				if (score == maxScore) {
					maxRes.push({key:k, keyName: motf.theory.keyNames[k],
						scale_id: s, scaleName: motf.theory.scaleDict[s].name, 
						mode: m, scaleLen: motf.theory.scaleDict[s].len});
				}
			}
		};
		return {
			confidence: maxScore,
			bestMatches: maxRes
		};
	}
	// console.log(keyScaleFit([{y: 27, d: 1},{y: 30, d: 1},{y: 32, d: 1},{y: 33, d: 1},{y: 34, d: 1}
	// ,{y: 37, d: 1}]));
	//console.log(keyScaleFit([{y: 27, d: 1},{y: 31, d: 1},{y: 34, d: 1}]));

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
		var mask=theory.transpose(theory.scaleDict[this.scaleId].modes[this.mode], this.key);
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
		if (n < 21 || n > 108) {
			console.log("inScale: note "+n+" out of range.");
			return false;
		}
		return theory.transpose(theory.scaleDict[this.scaleId].modes[this.mode], this.key)[n % 12] == 1;
	}
	// n: current note; m: steps to move up(+) or down(-)
	getNoteByScaleMove(n, m) {
		if (!this.inScale(n)) throw "getNoteByScaleMove: note "+n+" not in scale s"+this.scaleId+" m"+this.mode+" k"+this.key;
		var off = 0, pos = n;
		while (off != m) {
			pos = pos + (m > 0 ? 1 : -1);
			if (pos<21 || pos>108) return n;
			while (!this.inScale(pos)) {
				pos = pos + (m > 0 ? 1 : -1);
				if (pos<21 || pos>108) return n;
			}
			off = off + (m > 0 ? 1 : -1);
		};
		return pos;
	}
}

class Drumer {
	constructor(proll, layer){
		this.proll = proll,
		this.layer = layer,
		this.model = {}
	}
	fill(){
		for (var i=16; i< this.proll.endTick; i++) {
			if (i % 2 == 0)
			this.proll.addNote({
					x: i,
					y: 36 - 21,
					d: 1, 
					s: 0, 
					v: i % 4 == 0 ? 1 : 0.5, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised			
					p: 0.95
			});
			if (i % 64 == 16)
			this.proll.addNote({
					x: i,
					y: 43 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised			
					p: 1
			});	
			if (i % 32 == 10)
			this.proll.addNote({
					x: i,
					y: 37 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised			
					p: 1
			});
			if (i % 32 == 11)
			this.proll.addNote({
					x: i,
					y: 38 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised			
					p: 1
			});
			if (i % 16 == 0)
			this.proll.addNote({
					x: i,
					y: 40 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised			
					p: 1
			});
			if (i % 128 == 12)
			this.proll.addNote({
					x: i,
					y: 41 - 21,
					d: 1, 
					s: 0, 
					v: 2, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised		
					p: 1	
			});
			if (i % 128 == 14)
			this.proll.addNote({
					x: i,
					y: 40 - 21,
					d: 1, 
					s: 0, 
					v: 2, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised			
					p: 1
			});
			if (i % 8 == 4)
			this.proll.addNote({
					x: i,
					y: 38 - 21,
					d: 1, 
					s: 0, 
					v: 1, 
					l: this.layer,
					t: 0, // type: 0: normal note; 1: just improvised	
					p: 1	
			});
		}
	}
	put(cycle, offset, instru){
		for (var i=16; i< 144; i++) {
			if (i % cycle == offset)
			this.proll.addNote({
					x: i,
					y: instru - 21,
					d: 1, 
					s: 0, 
					v: 1, //i % 4 == 0 ? 1 : 0.5, 
					l: this.layer,
					t: 1, // type: 0: normal note; 1: just improvised			
					p: 1
			});
		}
	}
	improvise(){
		Work.global.seqXY=[];
		pianoroll.stop();

		var prob = [0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8];
		for (var i=0; i<8; i++) if (Math.random()<prob[i]) 
		{
			var repeat = 2; //Math.floor(Math.random()*3)+1;
			for (var j=0; j<repeat; j++) {
				var cycle = Math.pow(2, i * Math.floor(Math.random()*4+1));
				var offset = Math.floor(Math.random() * cycle / 2);
				this.put(cycle, offset, i+36);
			} 
		};
		pianoroll.play();
	}
}

class Chorder {
	constructor(proll, from_layer, to_layer, guitarSwipe){
		this.proll = proll,
		this.from = from_layer,
		this.to = to_layer,
		this.pattern = [ // 0: note in chord; 1: duration (in 16th note)
			[[0,4],[1,2],[2,2],[3,4],[2,4]]
		],
		this.fill(guitarSwipe)
	}

	// get the I, ii, iii, IV, V... triad chords by given key_id & scale_id
 	getDiatonicChordsByKeyScale(key_id, scale_id, mode){
		var scale = motf.theory.scaleDict[scale_id];
		var mk;
		for (var k=0; k<12; k++) 
		if (scale.modes[mode][k]==1) mk=k;
		var res=[];	
		var kc=0;
		for (var k=0; k<12; k++) 
		if (scale.modes[mode][k]==1){
			kc++;
			if (k==mk) // if the last diatonic chord, add the dominent key (e.g.: for the 7th diatonic chord for C Major, Bo, we add in the key G, and Bo+G => G7)
			res.push({name:"No. "+kc, mask:this.getTriadFromScaleKey(scale, k, 1),});
			else res.push({name:"No. "+kc, mask:this.getTriadFromScaleKey(scale, k, 0)});
		}
		for (var i=0; i<kc; i++) res[i].mask=theory.transpose(res[i].mask, key_id);
		return res;
	}

	// find the closest key in scale to the given key(i)
	findClosest(scale, i){
		var min=Infinity, minI; 
		for (var k=0; k<24; k++)
			if (scale.modes[Work.global.mode][k % 12]==1)
				if (min>Math.abs(k-i) && Math.abs(k-i)<5){
					min=Math.abs(k-i);
					minI=k % 12;
				}
		return minI;
	}
	
	getTriadFromScaleKey(scale, key, add5){
		var res=Array(12).fill(0);
		var harmony;
		harmony=[(0+key)%12,(4+key)%12,(7+key)%12];
		if (add5 && scale.modes[Work.global.mode][7]==1) harmony.push(7);
		for (var h=0; h<harmony.length; h++) 
	//		if (h!=2 || scale.mask[harmony[h]]==1)	// for the dominant note we don't compromise!
				res[this.findClosest(scale, harmony[h])]=1; 
				
		var resS="";
		for (var i=0; i<12; i++) resS+=res[i];
		return resS;
	};	

	getWeightedKeys(){
		var map=this.getWeightedMaps(), res=[];
		//console.log("weight map", map);
		for (var m=0; m<map.length; m++)
			res.push(myLib.getMaxIndex(map[m]));
		return res;
	};
	
	// for current layer
	getWeightedMaps(){
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
		let measHW = Work.global.bpMeas / Work.global.bpNote * 8;
		let measC = Math.ceil(this.proll.endTick / measW);
		let measHC = Math.ceil(this.proll.endTick / measHW);
		
		let res=[];
		
		for (var meas=0; meas<measHC; meas++){
		
			// grab notes from measure #meas
			let notes=[];
			for (var i=0; i<Work.global.seqXY.length; i++)
			if (Work.global.seqXY[i].s)
			{
				if (Work.global.seqXY[i].x >= measHW * meas
				&& Work.global.seqXY[i].x+Work.global.seqXY[i].d <= measHW * (meas+1))
					notes.push({
						note: Work.global.seqXY[i],
						weight: weight[
									Math.floor((Work.global.seqXY[i].x-meas*measHW) 
									/ (16 / Work.global.bpNote))
								] 
					});
				else if (Work.global.seqXY[i].x < measHW * meas 
					  && Work.global.seqXY[i].x + Work.global.seqXY[i].d > measHW * meas
					  && Work.global.seqXY[i].x + Work.global.seqXY[i].d < measHW * (meas+1))
					notes.push({
						note: {
							x: measHW * meas,
							y: Work.global.seqXY[i].y,
							d: Work.global.seqXY[i].x + Work.global.seqXY[i].d - measHW * meas,
							s: Work.global.seqXY[i].s,
							v: Work.global.seqXY[i].v,
							l: Work.global.seqXY[i].l,
							t: Work.global.seqXY[i].t,
						},
						weight: weight[0] 
					});
				else if (Work.global.seqXY[i].x > measHW * meas 
					  && Work.global.seqXY[i].x < measHW * (meas+1)
					  && Work.global.seqXY[i].x + Work.global.seqXY[i].d > measHW * (meas+1))
					notes.push({
						note: {
							x: Work.global.seqXY[i].x,
							y: Work.global.seqXY[i].y,
							d: measHW * (meas+1) - Work.global.seqXY[i].x,
							s: Work.global.seqXY[i].s,
							v: Work.global.seqXY[i].v,
							l: Work.global.seqXY[i].l,
							t: Work.global.seqXY[i].t,
						},
						weight: weight[
									Math.floor((Work.global.seqXY[i].x-meas*measHW) 
									/ (16 / Work.global.bpNote))
								] 
					});
				else 
				 if (Work.global.seqXY[i].x <= measHW * meas
				 && Work.global.seqXY[i].x+Work.global.seqXY[i].d >= measHW * (meas+1))
					notes.push({
						note: {
							x: measHW * meas,
							y: Work.global.seqXY[i].y,
							d: measHW,
							s: Work.global.seqXY[i].s,
							v: Work.global.seqXY[i].v,
							l: Work.global.seqXY[i].l,
							t: Work.global.seqXY[i].t,
						},
						weight: weight[0] 
					});
			};
	
			//console.log(notes);
	
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
	
	// turn mask index (0..11) to scale key index (0..ScaleKeyCount-1), with -1 standing for "mask index not in scale"
	// s: scale id for scaleDict; k: key of 0..12; n: mask index (0..11)
	// return scale key index(0..ScaleKeyCount-1)
	// note: For both mask & scale index, 0 is always the Tonic/Root pitch, since we have transposed back to key of C by the param "k"
	// Example: input (70, 2, 4), or the E in D Major, and output will be 2, or the second diatonic pitch in D Major
	// Jan 8, 2024
	getScaleIndexFromMaskIndex(s, k, m, n){
		var si=0;
		for (var i=k; i<12; i++) {
			if (motf.theory.scaleDict[s].modes[m][(i+12-k) % 12]==1) {
				si++;
				if (i==n) return si;
			};
		};
		for (var i=0; i<k; i++) {
			if (motf.theory.scaleDict[s].modes[m][(i+12-k) % 12]==1) {
				si++;
				if (i==n) return si;
			};
		};
		return -1;
	}

	// Simply use the "k"th diatonic chord to accompany the "k"th diatonic key in the scale
	// Example: For D Major, "k" of E, or the 2nd diatonic key in D Major, will be accompanied with the 2nd diatonic chord, or Em
 	getChordsByMelodyKeyScale(key_id, scale_id, mode, firstMeas, lastMeas){
		let chords=this.getDiatonicChordsByKeyScale(key_id, scale_id, mode);
		//	console.log("chords",chords);
		let weightKeys=this.getWeightedKeys(); 
		//	console.log("weightKeys",weightKeys);
		let res=[];
		for (var i=0; i<weightKeys.length; i++) res.push(
			chords[this.getScaleIndexFromMaskIndex(scale_id, key_id, mode, weightKeys[i][0])-1]);		
		return res;
	}

	fill(guitarSwipe){
		
		let chords = this.getChordsByMelodyKeyScale(Work.global.key, Work.global.scale_id, Work.global.mode,
			0,this.endMeas);
		Work.global.autoChord=[];
		for (var i=2; i<chords.length; i++) if (chords[i]){
			Work.global.autoChord.push(chords[i]);

			var chord = [];
			var chordBase = Math.floor(Math.random()*7);
			for (var k=0+chordBase; k<24+chordBase; k++) if (chords[i].mask[k % 12]==1){
				chord.push(k);
			};
			var pos = 0;
			for (var k=0; k<this.pattern[0].length; k++) { 
				var newNote={
					x: Work.global.bpMeas / Work.global.bpNote * 8 * (i + pos / 16),
					y: 27 + chord[this.pattern[0][k][0]],
					d: Work.global.bpMeas / Work.global.bpNote * 8 * this.pattern[0][k][1]/16 , //6, 
					s: 0, 
					v: 0.75 + (3-(pos % 4)) / 6, 
					l: this.to, //Work.global.layer_sel,
					t: 1, // type: 0: normal note; 1: just improvised	
					p: 1,
					pedal: 1
				};
				this.proll.addNote(newNote);
				pos+=this.pattern[0][k][1];
			}
		};	
	}
}

class ImpNote {
	
	constructor(ctx, parent, home, gen, alter=0){
		this.rhythm = alter ? myLib.pick(improviser[gen].rhythm_alter) : myLib.pick(improviser[gen].rhythm);
		this.suggester = improviser[gen].pitchStep;
		this.range = improviser[gen].pitchRange;
		this.leading = improviser[gen].leadingToNext;

		this.ctx = ctx;  
		this.parent = parent;
		this.home = home;
		this.steps = this.rhythm.length;
		this.draft = this.rhythm[0] > 0 ?
			[{note: this.parent.note, len: this.rhythm[0] / 8 * this.parent.len}]:
			[{note: null, len: - this.rhythm[0] / 8 * this.parent.len}];
		this.variant = [];
		this.search(1);
		this.pick = null;
		if (this.variant.length>0) this.repick(); // get a random pick
	}
	// populat the variant(s) list
	search(n){
		if (n == this.steps) {
			var len = Math.abs(this.rhythm[n]) / 8 * this.parent.len;
		
			if (this.draft[n-1].note == null) {
				this.variant.push(myLib.deepCopy(this.draft));	
			} else if (!this.leading && this.alter){
				if (Math.abs(this.draft[n-1].note-this.home) <= 12)
					this.variant.push(myLib.deepCopy(this.draft));				
			} else {
				// prevent short note gets too jumpy
				var maxStep = len <=2 ? 5 : this.suggester.values.length;

				for (var i=0; i<maxStep; i++) if (Math.random()<this.suggester.chances[i]) {
					var lastNote;
					for (var j=this.draft.length-1; j>=0; j--)
						if (this.draft[j].note!=null){
							lastNote=this.draft[j].note;
							break;
						}	
					if (lastNote==null) lastNote=this.ctx.root;
					var targetY = this.ctx.getNoteByScaleMove(lastNote, this.suggester.values[i]);
					if (targetY > this.ctx.root + this.range[1])
						while (targetY > this.ctx.root + this.range[1]) targetY -= 12;
					if (targetY < this.ctx.root + this.range[0])
						while (targetY < this.ctx.root + this.range[0]) targetY += 12;	
					if (targetY == this.home){
						this.variant.push(myLib.deepCopy(this.draft));
						return;
					}
				};
			}
		} else {
			var len = Math.abs(this.rhythm[n]) / 8 * this.parent.len;
			if (this.rhythm[n] / Math.abs(this.rhythm[n]) == -1) {
				this.draft.push({note: null, len});
				this.search(n+1);
				this.draft.pop();
			} else {
			// prevent short note gets too jumpy
			var maxStep = len <=2 ? 5 : this.suggester.values.length;

			for (var i=0; i<maxStep; i++) if (Math.random()<this.suggester.chances[i]) {
				var lastNote;
				for (var j=this.draft.length-1; j>=0; j--)
					if (this.draft[j].note!=null){
						lastNote=this.draft[j].note;
						break;
					}
				if (lastNote==null) lastNote=this.ctx.root;
				var targetY = this.ctx.getNoteByScaleMove(lastNote, this.suggester.values[i]);
				if (targetY > this.ctx.root + this.range[1]) continue;
					//while (targetY > this.ctx.root + this.range[1]) targetY -= 12;
				if (targetY < this.ctx.root + this.range[0]) continue;
					//while (targetY < this.ctx.root + this.range[0]) targetY += 12;	
				this.draft.push({note: targetY, len});
				this.search(n+1);
				this.draft.pop();
			};
			};	
		};
	}
	// get a new pick from the varian(s)
	repick(){
		if (this.type=="bass") {
			this.pick = this.variant[Math.floor(Math.random()*this.variant.length)];
			return;
		};
		var upNdown=function(draft){
			var c=0, prev_dir=0;
			for (var i=1; i<draft.length; i++) if (draft[i].note != draft[i-1].note) {
				var dir = (draft[i].note>draft[i-1].note ? 1 : -1);
				if (dir != prev_dir) {
					c++;
					prev_dir = dir;
				}
			}
			return c;
		}
		var min=Infinity, minI;
		for (var i=0; i<this.variant.length; i++) {
			var v = upNdown(this.variant[i]);
			if (v < min || (v == min && Math.random()<0.7)) {
				min = v;
				minI = i;
			}
		}
		this.pick = this.variant[minI];
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

var motif = {
	search: [{v:0,p:0.3},{v:-1,p:1},{v:1,p:1},{v:-2,p:0.3},{v:2,p:0.3},
			 {v:-3,p:0.3},{v:3,p:0.4},{v:-4,p:0.4},{v:4,p:0.3}],
	bank: [
		// x, d-duration: in 1/8 parent.len; y: diatonic step from last note;
		{
			name: null,
			owner: null,
			uploader: null,
			uploadTime: null,
			KSM: null,
			firstNoteY: null,
			len: 8,
			seq: [{x:-3,d:1,y:null},{x:-2,d:1,y:null},{x:-1,d:1,y:null},
				{x:0,d:2,y:null},{x:2,d:2,y:null}],
			genre: null,
			density: null,
			range: null,
			upNdown: null,
			minDuration: null,
			maxDuration: null,
			restRate: null,
			syncopationRate: null,
			triplet: null,
		},
		{
			name: null,
			owner: null,
			uploader: null,
			uploadTime: null,
			KSM: null,
			firstNoteY: null,
			len: 8,
			seq: [{x:-3,d:1,y:null},{x:-2,d:1,y:null},{x:-1,d:1,y:null},{x:0,d:5,y:null}],
			genre: null,
			density: null,
			range: null,
			upNdown: null,
			minDuration: null,
			maxDuration: null,
			restRate: null,
			syncopationRate: null,
			triplet: null,
		},
		{
			name: null,
			owner: null,
			uploader: null,
			uploadTime: null,
			KSM: null,
			firstNoteY: null,
			len: 8,
			seq: [{x:-4,d:2,y:0},{x:-2,d:2,y:-1},{x:0,d:5,y:1}],
			genre: null,
			density: null,
			range: null,
			upNdown: null,
			minDuration: null,
			maxDuration: null,
			restRate: null,
			syncopationRate: null,
			triplet: null,
		},
		{
			name: null,
			owner: null,
			uploader: null,
			uploadTime: null,
			KSM: null,
			firstNoteY: null,
			len: 8,
			seq: [{x:0,d:1,y:0},{x:2,d:1,y:0},{x:4,d:0.1,y:-3},{x:5,d:1,y:3},{x:7,d:0.1,y:null}],
			//[{x:0,d:2,y:0},{x:3,d:1,y:0},{x:5,d:1,y:-3},{x:6,d:1,y:3}],
			genre: null,
			instrument: "bass",
			density: null,
			range: null,
			upNdown: null,
			minDuration: null,
			maxDuration: null,
			restRate: null,
			syncopationRate: null,
			triplet: null,
		},
		{
			name: null,
			owner: null,
			uploader: null,
			uploadTime: null,
			KSM: null,
			firstNoteY: null,
			len: 8,
			seq: [{x:0,d:1,y:0},{x:2,d:1,y:null},{x:4,d:0.1,y:null},{x:5,d:1,y:null},{x:7,d:0.1,y:null}],
			genre: null,
			instrument: "bass",
			density: null,
			range: null,
			upNdown: null,
			minDuration: null,
			maxDuration: null,
			restRate: null,
			syncopationRate: null,
			triplet: null,
		},

		// {
		// 	name: null,
		// 	owner: null,
		// 	uploader: null,
		// 	uploadTime: null,
		// 	KSM: null,
		// 	firstNoteY: null,
		// 	len: 8,
		// 	seq: [{x:0,d:4,y:null},{x:4,d:2,y:null},{x:6,d:2,y:null}],
		// 	genre: null,
		// 	density: null,
		// 	range: null,
		// 	upNdown: null,
		// 	minDuration: null,
		// 	maxDuration: null,
		// 	restRate: null,
		// 	syncopationRate: null,
		// 	triplet: null,
		// },
		// {
		// 	name: null,
		// 	owner: null,
		// 	uploader: null,
		// 	uploadTime: null,
		// 	KSM: null,
		// 	firstNoteY: null,
		// 	len: 8,
		// 	seq: [{x:0,d:3,y:0},{x:3,d:1,y:2},{x:4,d:2,y:-1},{x:6,d:2,y:-1}],
		// 	genre: null,
		// 	density: null,
		// 	range: null,
		// 	upNdown: null,
		// 	minDuration: null,
		// 	maxDuration: null,
		// 	restRate: null,
		// 	syncopationRate: null,
		// 	triplet: null,
		// },
		// {
		// 	name: null,
		// 	owner: null,
		// 	uploader: null,
		// 	uploadTime: null,
		// 	KSM: null,
		// 	firstNoteY: null,
		// 	len: 8,
		// 	seq: [{x:0,d:2,y:null},{x:2,d:1,y:null},{x:3,d:1,y:null},{x:4,d:2,y:null},{x:6,d:2,y:null}],
		// 	genre: null,
		// 	density: null,
		// 	range: null,
		// 	upNdown: null,
		// 	minDuration: null,
		// 	maxDuration: null,
		// 	restRate: null,
		// 	syncopationRate: null,
		// 	triplet: null,
		// },   
	],

	learn(selection){ // must be a phrase, x starting from the first down beat at 0, unit in 16th, so next down beats are 4, 8, 12... x can be negative
		if (!selection || selection.length==0) return;

		var notes = [];
		for (var i=0; i<selection.length; i++) notes.push(Work.global.seqXY[selection[i]]);

		console.log(notes);

		var mot = {
			name: null,
			owner: null,
			uploader: null,
			uploadTime: null,
			KSM: [0,23,0],
			tickPerNote: 16,
			tickPerBeat: 4,
			firstNoteY: null,
			len: 8,
		};

		mot.seq = [{x:0,d:1,y:0},{x:0,d:0.25,y:-2},{x:1,d:1,y:0},{x:2,d:1,y:1},{x:3,d:1,y:1},{x:4,d:1,y:0},{x:5,d:1,y:-1},{x:6,d:1,y:-1},{x:7,d:1,y:-1},
		 		{x:8,d:1,y:-1},{x:9,d:1,y:0},{x:10,d:1,y:1},{x:11,d:1,y:1},{x:12,d:1.5,y:0},{x:13.5,d:0.5,y:-1},{x:14,d:2,y:0}];
			
		mot.eval = {genre: null,
			density: null,
			range: null,
			upNdown: null,
			minDuration: null,
			maxDuration: null,
			restRate: null,
			syncopationRate: null,
			triplet: null,
			slope: null,
		};

		this.bank.push(mot);
		db.put(({key: "Motifs", value: this.bank}));
	},

	getById(id, mutate=0){
		var mot = myLib.deepCopy(this.bank[id]);

		// if just a rhythm (not a motif), then return it without mutation
		// if (this.bank[id].seq[0].y==null) return mot;

		// for (var i=mot.seq.length-1; i>0; i--){
		// 	var prob = i / mot.length * mutate;
		// 	if (Math.random()<prob) mot[i].y += Math.floor(Math.random()*3)-1;
		// }
		return mot;
	},

	load(){
		db.get("Motifs", (motifs)=>{
			if (motifs) this.bank = motifs.value;
		});		
	}
}

class ImpNote1 {
	
	constructor(ctx, parent, home, gen, alter=0, mutate=0, mot){
		// this.rhythm = alter ? myLib.pick(improviser[gen].rhythm_alter) : myLib.pick(improviser[gen].rhythm);
		// this.range = improviser[gen].pitchRange;
		// this.leading = improviser[gen].leadingToNext;
		this.gen = gen;
		this.motif = motif.getById(mot);
		this.stepParent = motif.search;//myLib.reshuffle(motif.search);
		this.ctx = ctx;  
		this.parent = parent;
		this.home = home;
		this.zoom = this.parent.len / this.motif.len;
		this.draft = [{note: this.ctx.getNoteByScaleMove(this.parent.note, this.motif.seq[0].y), 
			len: this.motif.seq[0].d * this.zoom, x: this.motif.seq[0].x * this.zoom}];
		this.variant = [];
		this.search(1);
		this.pick = null;
		if (this.variant.length>0) this.repick(); // get a random pick
	}
	// populat the variant(s) list
	search(n, inMotif){
		if (n == this.motif.seq.length) {
			if (//(inMotif) || 
				(
				//this.draft[n-1].note == this.home || 
				this.draft[n-1].note == this.home - 5 ||
				//this.draft[n-1].note == this.home - 12 ||
				this.ctx.getNoteByScaleMove(this.draft[n-1].note,  1) == this.home ||
				this.ctx.getNoteByScaleMove(this.draft[n-1].note, -1) == this.home )
				){
					this.variant.push(myLib.deepCopy(this.draft));
				};
		} else {
			this.steps = myLib.deepCopy(this.stepParent);
			var inMotif = false;
			if (this.motif.seq[n].y != null) {
				this.steps.splice(0,1,{v:this.motif.seq[n].y, p:1});
				inMotif=true;
			};
			var short = (this.motif.seq[n].d<=1);
			for (var i = 0; i < this.steps.length; i++) 
			if (this.variant.length < 1 && Math.random()<this.steps[i].p) { 
				var targetY = this.ctx.getNoteByScaleMove(this.draft[n-1].note, this.steps[i].v);
				this.draft.push({note: targetY, len: this.motif.seq[n].d * this.zoom, x: this.motif.seq[n].x * this.zoom});
				this.search(n+1, (inMotif && i==0) ? true : false);
				this.draft.pop();	
			};
			// for (var i=1; i<this.motif.length; i++) {
				
			// 	if (targetY > this.ctx.root + this.range[1]) continue;
			// 		//while (targetY > this.ctx.root + this.range[1]) targetY -= 12;
			// 	if (targetY < this.ctx.root + this.range[0]) continue;
			// 		//while (targetY < this.ctx.root + this.range[0]) targetY += 12;	
			// 	this.draft.push({note: targetY, len});
			// 	this.search(n+1);
			// 	this.draft.pop();
			// };	
		};
	}
	// get a new pick from the varian(s)
	repick(){
		if (this.type=="bass") {
			this.pick = this.variant[Math.floor(Math.random()*this.variant.length)];
			return;
		};
		var upNdown=function(draft){
			var c=0, prev_dir=0;
			for (var i=1; i<draft.length; i++) if (draft[i].note != draft[i-1].note) {
				var dir = (draft[i].note>draft[i-1].note ? 1 : -1);
				if (dir != prev_dir) {
					c++;
					prev_dir = dir;
				}
			}
			return c;
		}
		var min=Infinity, minI;
		for (var i=0; i<this.variant.length; i++) {
			var v = upNdown(this.variant[i]);
			if (v < min || (v == min && Math.random()<0.8)) {
				min = v;
				minI = i;
			}
		}
		this.pick = this.variant[minI];
		//this.pick = this.variant[Math.floor(Math.random()*this.variant.length)];
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

motf.color = color;
motf.theory = theory;
motf.motif = motif;
motf.Context = Context;
motf.Drumer = Drumer;
motf.Chorder = Chorder;
motf.ImpNote = ImpNote;
motf.ImpNote1 = ImpNote1;

})()