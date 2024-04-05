var Work = {};

(function(){

// scale: 23m0-Major, 23m5-Minor, 16-Major Blues

Work.global= {
	workname: "Another Piece of Shit",
	author: "noname",
	key: 0, // 0-11 / offset from C, in chromatic scale
	scale_id: 23,
	mode: 0,
	bpm: 60,
	bpMeas: 4,
	bpNote: 4,
	volume: -10,
	roomsize: 3,
	metro_vol: -10, 	
	rhythm_vol: -10, 	
	human_vel: 1.0,
	human_tem: 0,
	magnet: 0,
	metronome: 0,
	scaledKeyboard: 0,
	through: 1,
	tempo_auto:[ // 0..seq.length/16 (resolution: 1 measure)
	],
	layer_sel: 0,
	imp_pre_sel: 0,
	// 1..10
	imp_pre: [ 
		{
			name: "Root Gen.",
			
			rhythm: "11111111",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Bass Calm",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.2, 0.5], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Bass Rhy.",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Melody 1",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Melody 2",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Melody 3",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Rhythm 1",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Rhythm 2",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Arpeggio 1",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Arpeggio 2",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		}
	],
	pedal: [],
	// x unit: tick; y unit: key
	seqXY: [],
// 	{"x":0,"y":3,"d":64,"v":1,"l":0,"s":1,"t":0},
// 	],
	stroke: [],
	// 6543
//	chord: [[24, 27, 31],[22, 26, 29],[20, 24, 27],[19, 23, 26, 29]],
	chord: [
// 	{name:"CM",mask:"100010000100"},
// 	{name:"CM",mask:"001000010001"},
// 	{name:"CM",mask:"100001000100"},
// 	{name:"CM",mask:"000010001001"}
	],
	autoChord: [],
// [layer, tick, 1/0 pedal down / up]
// 	pedal: [[0,0,1],[0,15,0],
// 			[0,16,1],[0,31,0],
// 			[0,32,1],[0,47,0],
// 			[0,48,1],[0,63,0]],
	// 1645
//	chord: [[31, 34, 39],[27, 31, 36],[27, 32, 36],[29, 34, 38]],

	// 15634145
// 	chord: [[22, 27, 31],[22, 26, 29],[24, 27, 31],[22, 26, 31],
// 			[20, 24, 27],[22, 27, 31],[20, 24, 27],[22, 26, 29]],
	//Jazz 1
//	chord: [[2,5,9,0],[2,7,11,5],[0,4,7,11],[0,4,7,9]],
	
//	chord: [[0+3+24,3+3+24,7+3+24,10+3+24]],
	selectedMeas: [],			
	showRhythm: 0,
	showCanvas: 0,
	printTo: "16" // "rhythm", "32", "16", "8", "4"(n) 
};

Work.layer= [  // T01..T10
	{
		name: "Melody 1", //0
		type: "melody",
		instrument: 4,
		mute: false,
		solo: false,
		volume: -7,
		pan: 0.5,
		// pedal: [{tick:0, onOff:1},{tick:7, onOff:0},{tick:8, onOff:1},{tick:15, onOff:0},
		// 		{tick:16, onOff:1},{tick:23, onOff:0},{tick:24, onOff:1},{tick:31, onOff:0},
		// 		{tick:32, onOff:1},{tick:39, onOff:0},{tick:40, onOff:1},{tick:47, onOff:0},
		// 		{tick:48, onOff:1},{tick:55, onOff:0},{tick:56, onOff:1},{tick:63, onOff:0},
		// 		{tick:64, onOff:1},{tick:71, onOff:0},{tick:72, onOff:1},{tick:79, onOff:0},
		// 		{tick:80, onOff:1},{tick:87, onOff:0},{tick:88, onOff:1},{tick:95, onOff:0},
		// 		{tick:96, onOff:1},{tick:103, onOff:0},{tick:104, onOff:1},{tick:111, onOff:0},
		// 		{tick:112, onOff:1},{tick:119, onOff:0},{tick:120, onOff:1},{tick:127, onOff:0}]
	},
	{
		name: "Melody 2", //1
		type: "melody",
		instrument: 4,
		mute: false,
		solo: false,
		volume: -10,
		pan: -0.5,
		// pedal: [{tick:0, onOff:1},{tick:7, onOff:0},{tick:8, onOff:1},{tick:15, onOff:0},
		// 	{tick:16, onOff:1},{tick:23, onOff:0},{tick:24, onOff:1},{tick:31, onOff:0},
		// 	{tick:32, onOff:1},{tick:39, onOff:0},{tick:40, onOff:1},{tick:47, onOff:0},
		// 	{tick:48, onOff:1},{tick:55, onOff:0},{tick:56, onOff:1},{tick:63, onOff:0}]
	},
	{
		name: "Meline", //2
		type: "bass",
		instrument: 10,
		mute: false,
		solo: false,
		volume: -16,
		pan: 0.4,
	},
	{
		name: "Chord", //3
		type: "chord",
		instrument: 4,
		mute: false,		
		solo: false,
		volume: -8,
		pan: -0.3,
		pedal: [{tick:0, onOff:1}]//,{tick:7, onOff:0},{tick:8, onOff:1},{tick:15, onOff:0},
		// 	{tick:16, onOff:1},{tick:23, onOff:0},{tick:24, onOff:1},{tick:31, onOff:0},
		// 	{tick:32, onOff:1},{tick:39, onOff:0},{tick:40, onOff:1},{tick:47, onOff:0},
		// 	{tick:48, onOff:1},{tick:55, onOff:0},{tick:56, onOff:1},{tick:63, onOff:0}]
	},
	{
		name: "Bass", //4
		type: "bass",
		instrument: 16,
		mute: false,		
		solo: false,
		volume: -10,
		pan: 0.3
	},
	{
		name: "Walking Bass", //5
		type: "bass",
		instrument: 16,
		mute: true,		
		solo: false,
		volume: -10,
		pan: -0.7
	},
	{
		name: "Percussion", //6
		type: "percussion",
		instrument: 17,
		mute: false,		
		solo: false,
		volume: -11,
		pan: -0.2,
		pedal: [{tick:0, onOff:1}]
	}
]

// init layer[0].imp_a with default iparams
// Work.layer[0].seq=pianoroll.seq;

// for (var i=0; i<Work.layer[0].seq.length; i++)
// if (i % 8 == 0) Work.layer[0].imp_a[i]=Global.default_params;

}())

var newWork = copyObj(Work);
