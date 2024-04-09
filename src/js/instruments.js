var Instruments={};

(function(){

//Instruments.sampler=[];

const projectURL = SERVER+"/src";

// Instruments.newSampler2=(i, ch)=>{
// 	var si=document.getElementById("select_instrument_"+ch);	
// 	si.options[i].innerHTML="="+si.options[i].innerHTML.substring(1);
// 	var ind=i;
// 	var s=new Tone.Sampler(
// 		samplerParams[i].urls,
// 		function(){
// //			console.log(samplerParams[i].name+" loaded");
// 			pianoroll.layer[ch].instrument=s;
// 			pianoroll.layer[ch].instrument.connect(pianoroll.layer[ch].channel);
// 			si.selectedIndex=i;
// 			if (si.options[ind].innerHTML[0]=="=")
// 			si.options[ind].innerHTML= si.options[ind].innerHTML.substring(1);
// //			document.getElementById("btn_layer_"+ch).innerHTML=samplerParams[i].name;
// 			document.getElementById("btn_layer_"+ch).innerHTML=Work.layer[ch].name;
// 			if (Work.layer[ch].name=="New Layer") 
// 				document.getElementById("btn_layer_"+ch).innerHTML=samplerParams[i].name;
// 			Work.layer[ch].instrument=i;
// 		},
// 		samplerParams[i].baseUrl
// 	);
// }

// Instruments.drumset = [
//   new Tone.Player(projectURL+"/sample/acoustic-kit/hihat.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/kick.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/snare.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/tom1.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/tom2.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/tom3.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/extra1.mp3").connect(pianoroll.master.rhythm_vol),
//   new Tone.Player(projectURL+"/sample/acoustic-kit/extra2.mp3").connect(pianoroll.master.rhythm_vol),
// ];

// to be simplified - merge into the sampleParams
// Instruments.drumset = new Tone.Sampler(
// {
//   'C2': 'hihat.mp3',
//   'C#2': 'kick.mp3',
//   'D2': 'snare.mp3',
//   'D#2': 'tom1.mp3',
//   'E2': 'tom2.mp3',
//   'F2': 'tom3.mp3',
//   'F#2': 'extra1.mp3',
//   'G2': 'extra2.mp3',

//   'G#2': 'hihat.mp3',
//   'A2': 'kick.mp3',
//   'A#2': 'snare.mp3',
//   'B2': 'tom1.mp3',
//   'C3': 'tom2.mp3',
//   'C#3': 'tom3.mp3',
//   'D3': 'extra1.mp3',
//   'D#3': 'extra2.mp3',
// }, function(){
//     //console.log("drumset ready!");

//     // testing...

//     // Instruments.test = new Tone.Sampler(
//     //   {
//     //     'C2': URL.createObjectURL(Instruments.drumset._buffers._buffers[0],{type: 'application/zip'}),
//     //     'C#2': URL.createObjectURL(Instruments.drumset._buffers._buffers[1]),
//     //     'D2': URL.createObjectURL(Instruments.drumset._buffers._buffers[2]),
//     //   },
//     //     function(){Instruments.test.triggerAttack("C2");},
//     //     "");
//     // Instruments.test._buffers=Instruments.drumset._buffers;
//     // Instruments.text.triggerAttack("C3");        

// }, projectURL+"/sample/acoustic-kit/").connect(pianoroll.master.rhythm_vol);


var samplerParams=[
	{//0
		name: "Piano Yamaha C5",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
		urls: {
			A0: "A0.mp3",
// 			C1: "C1.mp3",
 			"D#1": "Ds1.mp3",
// 			"F#1": "Fs1.mp3",
			A1: "A1.mp3",
// 			C2: "C2.mp3",
 			"D#2": "Ds2.mp3",
// 			"F#2": "Fs2.mp3",
			A2: "A2.mp3",
// 			C3: "C3.mp3",
 			"D#3": "Ds3.mp3",
// 			"F#3": "Fs3.mp3",
			A3: "A3.mp3",
// 			C4: "C4.mp3",
 			"D#4": "Ds4.mp3",
// 			"F#4": "Fs4.mp3",
			A4: "A4.mp3",
// 			C5: "C5.mp3",
 			"D#5": "Ds5.mp3",
// 			"F#5": "Fs5.mp3",
			A5: "A5.mp3",
// 			C6: "C6.mp3",
 			"D#6": "Ds6.mp3",
// 			"F#6": "Fs6.mp3",
			A6: "A6.mp3",
// 			C7: "C7.mp3",
 			"D#7": "Ds7.mp3",
// 			"F#7": "Fs7.mp3",
			A7: "A7.mp3",
// 			C8: "C8.mp3"
		},
		baseUrl: projectURL+"/sample/piano_yamaha/"
	},
	{//1
		name: "Piano Steinway",
		timeOffset: 0,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
		urls: {
        'A0': 'A0.mp3',
        'A1': 'A1.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A6': 'A6.mp3',
        'A7': 'A7.mp3',
        'A#7': 'As7.mp3',
        'A#1': 'As1.mp3',
        'A#2': 'As2.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'A#5': 'As5.mp3',
        'A#6': 'As6.mp3',
        'B7': 'B7.mp3',
        'B1': 'B1.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'B5': 'B5.mp3',
        'B6': 'B6.mp3',
        'C7': 'C7.mp3',
        'C1': 'C1.mp3',
        'C2': 'C2.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'C#7': 'Cs7.mp3',
        'C#1': 'Cs1.mp3',
        'C#2': 'Cs2.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'C#6': 'Cs6.mp3',
        'D7': 'D7.mp3',
        'D1': 'D1.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D5': 'D5.mp3',
        'D6': 'D6.mp3',
        'D#7': 'Ds7.mp3',
        'D#1': 'Ds1.mp3',
        'D#2': 'Ds2.mp3',
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'D#5': 'Ds5.mp3',
        'D#6': 'Ds6.mp3',
        'E7': 'E7.mp3',
        'E1': 'E1.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'F7': 'F7.mp3',
        'F1': 'F1.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
        'F6': 'F6.mp3',
        'F#7': 'Fs7.mp3',
        'F#1': 'Fs1.mp3',
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'F#6': 'Fs6.mp3',
        'G7': 'G7.mp3',
        'G1': 'G1.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'G5': 'G5.mp3',
        'G6': 'G6.mp3',
        'G#7': 'Gs7.mp3',
        'G#1': 'Gs1.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'G#4': 'Gs4.mp3',
        'G#5': 'Gs5.mp3',
        'G#6': 'Gs6.mp3'
		},
		baseUrl: projectURL+"/sample/piano_steinway/"
	},
	{//2
		name: "Cello",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
			'E3': 'E3.mp3',
			'E4': 'E4.mp3',
			'F2': 'F2.mp3',
			'F3': 'F3.mp3',
			'F4': 'F4.mp3',
			'F#3': 'Fs3.mp3',
			'F#4': 'Fs4.mp3',
			'G2': 'G2.mp3',
			'G3': 'G3.mp3',
			'G4': 'G4.mp3',
			'G#2': 'Gs2.mp3',
			'G#3': 'Gs3.mp3',
			'G#4': 'Gs4.mp3',
			'A2': 'A2.mp3',
			'A3': 'A3.mp3',
			'A4': 'A4.mp3',
			'A#2': 'As2.mp3',
			'A#3': 'As3.mp3',
			'B2': 'B2.mp3',
			'B3': 'B3.mp3',
			'B4': 'B4.mp3',
			'C2': 'C2.mp3',
			'C3': 'C3.mp3',
			'C4': 'C4.mp3',
			'C5': 'C5.mp3',
			'C#3': 'Cs3.mp3',
			'C#4': 'Cs4.mp3',
			'D2': 'D2.mp3',
			'D3': 'D3.mp3',
			'D4': 'D4.mp3',
			'D#2': 'Ds2.mp3',
			'D#3': 'Ds3.mp3',
			'D#4': 'Ds4.mp3',
			'E2': 'E2.mp3'
		},
		baseUrl: projectURL+"/sample/cello/"	
	},
	{//3
		name:"Violin",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A6': 'A6.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'G4': 'G4.mp3',
        'G5': 'G5.mp3',
        'G6': 'G6.mp3'
		},
		baseUrl: projectURL+"/sample/violin/"
	},
	{//4
		name:"Steel Guitar",
		timeOffset: 0,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'F4': 'F4.mp3',
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'G#4': 'Gs4.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A#2': 'As2.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D5': 'D5.mp3',
        'D#2': 'Ds2.mp3',
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3'
		},
		baseUrl: projectURL+"/sample/guitar-acoustic/"
	},
	{//5
		name: "Nylon Guitar",
    loadByDefault: false,
    timeOffset: 0,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'G3': 'G3.mp3',
        'G5': 'G5.mp3',
        'G#2': 'Gs2.mp3',
        'G#4': 'Gs4.mp3',
        'G#5': 'Gs5.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A#5': 'As5.mp3',
        'B1': 'B1.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D#5': 'Ds5.mp3',
        'D#4': 'Ds4.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3'
		},
		baseUrl: projectURL+"/sample/guitar-nylon/"
	},
	{//6
		name:"Trumpet",
		timeOffset: 0,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'C6': 'C6.mp3',
        'D5': 'D5.mp3',
        'D#4': 'Ds4.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
        'G4': 'G4.mp3',
        'A3': 'A3.mp3',
        'A5': 'A5.mp3',
        'A#4': 'As4.mp3',
        'C4': 'C4.mp3'
		},
		baseUrl: projectURL+"/sample/trumpet/"
	},
	{//7
		name: "Trombone",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'A#3': 'As3.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C#2': 'Cs2.mp3',
        'C#4': 'Cs4.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D#2': 'Ds2.mp3',
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'A#1': 'As1.mp3',
        'A#2': 'As2.mp3'
		},
		baseUrl: projectURL+"/sample/trombone/"
	},
	{//8
		name:"Harp",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'C5': 'C5.mp3',
        'D2': 'D2.mp3',
        'D4': 'D4.mp3',
        'D6': 'D6.mp3',
        'D7': 'D7.mp3',
        'E1': 'E1.mp3',
        'E3': 'E3.mp3',
        'E5': 'E5.mp3',
        'F2': 'F2.mp3',
        'F4': 'F4.mp3',
        'F6': 'F6.mp3',
        'F7': 'F7.mp3',
        'G1': 'G1.mp3',
        'G3': 'G3.mp3',
        'G5': 'G5.mp3',
        'A2': 'A2.mp3',
        'A4': 'A4.mp3',
        'A6': 'A6.mp3',
        'B1': 'B1.mp3',
        'B3': 'B3.mp3',
        'B5': 'B5.mp3',
        'B6': 'B6.mp3',
        'C3': 'C3.mp3'
		},
		baseUrl: projectURL+"/sample/harp/"
	},
	{//9
		name: "Electric Guitar",
		timeOffset: 0,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'D#5': 'Ds5.mp3',
        'E2': 'E2.mp3',
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C#2': 'Cs2.mp3'
		},
		baseUrl: projectURL+"/sample/guitar-electric/"
	},
	{//10
		name: "Contrabass",
		timeOffset: 0,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'C2': 'C2.mp3',
        'C#3': 'Cs3.mp3',
        'D2': 'D2.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'F#1': 'Fs1.mp3',
        'F#2': 'Fs2.mp3',
        'G1': 'G1.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'A2': 'A2.mp3',
        'A#1': 'As1.mp3',
        'B3': 'B3.mp3'
		},
		baseUrl: projectURL+"/sample/contrabass/"
	},
	{//11
		name: "Flute",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'A6': 'A6.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3'
		},
		baseUrl: projectURL+"/sample/flute/"
	},
	{//12
		name: "French Horn",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'D3': 'D3.mp3',
        'D5': 'D5.mp3',
        'D#2': 'Ds2.mp3',
        'F3': 'F3.mp3',
        'F5': 'F5.mp3',
        'G2': 'G2.mp3',
        'A1': 'A1.mp3',
        'A3': 'A3.mp3',
        'C2': 'C2.mp3',
        'C4': 'C4.mp3'
		},
		baseUrl: projectURL+"/sample/french-horn/"
	},
	{//13
		name: "Electric Bass",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'A#1': 'As1.mp3',
        'A#2': 'As2.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'C#1': 'Cs1.mp3',
        'C#2': 'Cs2.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'E1': 'E1.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'G1': 'G1.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3'
		},
		baseUrl: projectURL+"/sample/bass-electric/"
	},
	{//14
		name: "Bassoon",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    vUrls: [],
		urls: {
        'A4': 'A4.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'E4': 'E4.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3'
		},
		baseUrl: projectURL+"/sample/bassoon/"
	},
	{//15
		name: "Clarinet",
		timeOffset: 0,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'D4': 'D4.mp3',
        'D5': 'D5.mp3',
        'D6': 'D6.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
        'F#6': 'Fs6.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'A#5': 'As5.mp3',
        'D3': 'D3.mp3'	
		},
		baseUrl: projectURL+"/sample/clarinet/"
	},
	{//16
		name: "Upright Bass",
		timeOffset: 0,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    blobs: [],
    urls: {
        'E2': 'E2.wav',
        'A2': 'A2.wav',
        'D3': 'D3.wav',
        'E3': 'E3.wav',
        'A3': 'A3.wav',
        'C4': 'C4.wav',
        'F5': 'F4.wav',
		},
		baseUrl: projectURL+"/sample/upright_bass/"
	},
  // {//17
	// 	name: "Drum Set",
	// 	timeOffset: 0,
  //   loadByDefault: true,
  //   volumeCorrection: 0,
  //   vUrls: [],
  //   blobs: [],
  //   urls: {    
  //     'C2': 'hihat.mp3',
  //     'C#2': 'kick.mp3',
  //     'D2': 'snare.mp3',
  //     'D#2': 'tom1.mp3',
  //     'E2': 'tom2.mp3',
  //     'F2': 'tom3.mp3',
  //     'F#2': 'extra1.mp3',
  //     'G2': 'extra2.mp3',
    
  //     'G#2': 'hihat.mp3',
  //     'A2': 'kick.mp3',
  //     'A#2': 'snare.mp3',
  //     'B2': 'tom1.mp3',
  //     'C3': 'tom2.mp3',
  //     'C#3': 'tom3.mp3',
  //     'D3': 'extra1.mp3',
  //     'D#3': 'extra2.mp3',
	// 	},
	// 	baseUrl: projectURL+"/sample/acoustic-kit/"    
  // }
  // {//17
	// 	name: "Drum Set",
	// 	timeOffset: 0,
  //   loadByDefault: true,
  //   volumeCorrection: 0,
  //   vUrls: [],
  //   blobs: [],
  //   urls: {    
  //     36: "Techno Kick 02.wav",
  //     38: "Techno Snare 03.wav",
  //     40: "Techno Snare 03.wav",
  //     37: "Techno Snare 03.wav",
  //     48: "Techno Tom 03.wav",
  //     50: "Techno Tom 03.wav",
  //     45: "Techno Tom 01.wav",
  //     47: "Techno Tom 01.wav",
  //     43: "Techno Tom 04.wav",
  //     58: "Techno Tom 04.wav",
  //     46: "Techno Open Hat 03.wav",
  //     26: "Techno Open Hat 03.wav",
  //     42: "Techno Closed Hat 01.wav",
  //     22: "Techno Closed Hat 01.wav",
  //     44: "Techno Closed Hat 01.wav",
  //     49: "Techno Cymbal 01.wav",
  //     55: "Techno Cymbal 01.wav",
  //     57: "Techno Cymbal 01.wav",
  //     52: "Techno Cymbal 01.wav",
  //     51: "Techno Cymbal 02.wav",
  //     59: "Techno Cymbal 02.wav",
  //     53: "Techno Cymbal 02.wav",
	// 	},
	// 	baseUrl: projectURL+"/sample/drum-kit/techno/"    
  // }  
  // {//17
	// 	name: "Drum Set",
	// 	timeOffset: 0,
  //   loadByDefault: true,
  //   volumeCorrection: 0,
  //   vUrls: [],
  //   blobs: [],
  //   urls: {    
  //     //KD
  //     36: "Urban Kick 02.wav",

  //     //SD
  //     38: "Urban Snare 01.wav",
  //     40: "Urban Snare 02.wav",
  //     37: "Urban Snare 03.wav",

  //     //TT
  //     50: "Urban Rimshot 02.wav",
  //     48: "Urban Tom 01.wav",
  //     47: "Urban Tom 01.wav",
  //     45: "Urban Tom 02.wav",
  //     43: "Urban Sub 01.wav",
  //     58: "Urban Rimshot 01.wav",

  //     //HH
  //     46: "Urban Open Hat 01.wav",
  //     26: "Urban Open Hat 02.wav",
  //     42: "Urban Closed Hat 01.wav",
  //     22: "Urban Closed Hat 02.wav",
  //     44: "Urban Open Hat 01.wav",

  //     //Crash
  //     49: "Urban Cymbal 02.wav",
  //     55: "Urban Cymbal 02.wav",
  //     57: "Urban Cymbal 02.wav",
  //     52: "Urban Cymbal 01.wav",

  //     //Ride
  //     51: "Urban Shaker 01.wav",
  //     59: "Urban Shaker 02.wav",
  //     53: "Urban Tamb 02.wav",
	// 	},
	// 	baseUrl: projectURL+"/sample/drum-kit/urban/"    
  // }    
  // {//17
	// 	name: "Drum Set",
	// 	timeOffset: 0,
  //   loadByDefault: true,
  //   volumeCorrection: 0,
  //   vUrls: [],
  //   blobs: [],
  //   urls: {    
  //     //KD
  //     36: "Main Room Kick 01.wav",

  //     //SD head/rim/stick
  //     38: "Main Room Snare 01.wav",
  //     40: "Main Room Snare 02.wav",
  //     37: "Main Room Snare 03.wav",

  //     //TT t1/t1r t2/t2r t3/t3r
  //     48: "Main Room Stacked Hit 01.wav",
  //     50: "Main Room Stacked Hit 01.wav",
  //     45: "Main Room Stacked Hit 02.wav",
  //     47: "Main Room Stacked Hit 02.wav",
  //     43: "Main Room Stacked Hit 03.wav",
  //     58: "Main Room Stacked Hit 03.wav",

  //     //HH open/open-edge closed/closed-edge pedalHH
  //     46: "Main Room Open Hat 02.wav",
  //     26: "Main Room Open Hat 01.wav",
  //     42: "Main Room Closed Hat 02.wav",
  //     22: "Main Room Closed Hat 01.wav",
  //     44: "Main Room Closed Hat 04.wav",

  //     //Crash
  //     49: "Main Room Cymbal 02.wav",
  //     55: "Main Room Cymbal 03.wav",
  //     57: "Main Room Cymbal 04.wav",
  //     52: "Main Room Cymbal 01.wav",

  //     //Ride
  //     51: "Main Room Closed Hat 03.wav",
  //     59: "Main Room Shaker 01.wav",
  //     53: "Main Room Clap 03.wav",
	// 	},
	// 	baseUrl: projectURL+"/sample/drum-kit/mainroom/"    
  // }  
    // {//17
    //   name: "Drum Set",
    //   timeOffset: 0,
    //   loadByDefault: true,
    //   volumeCorrection: 0,
    //   vUrls: [],
    //   blobs: [],
    //   urls: {    
    //     //KD
    //     36: "Hand Bass Drum.wav",
  
    //     //SD head/rim/stick
    //     38: "Hand Bongo 02.wav",
    //     40: "Hand Bongo 03.wav",
    //     37: "Hand Bongo 01.wav",
  
    //     //TT t1/t1r t2/t2r t3/t3r
    //     48: "Hand Djmbe 01.wav",
    //     50: "Hand Djmbe 02.wav",
    //     45: "Hand Hide Drum 01.wav",
    //     47: "Hand Hide Drum 02.wav",
    //     43: "Hand Udu 01.wav",
    //     58: "Hand Udu 02.wav",
  
    //     //HH open/open-edge closed/closed-edge pedalHH
    //     46: "Hand Talking Drum 01.wav",
    //     26: "Hand Talking Drum 02.wav",
    //     42: "Hand Talking Drum 01.wav",
    //     22: "Hand Talking Drum 02.wav",
    //     44: "Hand Dumbek.wav",
  
    //     //Crash
    //     49: "Hand Cajon 01.wav",
    //     55: "Hand Cajon 01.wav",
    //     57: "Hand Cajon 02.wav",
    //     52: "Hand Dumbek.wav",
  
    //     //Ride
    //     51: "Hand Tabla 01.wav",
    //     59: "Hand Tabla 02.wav",
    //     53: "Hand Tabla 03.wav",
    //   },
    //   baseUrl: projectURL+"/sample/drum-kit/handdrum/"    
    // }      
    {//17
      name: "Drum Set",
      timeOffset: 0,
      loadByDefault: true,
      volumeCorrection: 0,
      vUrls: [],
      blobs: [],
      // drum mapping: https://magenta.tensorflow.org/datasets/groove
      urls: {    
        //metronome
        33: "33.mp3",
        34: "34.mp3",

        //KD
        35: "35.mp3",
        36: "36.mp3",
  
        //SD head/rim/stick
        38: "38.mp3",
        40: "40.mp3",
        37: "37.wav",
  
        //TT t1/t1r t2/t2r t3/t3r
        48: "48.mp3",
        50: "50.mp3",
        45: "45.mp3",
        47: "47.mp3",
        43: "43.mp3",
        41: "41.mp3",

        39: "39.mp3",
        58: "58.mp3",
        56: "56.mp3",
  
        //HH open/open-edge closed/closed-edge pedalHH
        46: "46.mp3",
        26: "26.mp3",
        42: "42.mp3",
        22: "22.mp3",
        44: "44.mp3",

        //
        54: "54.mp3",
  
        //Crash
        49: "49.mp3",
        55: "55.wav",
        57: "57.wav",
        52: "52.mp3",
  
        //Ride
        51: "51.wav",
        59: "59.mp3",
        53: "53.mp3",
      },
      baseUrl: projectURL+"/sample/drum-kit/selected/"    
    }       
];
Instruments.samplerParams = samplerParams;
//Instruments.defaultLoaded = false;
//Instruments.onDefaultLoaded=()=>{console.log("all loaded")};

