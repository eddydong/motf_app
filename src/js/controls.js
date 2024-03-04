var Controls= {};

(function(){

	Controls.tempDrag="";

	const default_params=[{"name":"Root Gen.","rhythm":"11111111","suggester":[{"d":0,"p":0},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":1},{"d":-2,"p":1},{"d":3,"p":0},{"d":-3,"p":0},{"d":4,"p":0},{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Bass Calm","rhythm":"random","suggester":[{"d":0,"p":0.8},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.5},{"d":-2,"p":0.5},{"d":3,"p":0.9},{"d":-3,"p":0.9},{"d":4,"p":0.4},{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.5"],["0","0.5"],["0","0.5"],["0","1"],["0","1"]]},{"name":"Bass Rhy.","rhythm":"random","suggester":[{"d":0,"p":0.5},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.5},{"d":-2,"p":0.5},{"d":3,"p":0.7},{"d":-3,"p":0.9},{"d":4,"p":0.8},{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.9"],["0.3","1"],["0.55","1"],["0","1"],["0","1"]]},{"name":"Melody 1","rhythm":"random","suggester":[{"d":0,"p":0.3},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.7},{"d":-2,"p":0.7},{"d":3,"p":0.6},{"d":-3,"p":0.7},{"d":4,"p":0.65},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.3},{"d":-7,"p":0}],"iparams":[["0","0.55"],["0","0.55"],["0.5","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Melody 2","rhythm":"random","suggester":[{"d":0,"p":0.3},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.7},{"d":-2,"p":0.7},{"d":3,"p":0.6},{"d":-3,"p":0.7},{"d":4,"p":0.65},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.3},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.85"],["0.25","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Melody 3","rhythm":"random","suggester":[{"d":0,"p":0.3},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.7},{"d":-2,"p":0.7},{"d":3,"p":0.6},{"d":-3,"p":0.7},{"d":4,"p":0.65},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.3},{"d":-7,"p":0}],"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Rhythm 1","rhythm":"random","suggester":[{"d":0,"p":0.95},{"d":1,"p":0.9},{"d":-1,"p":0.9},{"d":2,"p":0.8},{"d":-2,"p":0.8},{"d":3,"p":0.75},{"d":-3,"p":0.75},{"d":4,"p":0.25},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","0.55"],["0","0.7"],["0.4","1"],["0","0.55"],["0","1"],["0","1"]]},{"name":"Rhythm 2","rhythm":"random","suggester":[{"d":0,"p":0.95},{"d":1,"p":0.9},{"d":-1,"p":0.9},{"d":2,"p":0.8},{"d":-2,"p":0.8},{"d":3,"p":0.75},{"d":-3,"p":0.75},{"d":4,"p":0.25},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","0.55"],["0","0.7"],["0.4","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Arpeggio 1","rhythm":"11111111","suggester":[{"d":0,"p":0},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.4},{"d":-2,"p":0.4},{"d":3,"p":0.8},{"d":-3,"p":0.8},{"d":4,"p":0.7},{"d":-4,"p":0.15},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.4},{"d":-7,"p":0.45}],"iparams":[["0.3","1"],["0","1"],["0.2","1"],["1","1"],["1","1"],["0","1"]]},{"name":"Arpeggio 2","rhythm":"11111111","suggester":[{"d":0,"p":0.2},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.8},{"d":-2,"p":0.5},{"d":3,"p":0.7},{"d":-3,"p":0.95},{"d":4,"p":0.8},{"d":-4,"p":0.1},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0.3","1"],["0","0.7"],["0.35","1"],["0.65","1"],["0","1"],["0.65","1"]]}];

	var isWritingPreset=0;

	window.onkeydown=function(e){
		
 		if (document.activeElement.id=="input_rhythm" ||
 			document.activeElement.id=="input_bpm" ||
 			document.activeElement.id=="input_layer_name" ||
 			document.activeElement.id=="input_workname")
 			return;

		e.preventDefault();

		// Escape
		var isEscapeDown = false;
		if ("key" in e) {
			isEscapeDown = (e.key == "Escape" || e.key == "Esc");
		} else {
			isEscapeDown = (e.keyCode == 27);
		};
		
		// Space
		if (e.keyCode==32) Controls.spaceDown=true;

		// show foot panel		
// 		if (e.keyCode==82) {
// 			Global.showTemplate=1-Global.showTemplate;
// 			if (Global.showTemplate)
// 				document.querySelector("#div-root").style.display="block";
// 			else
// 				document.querySelector("#div-root").style.display="none";
// 			pianoroll.resize();
// 		};
		
		if (pianoroll.vKeyboardOn) {
			// Esc for abort
			if (isEscapeDown) {	
				document.getElementById("btn_esc").onclick();
				for (var i=0; i<pianoroll.layer.length; i++)
					pianoroll.layer[i].instrument.releaseAll();
			};		
					
			// Enter for PLAY
			if (e.keyCode==13){ // space
				if (pianoroll.isPlaying) document.getElementById("btn_stop").onclick();
				else document.getElementById("btn_play").onclick();
			};

			// Tab for scaledKeyboard
			if (e.keyCode==9) {
				Work.global.scaledKeyboard=1-Work.global.scaledKeyboard;
				pianoroll.autoZoom("y");
			};
		
			// K to toggle vKeyboard
			if (e.keyCode==75) {
				pianoroll.vKeyboardOn=1-pianoroll.vKeyboardOn;
			};

			vKeyboard.onkeydown(e);
			return;
		};
		
		if (e.metaKey) {
		
			// Meta(Cmd/Win) + Arrows: scrolling
			if (!pianoroll.isPlaying){
				if (e.keyCode == 37) pianoroll.scroll("beginning");
				if (e.keyCode == 39) pianoroll.scroll("end");
			};
			if (e.keyCode == 38) pianoroll.scroll("top");
			if (e.keyCode == 40) pianoroll.scroll("bottom");			
			
			// Cmd + C: copy
			if (e.keyCode == 67) pianoroll.copyNotes();

			// Cmd + V: paste
			if (!e.shiftKey && e.keyCode == 86) pianoroll.pasteNotes();

			// Cmd + Shift + C: paste insert
			if (e.shiftKey && e.keyCode == 86) pianoroll.pasteInsertNotes();

			// Cmd + X: cut
			if (e.keyCode == 88) pianoroll.cutNotes();		

			// Cmd+Shift+A: select all
			if (e.shiftKey && e.keyCode==65) {
				var last_through=Work.global.through;
				Work.global.through=1;
				pianoroll.selectAll(Work.global.through);
				Work.global.through=last_through;
			} else
			// Cmd+A: select all			
			if (e.keyCode == 65) pianoroll.selectAll(Work.global.through);
			
			// Cmd + Z: undo | Meta+Shift+Z: redo
			if (e.keyCode == 90 && !e.shiftKey) 
				pianoroll.undo();		
			if (e.keyCode == 90 && e.shiftKey) 
				pianoroll.redo();	
			
			// Cmd + S: save seq to local motf	
			if (e.keyCode == 83) pianoroll.saveToLocal();

			// Cmd + i for improvising (iSplit)
			if (e.keyCode==73) {
				pianoroll.rootSeeds=[];
				pianoroll.improviseX2("preset", 0);
				pianoroll.scroll("beginning");
				pianoroll.play();
			};
			
			if (e.keyCode==78) document.getElementById("btn_new").onclick();
			
		} else if (e.altKey){		
		
			// Alt(Option)+Arrows: adjust viewport size
// 			if (e.keyCode == 37) pianoroll.zoom("x-out");
// 			if (e.keyCode == 39) pianoroll.zoom("x-in");
// 			if (e.keyCode == 38) pianoroll.zoom("y-in");
// 			if (e.keyCode == 40) pianoroll.zoom("y-out");
			
			// Alt + Arrow Up / Down: Previous Layer / Next Layer
			if (e.keyCode == 38) Work.global.layer_sel--;
			if (e.keyCode == 40) Work.global.layer_sel++;	
			if (e.keyCode==38 || e.keyCode==40){	
				if (Work.global.layer_sel<0) Work.global.layer_sel=Work.layer.length-1;
				if (Work.global.layer_sel>Work.layer.length-1) Work.global.layer_sel=0;
				var ls = document.querySelectorAll(".layer-name");
				for (i=0; i<ls.length; i++) ls[i].style.background=Global.color.btn_inactive;
				ls[Work.global.layer_sel].style.background=Global.color.btn_active;
				pianoroll.autoZoom("y");
				if (!Work.global.through) pianoroll.updateChords();
			};
			
			let mw=Work.global.bpMeas / Work.global.bpNote * 16;
			if (pianoroll.selCount()>0){
				if (e.keyCode == 37) pianoroll.move("left",mw/96);
				if (e.keyCode == 39) pianoroll.move("right",mw/96);

				// "[" / "]" to adjust length of selected note
				if (e.keyCode == 219 || e.keyCode == 221){
					let nl = pianoroll.selectedNotes();
					for (let i=0; i<nl.length; i++) {
						let n=Work.global.seqXY[nl[i]];
						if (e.keyCode == 219 && n.d>mw/96) {
							n.d-=mw/96;
						};
						if (e.keyCode == 221 && n.d<64) {
							n.d+=mw/96;
						};
					};
					if (nl.length>0) {
						pianoroll.updateEndTick();
						pianoroll.historyPush("Length Adjust");			
					};
				};
			};

		} else if (e.shiftKey){
		
			// Shift + T / B / M: Tri-sect / Bi-sect / Merge
			if (e.keyCode == 84) { document.getElementById("btn_trisect").click(); };
			if (e.keyCode == 66) { document.getElementById("btn_bisect").click(); };
			if (e.keyCode == 77) { document.getElementById("btn_merge").click(); };			

			// Shift + arrow when there are notes selected: move to snaps
			let mw=Work.global.bpMeas / Work.global.bpNote * 16;
			if (pianoroll.selCount()>0){
				if (e.keyCode == 37) pianoroll.move("left",mw);
				if (e.keyCode == 39) pianoroll.move("right",mw);
				if (e.keyCode == 38) pianoroll.move("up",12);
				if (e.keyCode == 40) pianoroll.move("down",12);
			} else if (!pianoroll.isPlaying){
				// Shift + Arrow Left / Right: set Playhead to first tick of current / next measure
				if (e.keyCode == 37) {
					pianoroll.playhead = (Math.ceil(pianoroll.playhead / mw) - 1) * mw;
					if (pianoroll.playhead<0) pianoroll.playhead=0;
					if (pianoroll.playhead<pianoroll.viewportL)
						pianoroll.viewportL=pianoroll.playhead;					
				};
				if (e.keyCode == 39) {
					pianoroll.playhead= (Math.floor(pianoroll.playhead / mw) + 1) * mw;
					if (pianoroll.playhead>pianoroll.viewportL+pianoroll.viewportW-1)
						pianoroll.viewportL=pianoroll.playhead-pianoroll.viewportW+1;					
				};	
			};
		} else if (e.ctrlKey){
			// Ctrl + S to solo current layer
			if (e.keyCode == 83){
				Work.layer[Work.global.layer_sel].solo=1-Work.layer[Work.global.layer_sel].solo;
				pianoroll.layer[Work.global.layer_sel].channel.solo=Work.layer[Work.global.layer_sel].solo;			
				var lss=document.querySelectorAll(".solo");
				lss[Work.global.layer_sel].style.background= pianoroll.layer[Work.global.layer_sel].channel.solo ? Global.color.solo_active : Global.color.solo_inactive;
				var ms1 = document.querySelectorAll(".mute");
				for (j=0; j<ms1.length; j++) if (pianoroll.layer[j].channel.muted)
					ms1[j].style.background=Global.color.mute_active;
				else
					ms1[j].style.background=Global.color.mute_inactive;				
			};			
		} else { // when no func key is down
			// Esc for abort
			if (isEscapeDown) {	
				document.getElementById("btn_esc").onclick();
				for (var i=0; i<pianoroll.layer.length; i++)
					pianoroll.layer[i].instrument.releaseAll();
			};		
					
			// Enter for PLAY
			if (e.keyCode==13){
				if (pianoroll.isPlaying) document.getElementById("btn_stop").onclick();
				else document.getElementById("btn_play").onclick();
			};

			// Tab for scaledKeyboard
			if (e.keyCode==9) {
				Work.global.scaledKeyboard=1-Work.global.scaledKeyboard;
				pianoroll.autoZoom("y");
			};
		
			// K to toggle vKeyboard
			if (e.keyCode==75) {
				pianoroll.vKeyboardOn=1-pianoroll.vKeyboardOn;
			};
			
			// M for Metronome
			if (e.keyCode == 77) { 
				document.getElementById("btn_metronome").click();
			};			
			
			// X for ZoomX
			if (e.keyCode == 88) { 
				pianoroll.autoZoom("x");
			};			
						
			// Y for ZoomY
			if (e.keyCode == 89) { 
				pianoroll.autoZoom("y");
			};			
			
			// T for through
			if (e.keyCode == 84) { 
				Work.global.through=1-Work.global.through; 
				pianoroll.autoZoom("y");
				pianoroll.updateChords();
			};

			// C for showChord
			if (e.keyCode==67) {
				// Chord.print();
				pianoroll.autoSimpleChordByKey();
			};
			
			// S for showCanvas (Stroke)
			if (e.keyCode == 83){
				if (Work.global.showCanvas) canvas.hide();
				else canvas.show();
			};
			
			// H for random Chord generation
			if (e.keyCode==72) {
			//	Chord.update();
				pianoroll.updateChords();
			};

			// P for print stroke onto the scores
			if (e.keyCode==80) {
				canvas.print();
			};
						
			// R for showRhythm
			if (e.keyCode==82)
				Work.global.showRhythm=1-Work.global.showRhythm;
			
			// +/- for changing tempo
			if (e.keyCode==189){ // -
				pianoroll.tempo("down");
			};
			if (e.keyCode==187){ // +
				pianoroll.tempo("up");
			};
			
			// I for improvising (one layer only)
			if (e.keyCode==73) {
				pianoroll.rootSeeds=[];
				pianoroll.improvise({
					"rhythm":"11111111",
					"suggester":[{"d":0,"p":0},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0},
								{"d":-2,"p":0},{"d":3,"p":0},{"d":-3,"p":0},{"d":4,"p":0},
								{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],
					"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]],
					"chordOrScale": 0.5,  // 1 chord - 0 scale
					"melodayVariation": 0
				});				
// 				pianoroll.scroll("beginning");
// 				pianoroll.play();
			};			
			
			// Back_Del for delete note(s)
			if (e.keyCode == 8) 
				pianoroll.delNotes();	
				
			// Arrows for moving selected note(s)
			if (pianoroll.selCount()>0) {
				if (e.keyCode == 37) pianoroll.move("left",1);
				if (e.keyCode == 39) pianoroll.move("right",1);
				if (e.keyCode == 38) pianoroll.move("up",1);
				if (e.keyCode == 40) pianoroll.move("down",1);
	
				// "[" / "]" to adjust length of selected note
				if (e.keyCode == 219 || e.keyCode == 221){
					let nl = pianoroll.selectedNotes();
					for (let i=0; i<nl.length; i++) {
						let n=Work.global.seqXY[nl[i]];
						if (e.keyCode == 219 && n.d>1) {
							n.d--;
						};
						if (e.keyCode == 221 && n.d<64) {
							n.d++;
						};
					};
					if (nl.length>0) {
						pianoroll.updateEndTick();
						pianoroll.historyPush("Length Adjust");			
					};
				};
			} else if (!pianoroll.isPlaying && (e.keyCode==37 || e.keyCode==39)){
				if (e.keyCode == 37) { 
					pianoroll.playhead-=1; 
					if (pianoroll.playhead<0) pianoroll.playhead=0;
					if (pianoroll.playhead<pianoroll.viewportL)
						pianoroll.viewportL=pianoroll.playhead;					
				};
				if (e.keyCode == 39) {
					pianoroll.playhead+=1;
					if (pianoroll.playhead>pianoroll.viewportL+pianoroll.viewportW-1)
						pianoroll.viewportL=pianoroll.playhead-pianoroll.viewportW+1;					
				};
			}; 
			
			// 1..8 for adding new note
			// 192,49,50,51,51...: "`1234..."
			if (e.keyCode == 49) { pianoroll.setNewNote("16n"); };
			if (e.keyCode == 50) { pianoroll.setNewNote("8n"); };
			if (e.keyCode == 51) { pianoroll.setNewNote("4n"); };
			if (e.keyCode == 52) { pianoroll.setNewNote("2n"); };
			if (e.keyCode == 53) { pianoroll.setNewNote("1n"); };
			if (e.keyCode == 54) { pianoroll.setNewNote(Tone.Time("1n")*2); };
			if (e.keyCode == 55) { pianoroll.setNewNote(Tone.Time("1n")*4); };
			if (e.keyCode == 56) { pianoroll.setNewNote(Tone.Time("1n")*8); };
			// "`" for dotted note					
			if (e.keyCode == 192) { document.getElementById("btn_dot").click(); };
			
		};
	};
	
	window.onkeyup=function(e){
		if (pianoroll.vKeyboardOn) {
			vKeyboard.onkeyup(e);
			return;
		};
//		Controls.spaceDown=false;
	};
	
	window.onmouseup=(e)=>{
		Navbar.dragType="";
		Controls.tempDrag="";
	
		pianoroll.mouseDown=0;
		pianoroll.selX1=-1;
		pianoroll.selX2=-1;
		pianoroll.selY1=-1;
		pianoroll.selY1=-1;	

		document.querySelector("#canvas-nav").style.cursor="pointer";

	}
	
	
	Controls.btn_imp_1=document.getElementById("btn_imp_1");
	Controls.btn_save=document.getElementById("btn_save");
	Controls.btn_open=document.getElementById("btn_open");
	Controls.btn_new=document.getElementById("btn_new");
	Controls.btn_metronome=document.getElementById("btn_metronome");
	Controls.btn_imp_a=document.getElementById("btn_imp_a");
	Controls.input_suggester_nob=document.getElementById("input_suggester_nob");
	Controls.select_suggester=document.getElementById("select_suggester");
	Controls.input_min_0=document.getElementById("input_min_0");
	Controls.input_max_0=document.getElementById("input_max_0");
	Controls.input_min_1=document.getElementById("input_min_1");
	Controls.input_max_1=document.getElementById("input_max_1");
	Controls.input_min_2=document.getElementById("input_min_2");
	Controls.input_max_2=document.getElementById("input_max_2");
	Controls.input_min_3=document.getElementById("input_min_3");
	Controls.input_max_3=document.getElementById("input_max_3");
	Controls.input_min_4=document.getElementById("input_min_4");
	Controls.input_max_4=document.getElementById("input_max_4");
	Controls.input_min_5=document.getElementById("input_min_5");
	Controls.input_max_5=document.getElementById("input_max_5");
	Controls.btn_imp_0=document.getElementById("btn_imp_0");
	Controls.btn_imp_1=document.getElementById("btn_imp_1");
	Controls.btn_imp_2=document.getElementById("btn_imp_2");
	Controls.btn_imp_3=document.getElementById("btn_imp_3");
	Controls.btn_imp_4=document.getElementById("btn_imp_4");
	Controls.btn_imp_5=document.getElementById("btn_imp_5");
	Controls.btn_imp_6=document.getElementById("btn_imp_6");
	Controls.btn_imp_7=document.getElementById("btn_imp_7");
	Controls.btn_imp_8=document.getElementById("btn_imp_8");
	Controls.btn_imp_9=document.getElementById("btn_imp_9");

	function updatePresets(){
		for (var i=0;i<10;i++) {
			var c= (i==Work.global.imp_pre_sel) ? "#bb33bb" : "#666666";
			document.getElementById("btn_imp_"+i).style.background=c;
		};
		fromPreset();
	}
		
	Controls.btn_imp_0.onclick=()=>{
		Work.global.imp_pre_sel=0;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_1.onclick=()=>{
		Work.global.imp_pre_sel=1;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_2.onclick=()=>{
		Work.global.imp_pre_sel=2;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_3.onclick=()=>{
		Work.global.imp_pre_sel=3;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_4.onclick=()=>{
		Work.global.imp_pre_sel=4;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_5.onclick=()=>{
		Work.global.imp_pre_sel=5;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_6.onclick=()=>{
		Work.global.imp_pre_sel=6;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_7.onclick=()=>{
		Work.global.imp_pre_sel=7;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_8.onclick=()=>{
		Work.global.imp_pre_sel=8;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_9.onclick=()=>{
		Work.global.imp_pre_sel=9;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	
//	Controls.btn_imp_0.onclick();	

	window.onscroll = (e) => { e.preventDefault(); window.scroll(0, 0); };
	window.oncontextmenu=function(){ return false; };
	window.onresize = () => { 
		Navbar.resize();
 		pianoroll.resize();
 		canvas.resize();
	};
						
	Controls.btn_save.onclick=()=>{
		pianoroll.saveToLocal();
	};
	
	// local .motf file loader
	var fileloader1 = document.body.appendChild(document.createElement("input"));
	fileloader1.type = "file";
	fileloader1.accept = ".motf";
	fileloader1.style.display ="none";
	fileloader1.onchange=(e)=>{
		var selectedFile = e.target.files[0];
		var name = selectedFile.name;
		var size = selectedFile.size;
		var reader = new FileReader();
		reader.readAsText(selectedFile);
		e.target.value="";		
		
		reader.onload = function(){
			var res=this.result;

//			res=unzip(res);
		
			Work = JSON.parse(res);
			pianoroll.historyPush("Open motf File");
			pianoroll.updateEndTick();
			pianoroll.updateChords();
			pianoroll.autoZoom();
			pianoroll.scroll("beginning");
			Composer.init();
			init();
		};			
	}
	Controls.btn_open.onclick=()=>{
		pianoroll.stop();
		fileloader1.click();
	};
	
	// local .mid file loader
	var fileloader2 = document.body.appendChild(document.createElement("input"));
	fileloader2.type = "file";
	fileloader2.accept = ".mid";
	fileloader2.style.display ="none";
	fileloader2.onchange=(e)=>{
		var file = e.target.files[0];
		Importer.parseFile(file);	
		e.target.value="";		
	}

	document.querySelector("#btn_import").onclick=()=>{
		pianoroll.stop();
		fileloader2.click();
	};
	
	document.querySelector("#btn_export").onclick=()=>{
		Importer.exportMidi(Work);
	};
	
	Controls.btn_new.onclick=()=>{
		pianoroll.stop();
		Work=copyObj(newWork);
//		Work.global.chord=[];
		pianoroll.chord=[];
//		Global.XYtoIJ();
		pianoroll.autoZoom();
		Composer.init();
		init();
		pianoroll.historyPush("New");
		Controls.saveTemp();
	};
	
	Controls.btn_metronome.style.background="#bb33bb";
	Controls.btn_metronome.onclick=()=>{
		Work.global.metronome=1-Work.global.metronome;
		Controls.btn_metronome.style.background=
			(Work.global.metronome==1) ? "#bb33bb" : "#666666";
	};	
	
// 	Controls.btn_imp_a.style.background="#666666";
// 	Controls.btn_imp_a.onclick=()=>{
// 		if (Global.imp_a===1) Global.imp_a=0; else Global.imp_a=1;
// 		Controls.btn_imp_a.style.background=
// 			(Global.imp_a==1) ? "#bb33bb" : "#666666";
// 	};	
	
	// foot zone init
	
	Controls.input_suggester_nob.oninput=()=>{
		var sug=Controls.select_suggester;
		sug.options[sug.selectedIndex].innerHTML=sug.options[sug.selectedIndex].innerHTML.substring(0,8)
			+ parseFloat(Controls.input_suggester_nob.value).toFixed(2);
			
		var comp=0;
		for (var j=0; j<13; j++){
			var v=parseFloat(document.getElementById("select_suggester").options[j].innerHTML.substring(8));
			Controls.params.suggester[j].p=parseFloat(v);
			comp+=v;
		};	
		document.getElementById("label_comp").innerHTML=comp.toFixed(1);
		document.getElementById("label_comp").style.background=
			"rgba("+(255*comp/10)+","+(180*(10-comp)/10)+","+(30*(10-comp)/10)+",1)";			
	};

	Controls.select_suggester.onchange=()=>{
		Controls.input_suggester_nob.value=
			Controls.select_suggester.value.substring(8);
	};

	Controls.input_max_0.oninput=()=>{
		var opposite=Controls.input_min_0;
		if (Controls.input_max_0.value<opposite.value)
			opposite.value=Controls.input_max_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[0][0]=parseFloat(Controls.input_min_0.value);
		Controls.params.iparams[0][1]=parseFloat(Controls.input_max_0.value);
	};
	Controls.input_min_0.oninput=()=>{
		var opposite=Controls.input_max_0;
		if (Controls.input_min_0.value>opposite.value)
			opposite.value=Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[0][0]=parseFloat(Controls.input_min_0.value);
		Controls.params.iparams[0][1]=parseFloat(Controls.input_max_0.value);
	};
	Controls.input_max_1.oninput=()=>{
		var opposite=Controls.input_min_1;
		if (Controls.input_max_1.value<opposite.value)
			opposite.value=Controls.input_max_1.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[1][0]=parseFloat(Controls.input_min_1.value);
		Controls.params.iparams[1][1]=parseFloat(Controls.input_max_1.value);
	};
	Controls.input_min_1.oninput=()=>{
		var opposite=Controls.input_max_1;
		if (Controls.input_min_1.value>opposite.value)
			opposite.value=Controls.input_min_1.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[1][0]=parseFloat(Controls.input_min_1.value);
		Controls.params.iparams[1][1]=parseFloat(Controls.input_max_1.value);
	};
	Controls.input_max_2.oninput=()=>{
		var opposite=Controls.input_min_2;
		if (Controls.input_max_2.value<opposite.value)
			opposite.value=Controls.input_max_2.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[2][0]=parseFloat(Controls.input_min_2.value);
		Controls.params.iparams[2][1]=parseFloat(Controls.input_max_2.value);
	};
	Controls.input_min_2.oninput=()=>{
		var opposite=Controls.input_max_2;
		if (Controls.input_min_2.value>opposite.value)
			opposite.value=Controls.input_min_2.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[2][0]=parseFloat(Controls.input_min_2.value);
		Controls.params.iparams[2][1]=parseFloat(Controls.input_max_2.value);
	};
	Controls.input_max_3.oninput=()=>{
		var opposite=Controls.input_min_3;
		if (Controls.input_max_3.value<opposite.value)
			opposite.value=Controls.input_max_3.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[3][0]=parseFloat(Controls.input_min_3.value);
		Controls.params.iparams[3][1]=parseFloat(Controls.input_max_3.value);
	};
	Controls.input_min_3.oninput=()=>{
		var opposite=Controls.input_max_3;
		if (Controls.input_min_3.value>opposite.value)
			opposite.value=Controls.input_min_3.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[3][0]=parseFloat(Controls.input_min_3.value);
		Controls.params.iparams[3][1]=parseFloat(Controls.input_max_3.value);
	};
	Controls.input_max_4.oninput=()=>{
		var opposite=Controls.input_min_4;
		if (Controls.input_max_4.value<opposite.value)
			opposite.value=Controls.input_max_4.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[4][0]=parseFloat(Controls.input_min_4.value);
		Controls.params.iparams[4][1]=parseFloat(Controls.input_max_4.value);
	};
	Controls.input_min_4.oninput=()=>{
		var opposite=Controls.input_max_4;
		if (Controls.input_min_4.value>opposite.value)
			opposite.value=Controls.input_min_4.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[4][0]=parseFloat(Controls.input_min_4.value);
		Controls.params.iparams[4][1]=parseFloat(Controls.input_max_4.value);
	};
	Controls.input_max_5.oninput=()=>{
		var opposite=Controls.input_min_5;
		if (Controls.input_max_5.value<opposite.value)
			opposite.value=Controls.input_max_5.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[5][0]=parseFloat(Controls.input_min_5.value);
		Controls.params.iparams[5][1]=parseFloat(Controls.input_max_5.value);
	};
	Controls.input_min_5.oninput=()=>{
		var opposite=Controls.input_max_5;
		if (Controls.input_min_5.value>opposite.value)
			opposite.value=Controls.input_min_5.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[5][0]=parseFloat(Controls.input_min_5.value);
		Controls.params.iparams[5][1]=parseFloat(Controls.input_max_5.value);
	};

	document.getElementById("input_bpm").onchange=()=>{
		Tone.Transport.bpm.rampTo(document.getElementById("input_bpm").value);
		Work.global.bpm=document.getElementById("input_bpm").value;
	}
	
//	window.onload=()=>{
		var b=whichBrowser();
		if (b!="Safari" && b!="Chrome") document.getElementById("splash_text").innerHTML="Sorry<br>Please Use Safari or Chrome.";
	
//	}
	
	document.getElementById("btn_fit_xy").onclick=()=>{ 
		pianoroll.autoZoom("xy"); 
	};
	
	document.getElementById("btn_fit_x").onclick=()=>{ 
		pianoroll.autoZoom("x"); 
	};
	
	document.getElementById("btn_fit_y").onclick=()=>{ 
		pianoroll.autoZoom("y"); 
	};
	
	document.getElementById("btn_begin").onclick=()=>{ 
		pianoroll.scroll("beginning");
	};
	
	document.getElementById("btn_end").onclick=()=>{ 
		pianoroll.scroll("end"); 
	};
	
	document.getElementById("btn_play").onclick=()=>{ 
		pianoroll.play(); 
		var c;
		if (pianoroll.isPlaying) c="#bb33bb"; else c="#666666";
		document.getElementById("btn_play").style.background=c;
	};

	document.getElementById("btn_stop").onclick=()=>{ 
		pianoroll.stop(); 
		var c;
		if (pianoroll.isPlaying) c="#bb33bb"; else c="#666666";
		document.getElementById("btn_play").style.background=c;
	};
	
	function fromPreset(){
		for (var i=0; i<10; i++){
			document.getElementById("btn_imp_"+i).innerHTML=
				Work.global.imp_pre[i].name;
		};
		
		document.getElementById("input_rhythm").value=
			Work.global.imp_pre[Work.global.imp_pre_sel].rhythm;
		document.getElementById("input_rhythm").style.background="#666666";
		document.getElementById("input_rhythm").style.color="#ffffff";
		
		var comp=0;
		for (var j=0; j<13; j++){
			var s=document.getElementById("select_suggester").options[j].innerHTML;
			document.getElementById("select_suggester").options[j].innerHTML
			=s.substring(0,8)+Work.global.imp_pre[Work.global.imp_pre_sel].suggester[j].p.toFixed(2);
			comp+=Work.global.imp_pre[Work.global.imp_pre_sel].suggester[j].p;
		};	
		Controls.input_suggester_nob.value=
			Controls.select_suggester.value.substring(8);

		document.getElementById("label_comp").innerHTML=comp.toFixed(1);
		document.getElementById("label_comp").style.background=
			"rgba("+(255*comp/10)+","+(180*(10-comp)/10)+","+(30*(10-comp)/10)+",1)";
		
		for (var j=0; j<6; j++){
			document.getElementById("input_min_"+j).value=
				Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][0];
			document.getElementById("input_max_"+j).value=
				Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][1];
		};	
		
		Controls.params=copyObj(Work.global.imp_pre[Work.global.imp_pre_sel]);
	};
	
	
	// validate input_rhythm
	document.getElementById("input_rhythm").onchange=(e)=>{
		var legal=1;

		var v=document.getElementById("input_rhythm").value;
		
		v=v.trim();
		
		if (v.toLowerCase()!="random" && v.toLowerCase()!="") {

			for (var i=0; i<v.length; i++) {
				if (v[i]!="1" && v[i]!="2" && v[i]!="3"
				&& v[i]!="4" && v[i]!="5" && v[i]!="6"
				&& v[i]!="7" && v[i]!="8") legal=0;
				break;
			};
			
			if (legal===1) {
				var sum=0;
				for (var i=0; i<v.length; i++) sum+=parseInt(v[i]);
				if (sum!=8) legal=0;
			};
		};

		if (legal===1){
			if (v=="") v="random";
			Controls.params.rhythm=v;
			document.getElementById("btn_apply_preset").focus();
		} else document.getElementById("input_rhythm").value="";
	
	};
	
	document.getElementById("input_rhythm").onfocus=()=>{
		document.getElementById("input_rhythm").style.background="#ffffff";
		document.getElementById("input_rhythm").style.color="#000000";
	}
	
	document.getElementById("input_rhythm").onblur=()=>{
		if (document.getElementById("input_rhythm").value.trim()=="")
			document.getElementById("input_rhythm").value="random";
		document.getElementById("input_rhythm").style.background="#666666";
		document.getElementById("input_rhythm").style.color="#ffffff";
	}

	document.getElementById("btn_write_preset").onclick=()=>{
		isWritingPreset=1;
		for (var i=0; i<10; i++)
		document.getElementById("btn_imp_"+i).style.background="#003300";
		document.getElementById("btn_imp_"+Work.global.imp_pre_sel).style.background="#118811";
	};

	document.getElementById("btn_apply_preset").onclick=()=>{
		pianoroll.improvise("preset");
	};

// 	document.getElementById("btn_auto_imp").onclick=()=>{
// 		pianoroll.improvise("automation");
// 	};

	document.getElementById("btn_esc").onclick=()=>{
		pianoroll.stop();
		pianoroll.newNote=null;
		pianoroll.deSelectAll();
		isWritingPreset=0;
		updatePresets();
		document.getElementById("btn_play").style.background="#666666";
	};
	
	function writePreset(){
// 		Work.global.imp_pre[Work.global.imp_pre_sel].rhythm=
// 			document.getElementById("input_rhythm").value;
// 		if (Work.global.imp_pre[Work.global.imp_pre_sel].rhythm=="")
// 			Work.global.imp_pre[Work.global.imp_pre_sel].rhythm="random";
// 
// 		for (var j=0; j<13; j++){		
// 			Work.global.imp_pre[Work.global.imp_pre_sel].suggester[j].p=
// 			parseFloat(document.getElementById("select_suggester").options[j].innerHTML.substring(8));
// 		};	
// 		
// 		for (var j=0; j<6; j++){
// 			Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][0]=
// 				parseFloat(document.getElementById("input_min_"+j).value);
// 			Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][1]=
// 				parseFloat(document.getElementById("input_max_"+j).value);
// 		};	

		Work.global.imp_pre[Work.global.imp_pre_sel]=copyObj(Controls.params);

		isWritingPreset=0;
	}
	
	function clearDragBtns(){
		for (var j=0; j<6; j++) 
			document.getElementById("btn_drag_"+j).style.background="#666666";
	};
		
	document.getElementById("btn_drag_0").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="audi";
		document.getElementById("btn_drag_0").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_1").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="pan";
		document.getElementById("btn_drag_1").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_2").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="zoom";
		document.getElementById("btn_drag_2").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_3").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="rect";
		document.getElementById("btn_drag_3").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_4").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="span";		
		document.getElementById("btn_drag_4").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_5").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="meas";		
		document.getElementById("btn_drag_5").style.background="#bb33bb";
	}
	
	document.getElementById("select_key").oninput=()=>{
		Work.global.key=document.getElementById("select_key").selectedIndex;
		Composer.init();
		pianoroll.autoZoom('y');
	}
	
	document.getElementById("select_scale").oninput=()=>{
		Work.global.scale_id=document.getElementById("select_scale").selectedIndex;
		Composer.init();
		pianoroll.autoZoom('y');
	}
		
	document.getElementById("input_workname").onchange=()=>{
		document.getElementById("btn_save").focus();
		Work.global.workname=document.getElementById("input_workname").value.trim();
	}
	
	document.getElementById("input_master_volume").oninput=()=>{
		Work.global.volume=document.getElementById("input_master_volume").value;
		pianoroll.master.volume.volume.value = document.getElementById("input_master_volume").value;
	}
	
	document.getElementById("input_master_roomsize").oninput=()=>{
		Work.global.roomsize=document.getElementById("input_master_roomsize").value;
		pianoroll.master.reverb.decay = document.getElementById("input_master_roomsize").value;
	}	
	
	document.getElementById("input_metro_volume").oninput=()=>{
		Work.global.metro_vol=document.getElementById("input_metro_volume").value;
		pianoroll.master.metro_vol.volume.value = document.getElementById("input_metro_volume").value;
	}	
	
	document.getElementById("input_rhythm_volume").oninput=()=>{
		Work.global.rhythm_vol=document.getElementById("input_rhythm_volume").value;
		pianoroll.master.rhythm_vol.volume.value = document.getElementById("input_rhythm_volume").value;
	}	
	
	document.getElementById("input_human_vel").oninput=()=>{
		Work.global.human_vel=document.getElementById("input_human_vel").value;
	}	
	
	document.getElementById("input_human_tem").oninput=()=>{
		Work.global.human_tem=document.getElementById("input_human_tem").value;
	}	
	
// 	document.getElementById("btn_improvise_pannel").onclick=()=>{
// 		if (document.getElementById("bottom-bar-group").style.display=="block"){
// 			document.getElementById("btn_improvise_pannel").style.background="#666666";
// 			document.getElementById("bottom-bar-group").style.display="none";
// 			pianoroll.resize();
// 		} else {
// 			document.getElementById("btn_improvise_pannel").style.background="#bb33bb";
// 			document.getElementById("bottom-bar-group").style.display="block";
// 			pianoroll.resize();
// 		}
// 	};
	
	document.getElementById("btn_through").onclick=()=>{
		if (Work.global.through == null) Work.global.through=0;
		Work.global.through=1-Work.global.through;
		document.getElementById("btn_through").style.background=
		Work.global.through===1 ? "#bb33bb" : "#666666";
	}

	document.getElementById("btn_magnet").onclick=()=>{
		if (Work.global.magnet == null) Work.global.magnet=0;
		Work.global.magnet=1-Work.global.magnet;
		document.getElementById("btn_magnet").style.background=
		Work.global.magnet===1 ? "#bb33bb" : "#666666";
	}

	document.getElementById("btn_select_all").onclick=()=>{
		pianoroll.selectAll(Work.global.through);
	}

	document.getElementById("btn_undo").onclick=()=>{
		pianoroll.undo();
	}

	document.getElementById("btn_redo").onclick=()=>{
		pianoroll.redo();
	}
	
	document.getElementById("btn_trisect").onclick=()=>{
		pianoroll.trisect();
	}

	document.getElementById("btn_bisect").onclick=()=>{
		pianoroll.bisect();
	}

	document.getElementById("btn_merge").onclick=()=>{
		pianoroll.merge();
	}

	document.getElementById("btn_x2").onclick=()=>{
		pianoroll.newNote=Tone.Time(pianoroll.newNote)*2;
		if (pianoroll.newNote>Tone.Time("1n"*8))
		pianoroll.newNote=Tone.Time("1n"*8);
	}

	document.getElementById("btn_/2").onclick=()=>{
		pianoroll.newNote=Tone.Time(pianoroll.newNote)/2;
		if (pianoroll.newNote<Tone.Time("64n"))
		pianoroll.newNote=Tone.Time("64n");
	}

	document.getElementById("btn_dot").onclick=()=>{
		Global.dotted=1-Global.dotted;
		document.getElementById("btn_dot").style.background=
		Global.dotted==1 ? "#bb33bb" : "#666666";
		if (pianoroll.newNote!=null) pianoroll.newNote=
		Global.dotted ?
		Tone.Time(pianoroll.newNote)*1.5 : Tone.Time(pianoroll.newNote)/1.5;
	}

	document.getElementById("btn_new_note").onclick=()=>{
//		pianoroll.setNewNote(Math.pow(2,document.getElementById("select_new_note_length").options.selectedIndex));
		var n=document.getElementById("select_new_note_length").value
		if (Global.dotted) n=n+"."; else
		if (Global.triplet) n=n.substring(0,n.length-1)+"t";
		console.log(n);
		pianoroll.setNewNote(n);
	}

	document.getElementById("select_new_note_length").oninput=()=>{
		if (pianoroll.newNote!=null)
			pianoroll.setNewNote(Math.pow(2,document.getElementById("select_new_note_length").options.selectedIndex));
	}
	
	document.querySelector("#select_bpMeas").oninput=()=>{
		Work.global.bpMeas=parseInt(document.querySelector("#select_bpMeas").value);
		pianoroll.autoZoom();
	}
	
	document.querySelector("#select_bpNote").oninput=()=>{
		Work.global.bpNote=parseInt(document.querySelector("#select_bpNote").value);
		pianoroll.autoZoom();
	}

	document.querySelector("#btn_add_layer").onclick=()=>{
		Work.layer.push(copyObj(newWork.layer[0]));
		init();
		pianoroll.historyPush("Before Add Layer");

		var ls = document.querySelectorAll(".layer-name");
		for (i=0; i<ls.length; i++) ls[i].style.background=Global.color.btn_inactive;
		Work.global.layer_sel=ls.length-1;
		ls[ls.length-1].style.background=Global.color.btn_active;
	};
	
	// record current project and save to local webm file 
	// use convertio.co to convert webm file to wav/mp3
	document.querySelector("#btn_render").onclick=()=>{
		pianoroll.record();
	};
	
	document.querySelector("#btn_detectKeyScale").onclick=()=>{
		pianoroll.detectKeyScale();
	};
	
Controls.saveTemp=function(){
    try {
		window.localStorage.setItem("tempwork", JSON.stringify(Work));
    } catch(e) {
    	// error means local storage is full...
		window.localStorage.clear();
		window.localStorage.setItem("tempwork", JSON.stringify(Work));
    }
}
	
Controls.loadTemp=function(){
	var work = JSON.parse(window.localStorage.getItem("tempwork"));
	if (work) {
		Work=work;
		pianoroll.historyPush("Open motf File");
		pianoroll.updateEndTick();
		pianoroll.updateChords();
		pianoroll.autoZoom();
		pianoroll.scroll("beginning");
		Composer.init();
		init();
	};
}

function init(){
	
		Instruments.releaseAll();
			
		Work.global.imp_pre=default_params;
		
//		Work.global.layer_sel=0;
		
		updatePresets();

		document.getElementById("btn_imp_"+Work.global.imp_pre_sel).onclick();

		// a real-time image of the param panel settings
		Controls.params=copyObj(Work.global.imp_pre[Work.global.imp_pre_sel]);
		
		document.getElementById("btn_metronome").style.background= Work.global.metronome==1 ?
			Global.color.btn_active:Global.color.btn_inactive;
	
//		document.getElementById("btn_drag_0").onclick();
		
		document.querySelector("#div-layer-container").innerHTML="";	

		// dispose all channels manually or otherwise they still live in background and creates volume overlap		
 		for (var i=0; i<pianoroll.layer.length; i++) pianoroll.layer[i].channel.dispose();		
		pianoroll.layer=[];

		for (var i=0; i<Work.layer.length; i++){
				
			document.querySelector("#div-layer-container").innerHTML+="<span><button class=\"mute\" data-i="+i+">M</button></span><span><button class=\"solo\" data-i="+i+">S</button></span><span><button id=\"btn_layer_"+i+"\" class= \"layer-name\" data-i="+i+">"+Work.layer[i].name+"</button></span><span><select id=\"select_instrument_"+i+"\" class=\"select_instrument\" data-i="+i+"></select></span><span>Vol<input class=\"input_layer_volume\" data-i="+i+" type=\"range\" min=-30 max=10 step=1 value="+Work.layer[i].volume+"></input></span><span>Pan<input class=\"input_layer_pan\" data-i="+i+" type=\"range\" min=-1 max=1 step=0.1 value="+Work.layer[i].pan+"></input></span><span><button class=\"layer-del\" data-i="+i+">Del</button></span><br>";
			
			pianoroll.layer.push({
				channel: new Tone.Channel(0,0).connect(pianoroll.master.reverb),
				instrument:null
			});
		};	

		var lnsp=document.querySelectorAll("#div-layer-container span");
		for (var i=0; i<lnsp.length; i++) {
			lnsp[i].setAttribute("style", "margin-left: 6px;");
		};

		var lns=document.querySelectorAll(".layer-name");
		for (var i=0; i<lns.length; i++) 
		lns[i].onclick=(e)=>{
			for (i=0; i<lns.length; i++) lns[i].style.background=Global.color.btn_inactive;
			Work.global.layer_sel=parseInt(e.target.dataset.i);
			e.target.style.background=Global.color.btn_active;
		};

		var sis=document.querySelectorAll(".select_instrument");
		for (var i=0; i<sis.length; i++) {
			for (var j=0; j<Instruments.samplerParams.length; j++){
				var opt=document.createElement("option");
				opt.innerHTML=Instruments.samplerParams[j].name;
				sis[i].appendChild(opt);
			};			
			sis[i].onchange=(e)=>{
				pianoroll.stop();
				showWaiting();
				Work.layer[e.target.dataset.i].instrument=e.target.selectedIndex;
				init();
				Controls.saveTemp();						
			};
		};

		var lvs=document.querySelectorAll(".input_layer_volume");
		for (var i=0; i<lvs.length; i++) lvs[i].oninput=(e)=>{
			Work.layer[e.target.dataset.i].volume=parseInt(e.target.value);
			pianoroll.layer[e.target.dataset.i].channel.volume.value=parseInt(e.target.value);
			Controls.saveTemp();
		};
		
		var lps=document.querySelectorAll(".input_layer_pan");
		for (var i=0; i<lps.length; i++) lps[i].oninput=(e)=>{
			Work.layer[e.target.dataset.i].pan=parseInt(e.target.value);
			pianoroll.layer[e.target.dataset.i].channel.pan.value=parseInt(e.target.value);
			Controls.saveTemp();
		};
		
		var lds=document.querySelectorAll(".layer-del");
		for (var i=0; i<lds.length; i++) lds[i].onclick=(e)=>{
			pianoroll.layer[e.target.dataset.i].channel.solo=0;		
			
			var ii=parseInt(e.target.dataset.i);
			var tempSeq=[];
			for (var j=0; j<Work.global.seqXY.length; j++)
				if (Work.global.seqXY[j].l!=ii)
					tempSeq.push(copyObj(Work.global.seqXY[j]));
			Work.global.seqXY=tempSeq;
					
			for (var j=0; j<Work.global.seqXY.length; j++)
				if (Work.global.seqXY[j].l>ii)
					Work.global.seqXY[j].l--;
					
			Work.layer.splice(ii, 1);
			pianoroll.layer.splice(ii, 1);

			if (Work.global.layer_sel>=Work.layer.length) Work.global.layer_sel=0;

			Global.XYtoIJ();
			
			init();

			pianoroll.historyPush("Delete Layer");
			Controls.saveTemp();			
		};
		
		if (Work.layer.length<2) 
			document.querySelector(".layer-del").style.display="none";
		else
			document.querySelector(".layer-del").style.display="display";
		
		var lms=document.querySelectorAll(".mute");
		for (var i=0; i<lms.length; i++) 
		lms[i].onclick=(e)=>{
			pianoroll.layer[e.target.dataset.i].channel.mute = 1-pianoroll.layer[e.target.dataset.i].channel.muted;
			e.target.style.background= pianoroll.layer[e.target.dataset.i].channel.muted ? Global.color.mute_active : Global.color.mute_inactive;
		};
		
		var lss=document.querySelectorAll(".solo");
		for (var i=0; i<lss.length; i++) 
		lss[i].onclick=(e)=>{
			pianoroll.layer[e.target.dataset.i].channel.solo = 1-pianoroll.layer[e.target.dataset.i].channel.solo;
			e.target.style.background= pianoroll.layer[e.target.dataset.i].channel.solo ? Global.color.solo_active : Global.color.solo_inactive;
			var ms1 = document.querySelectorAll(".mute");
			for (j=0; j<ms1.length; j++) if (pianoroll.layer[j].channel.muted)
				ms1[j].style.background=Global.color.mute_active;
			else
				ms1[j].style.background=Global.color.mute_inactive;	
		};
		
//		document.querySelector(".layer-name").click();
		
		// preload instrument for each layer
		
		if (Instruments.defaultLoaded){
			showWaiting();
			Instruments.onDefaultLoaded();
		}

		for (var i=0; i<sis.length; i++) {
			sis[i].selectedIndex=Work.layer[i].instrument;
		};
		
		document.getElementById("select_key").selectedIndex=Work.global.key;
		document.getElementById("select_scale").selectedIndex=Work.global.scale_id;
		
		var k=-1;
		var ss=document.getElementById("select_bpMeas");
		for (var i=0; i<ss.options.length; i++)
			if (ss.options[i].innerHTML==Work.global.bpMeas) {
				k=i;
				break;
			};
		ss.selectedIndex=k;

		var k=-1;
		var ss=document.getElementById("select_bpNote");
		for (var i=0; i<ss.options.length; i++)
			if (ss.options[i].innerHTML==Work.global.bpNote) {
				k=i;
				break;
			};
		ss.selectedIndex=k;

// 		Work.global.seqIJ=Importer.seq;
// 		pianoroll.updateEndTick();
// 		Work.global.bpm=Math.round(Work.global.seqXY.bpm);

		document.getElementById("input_bpm").value=Work.global.bpm;
		Tone.Transport.bpm.value=Work.global.bpm;

		pianoroll.master.volume.volume.value=Work.global.volume;
		document.getElementById("input_master_volume").value=Work.global.volume;

		pianoroll.master.reverb.decay=Work.global.roomsize;
		document.getElementById("input_master_roomsize").value=Work.global.roomsize;

		pianoroll.master.metro_vol.volume.value=Work.global.metro_vol;
		document.getElementById("input_metro_volume").value=Work.global.metro_vol;

		pianoroll.master.rhythm_vol.volume.value=Work.global.rhythm_vol;
		document.getElementById("input_rhythm_volume").value=Work.global.rhythm_vol;

		document.getElementById("input_human_vel").value=Work.global.human_vel;
		document.getElementById("input_human_tem").value=Work.global.human_tem;
		
		document.getElementById("input_workname").value=Work.global.workname;
		
		document.getElementById("select_new_note_length").options.selectedIndex=2;
	
		lns[0].click();	
};

function showWaiting(){
	document.getElementById("mask").style.display="block";
	document.getElementById("splash_text").style.display="block";

		Tone.loaded().then(()=>{
//			console.log("all loaded");
			hideWaiting();	
		});

}

function hideWaiting(){
	document.getElementById("mask").style.display="none";
	document.getElementById("splash_text").style.display="none";
}

// fullscreen on/off only works upon user interaction
var elem = document.documentElement;
function openFullscreen() { 
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

// var node;
// var rotation = 0;
// var gestureStartRotation = 0;
// var gestureStartScale = 0;
// var startX;
// var startY;

var posX = 0;
var posY = 0;
var startScale;

Controls.zoom=1;
	
pianoroll.canvas.addEventListener('wheel', (e) => {
	e.preventDefault();
//	if (e.shiftKey) return;
	if (e.metaKey && pianoroll.selCount()>0) {
		posX -= e.deltaX * 2;
		posY -= e.deltaY * 2;
		pianoroll.adjustVel(e.deltaY);
	} else if (e.shiftKey) {  // zoom
		pianoroll.viewportH = (pianoroll.viewportH 
							- e.deltaY/(pianoroll.height/pianoroll.viewportH));
		var vH=Work.global.scaledKeyboard?Composer.scale.length:88;
		if (pianoroll.viewportH > vH) pianoroll.viewportH= vH;
		if (pianoroll.viewportB+pianoroll.viewportH>vH) pianoroll.viewportB=vH-pianoroll.viewportH;
		if (pianoroll.viewportH < 24) pianoroll.viewportH=24;

		pianoroll.viewportW = (pianoroll.viewportW 
							+ e.deltaX/(pianoroll.width/pianoroll.viewportW));
		if (pianoroll.viewportW >1024) pianoroll.viewportW=1024;
		if (pianoroll.viewportW < 32) pianoroll.viewportW=32;
	} else {  // pan
		let hstep=0.05, vstep=0.05;
		if (!pianoroll.autoScrolling) {
			pianoroll.viewportL+=(e.deltaX * hstep);
			if (pianoroll.viewportL<0) pianoroll.viewportL=0;
			Navbar.updateLR();
		};
		pianoroll.viewportB-=(e.deltaY * vstep);
		if (pianoroll.viewportB<0) pianoroll.viewportB=0;
		let vH = Work.global.scaledKeyboard ? Composer.scale.length : 88;
		if (pianoroll.viewportB+pianoroll.viewportH>vH) pianoroll.viewportB=vH-pianoroll.viewportH;
	};
});	

pianoroll.canvas.addEventListener("gesturestart", function (e) {
	e.preventDefault();
// 	startX = e.pageX;
// 	startY = e.pageY;
	startScale = Controls.zoom;
});

pianoroll.canvas.addEventListener("gesturechange", function (e) {
	e.preventDefault();
//	console.log(e.rotation);
	Controls.zoom = startScale / e.scale;
	pianoroll.viewportW = (pianoroll.initVW * Controls.zoom);
	if (pianoroll.viewportW >pianoroll.maxW) pianoroll.viewportW=pianoroll.maxW;
	if (pianoroll.viewportW < pianoroll.minW) pianoroll.viewportW=pianoroll.minW;
	Navbar.updateLR();
})

pianoroll.canvas.addEventListener("gestureend", function (e) {
	e.preventDefault();
});

function initFixedUI(){
	var s;
	for (var i=0; i<Theory.scaleDict.length; i++){
		s=document.getElementById("select_scale");
		var o=document.createElement("option");
		o.innerHTML="#"+i+" - "+Theory.scaleDict[i].name;
		s.appendChild(o);
	};
//	s.options.selectedIndex=70;
};

initFixedUI();
init();
//Tone.start();

Controls.init=init;
Controls.showWaiting=showWaiting;
Controls.hideWaiting=hideWaiting;

}());

var canvas=new Canvas();
