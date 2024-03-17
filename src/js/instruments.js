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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
    timeOffset: -0.1,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: false,
    volumeCorrection: 0,
    vUrls: [],
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
		timeOffset: -0.1,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
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
  {//17
		name: "Drum Set",
		timeOffset: -0.1,
    loadByDefault: true,
    volumeCorrection: 0,
    vUrls: [],
    urls: {    
      'C2': 'hihat.mp3',
      'C#2': 'kick.mp3',
      'D2': 'snare.mp3',
      'D#2': 'tom1.mp3',
      'E2': 'tom2.mp3',
      'F2': 'tom3.mp3',
      'F#2': 'extra1.mp3',
      'G2': 'extra2.mp3',
    
      'G#2': 'hihat.mp3',
      'A2': 'kick.mp3',
      'A#2': 'snare.mp3',
      'B2': 'tom1.mp3',
      'C3': 'tom2.mp3',
      'C#3': 'tom3.mp3',
      'D3': 'extra1.mp3',
      'D#3': 'extra2.mp3',
		},
		baseUrl: projectURL+"/sample/acoustic-kit/"    
  }
];
Instruments.samplerParams = samplerParams;
Instruments.defaultLoaded = false;
Instruments.onDefaultLoaded=()=>{console.log("all loaded")};

// init vUrls
for (var i=0; i<samplerParams.length; i++){
  for (var j=0; j < Object.values(samplerParams[i].urls).length; j++)
  samplerParams[i].vUrls.push("");
}

var updateSample = function(){
  var newInstru = false;
  for (var i=0; i<Work.layer.length; i++)
    if (Instruments.samplerParams[Work.layer[i].instrument].baseUrl!=""){
      Instruments.samplerParams[Work.layer[i].instrument].loadByDefault=true;
      newInstru = true;
      break;
    };
    
  if (!newInstru) {
    Instruments.onDefaultLoaded();
    return;
  };

  console.log("Downloading instruments to cache...")

  for (var i=0; i<samplerParams.length; i++){
    if (!samplerParams[i].loadByDefault || samplerParams[i].baseUrl=="") 
      continue;
//    console.log("loading remote "+i);
    for (var j=0; j<Object.values(samplerParams[i].urls).length; j++)
      getVirtualURL(samplerParams[i].baseUrl
                    +Object.values(samplerParams[i].urls)[j], i, j);
  };  
}
updateSample();

function getVirtualURL(url, instruId, noteId){
  fetch(new Request(url))
    .then((response) => {
      if (!response.ok) 
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.blob();
    })
    .then((response) => {
      samplerParams[instruId].vUrls[noteId]=URL.createObjectURL(response);
      checkLoadStatus();
    });
};

function checkLoadStatus(){
  for (var i=0; i<samplerParams.length; i++){
    if (!samplerParams[i].loadByDefault) continue;
    for (var j=0; j<samplerParams[i].vUrls.length; j++)
      if (samplerParams[i].vUrls[j].length==0)
        return false;
  };
  Instruments.defaultLoaded = true;
  for (var i=0; i<samplerParams.length; i++){
    if (!samplerParams[i].loadByDefault) continue;
    samplerParams[i].baseUrl="";

    for (var j=0; j<samplerParams[i].vUrls.length; j++) 
      samplerParams[i].urls[Object.keys(samplerParams[i].urls)[j]]
        =samplerParams[i].vUrls[j];
  } 
  Instruments.onDefaultLoaded();
}

Instruments.onDefaultLoaded=()=>{
  for (var i=0; i<Work.layer.length; i++) 
    if (pianoroll.layer[i].instrument ==null
    || pianoroll.layer[i].instrument.instrumentName
    !=Instruments.samplerParams[Work.layer[i].instrument].name) {
      Instruments.newSampler(Work.layer[i].instrument, i);
    };
  Controls.hideWaiting();
  console.log("Instruments loaded from cache.");
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
Instruments.newSampler=(i, ch)=>{
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

Instruments.updateSample=updateSample;

}())