// init vUrls
for (var i=0; i<samplerParams.length; i++){
  for (var j=0; j < Object.values(samplerParams[i].urls).length; j++)
  samplerParams[i].vUrls.push("");
}

// function allDownloaded(){
//   for (var i=0; i<samplerParams.length; i++){
//     if (!samplerParams[i].loadByDefault) continue;
//     for (var j=0; j<samplerParams[i].vUrls.length; j++)
//       if (samplerParams[i].vUrls[j].length==0)
//         return false;
//   };
//   return true;
//   //Instruments.defaultLoaded = true;
//   // for (var i=0; i<samplerParams.length; i++){
//   //   if (!samplerParams[i].loadByDefault) continue;
//   //   samplerParams[i].baseUrl="";

//   //   for (var j=0; j<samplerParams[i].vUrls.length; j++) 
//   //     samplerParams[i].urls[Object.keys(samplerParams[i].urls)[j]]
//   //       =samplerParams[i].vUrls[j];
//   // } 
//   //Instruments.onDefaultLoaded();
// }

// var samples=[];
// function loadInstruments(){
//   db.get("Samples",(e)=>{
//     if (e) samples = e.value;
//     for (var i=0; i<samplerParams.length; i++) if (samplerParams[i].loadByDefault) {
//       if (!samples[i]) {
//         for (var j=0; j<samplerParams[i].urls.length; j++){
//           fetch(new Request(samplerParams[i].baseUrl+Object.values(samplerParams[i].urls)[j]))
//           .then((response) => {
//             if (!response.ok) 
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             return response.blob();
//           })
//           .then((response) => {
//             samplerParams[i].blobs[j] = response;    
//             samplerParams[i].vUrls[j]=URL.createObjectURL(response);
//             checkLoadStatus();
//           });  
//         }
//         samples[i]=sample;
//       }  
//     }
//   });
// }

// console.log(loadInstruments());

var samplesChanged = false;
var refresh = function(){
  db.get("Samples",(e)=>{
    if (e) {
      samplerParams = e.value;
      for (var i=0; i<samplerParams.length; i++) if (samplerParams[i].baseUrl==""){
        for (var j=0; j<Object.values(samplerParams[i].urls).length; j++){
            samplerParams[i].vUrls[j] = URL.createObjectURL(samplerParams[i].blobs[j]);
        };
      };
      onDefaultLoaded();
      console.log("Samples loaded from local.")
    } else {
      updateSample();
    }
  });
}

var updateSample = function(){
  var newInstru = false;
  for (var i=0; i<Work.layer.length; i++)
    if (samplerParams[Work.layer[i].instrument].baseUrl!=""){
      samplerParams[Work.layer[i].instrument].loadByDefault=true;
      newInstru = true;
    };
  if (!newInstru) {
    Instruments.onDefaultLoaded();
    return;
  };
  Instruments.totalSamples = 0;
  Instruments.sampleLoaded = 0;
  for (var i=0; i<samplerParams.length; i++){
    if (!samplerParams[i].loadByDefault || samplerParams[i].baseUrl=="") 
      continue;
//    console.log("loading remote "+i);

    for (var j=0; j<Object.values(samplerParams[i].urls).length; j++){
      getVirtualURL(samplerParams[i].baseUrl
                    +Object.values(samplerParams[i].urls)[j], i, j);
      Instruments.totalSamples++;
    }
  };  
};

function getVirtualURL(url, instruId, noteId){
  //console.log("Downloading sample #"+instruId+" to cache...")
  fetch(new Request(url))
    .then((response) => {
      if (!response.ok) 
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.blob();
    })
    .then((response) => {

      samplesChanged = true;

      samplerParams[instruId].blobs[noteId]=response;

      samplerParams[instruId].vUrls[noteId]=URL.createObjectURL(response);

      Instruments.sampleLoaded++;

      Instruments.progress =Math.round(Instruments.sampleLoaded / Instruments.totalSamples *100);

      document.getElementById("splash_text").innerHTML = "LOADING "+Instruments.progress+"%";

      checkLoadStatus();
    });
};

function checkLoadStatus(){
  for (var i=0; i<samplerParams.length; i++) if (samplerParams[i].loadByDefault){
    for (var j=0; j<samplerParams[i].vUrls.length; j++)
      if (!(samplerParams[i].vUrls[j].length>0))
        return false;
  };
  console.log("all downloaded");
  for (var i=0; i<samplerParams.length; i++) if (samplerParams[i].loadByDefault)
    samplerParams[i].baseUrl="";
  Instruments.onDefaultLoaded();
}

var onDefaultLoaded=()=>{
//  Instruments.defaultLoaded = true;
  for (var i=0; i<samplerParams.length; i++) if (samplerParams[i].loadByDefault){
    samplerParams[i].baseUrl="";
    for (var j=0; j<samplerParams[i].vUrls.length; j++) {
      samplerParams[i].urls[Object.keys(samplerParams[i].urls)[j]]
        = samplerParams[i].vUrls[j];
    }
  } 

  if (samplesChanged) {
//    for (var i=0; i<samplerParams.length;i++) samplerParams[i].vUrls=[];
    db.put({key: "Samples", value: samplerParams});
  };

  for (var i=0; i<Work.layer.length; i++) 
    if (pianoroll.layer[i].instrument ==null
    || pianoroll.layer[i].instrument.instrumentName
    !=samplerParams[Work.layer[i].instrument].name) {
      newSampler(Work.layer[i].instrument, i);
    };

  Controls.hideWaiting();
}

      // save the virtual lnk's somewhere!!!
      // var s = new Tone.Sampler(
      //   {
      //   "C1":lnk, 
      //   "C2":lnk,
      //   "C3":lnk,
      // },function(){
      //   s.triggerAttack("C1");
      //   console.log("trigger");
      // },"").toDestination();

// Instruments.metronome = [
//   new Tone.Player(projectURL+"/sample/metronome/ding.mp3").connect(pianoroll.master.metro_vol),
//   new Tone.Player(projectURL+"/sample/metronome/da.mp3").connect(pianoroll.master.metro_vol),
// ];

// const drum1 = new Tone.MembraneSynth().connect(pianoroll.master.metro_vol);

const lowPass1 = new Tone.Filter({
  frequency: 15000,
}).connect(pianoroll.master.metro_vol);

const lowPass2 = new Tone.Filter({
  frequency: 7500,
}).connect(pianoroll.master.metro_vol);

const snareDrum1 = new Tone.NoiseSynth({
//  volume: 5,
  noise: {
    type: 'white',
//    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.20,
    sustain: 0.1,
    release: 0.02,
  },
}).connect(lowPass1);

const snareDrum2 = new Tone.NoiseSynth({
//  volume: 5,
  noise: {
    type: 'white',
//    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.20,
    sustain: 0.1,
    release: 0.02,
  },
}).connect(lowPass2);

// Instruments.bank=[];

// Instruments.releaseAll=()=>{
// 	for (var i=0; i<Instruments.bank.length; i++)
// 		for (var j=0; j<Instruments.bank[i].length; j++){
// 			Instruments.bank[i][j].inuse=0;
// 		};
// }

// ch: layer id; i: instrument (dropdown list) id
// Instruments.assignInstrument=(i, ch)=>{
// 	var spot=null;
// 	for (var j=0; j<Instruments.bank[i].length; j++) if (!Instruments.bank[i][j].inuse) { 
// 		spot=Instruments.bank[i][j];
// 		spot.inuse=1;
// 		spot.connect(pianoroll.layer[ch].channel);
// 		pianoroll.layer[ch].instrument=spot;
		
// 		if (Work.layer[ch].name=="New Layer") 
// 			document.getElementById("btn_layer_"+ch).innerHTML=samplerParams[i].name;

// 		Work.layer[ch].instrument=i;
// 		break; 
// 	};
// 	if (spot==null) {
// 		Instruments.newSampler1(i, ch);
// 	}
// }

// load a new instrument #i, save it to bank, and assign to layer(channel) #ch
var newSampler=(i, ch)=>{
	var s=new Tone.Sampler(
		samplerParams[i].urls,
		function(){
			// s.inuse=1;
			s.instrumentName=samplerParams[i].name;
			s.timeOffset=samplerParams[i].timeOffset;
      s.volumeCorrection=samplerParams[i].volumeCorrection;
      // Instruments.bank[i].push(s);

			pianoroll.layer[ch].instrument=s;
			pianoroll.layer[ch].instrument.connect(pianoroll.layer[ch].channel);
      pianoroll.layer[ch].meter = new Tone.Meter();
      pianoroll.layer[ch].meter.normalRange=1;
      pianoroll.layer[ch].channel.connect(pianoroll.layer[ch].meter);

//			if (Work.layer[ch].name=="New Layer") 
			//document.getElementById("btn_layer_"+ch).innerHTML=samplerParams[i].name;

			Work.layer[ch].instrument=i;						
		},
		samplerParams[i].baseUrl
	);
}

// Instruments.init=()=>{
// 	for (var i=0; i< samplerParams.length; i++) 
//     Instruments.bank.push([]);
// }

// Instruments.init();

// Instruments.drum1=drum1;
Instruments.drum2=snareDrum1;
Instruments.drum3=snareDrum2;

Instruments.refresh = refresh;

}())
