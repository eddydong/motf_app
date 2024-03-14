var Improviser1={};
(function(){
    function tryBuild(ctx){
        var buildCount= 3000;
        for (var i=0; i<buildCount; i++){
            var res = rebuild(ctx);
            if (res) {
                //console.log(res);
                Improviser1.verse = res.verse;
                Improviser1.bass = res.phrase;
                Improviser1.melody = res.note;
                Improviser1.meline = res.phrase1;
                console.log("Improvision k"+ ctx.key + " s" + ctx.scaleId + " m" + ctx.mode + 
                    " succeeded after " + (i+1) + " iterations."); 
                exportToPianoroll();
                return;
            }
        }
        console.log("falied "+buildCount);
        console.log("Max search reached. Improvision failed.")
    }

    function rebuild(ctx){
        var parent = {note: Work.global.key+60, len:128};
        var home = Work.global.key+60;
        var verse = new motf.ImpNote(ctx, parent, home, 12)
        for (var i=0; i<verse.pick.length; i++) verse.pick[i].len=verse.pick[i].len/2;
        if (verse.pick == null) return false;
        // repeat
        verse.pick.push(verse.pick[0],verse.pick[1]);

        var phrase = [];
        for (var i=0; i<verse.pick.length/2; i++) {
            var home = (i==verse.pick.length-1) ? verse.home : verse.pick[i+1].note;
            var p = new motf.ImpNote(ctx, verse.pick[i], home, 6);
            if (p.pick == null) return false;
            phrase.push(p);
        };
        // repeat
        for (var i=0; i<verse.pick.length/2; i++) {
            phrase.push(phrase[i]);
        };

        // phrase =[
        //     {pick:[{note: 60, len: 4},{note: 55, len: 4},{note: 57, len: 4},{note: 52, len: 4}], home: 53},
        //     {pick:[{note: 53, len: 4},{note: 48, len: 4},{note: 53, len: 4},{note: 55, len: 4}], home: 60},
        //     {pick:[{note: 60, len: 4},{note: 55, len: 4},{note: 57, len: 4},{note: 52, len: 4}], home: 53},
        //     {pick:[{note: 53, len: 4},{note: 48, len: 4},{note: 53, len: 4},{note: 55, len: 4}], home: 60}
        // ];

        var phrase1 = [];
        for (var i=0; i<phrase.length/2; i++) {
            phrase1.push({pick:[]});
            for (var j=0; j<phrase[i].pick.length; j++)
            phrase1[i].pick.push({note: ctx.getNoteByScaleMove(phrase[i].pick[j].note, 
                [0,2,2,4,4,4,4][Math.floor(Math.random()*7)]), len:phrase[i].pick[j].len});
            phrase1[i].home=phrase[i].home;
        };
        // repeat
        for (var i=0; i<phrase.length/2; i++) {
            phrase1.push(phrase1[i]);
        };

        var note = [];
        for (var i=0; i<phrase1.length; i++){
            //var rhyPat = [Math.floor(Math.random()*4), 4, 5, 6, 7];
            for (var j=0; j<phrase1[i].pick.length; j++){
                var home = (j==phrase1[i].pick.length-1) ? phrase1[i].home : phrase1[i].pick[j+1].note;
                var n = new motf.ImpNote(ctx, phrase1[i].pick[j], home, Math.floor(Math.random()*14)
                    //rhyPat[Math.floor(Math.random()*rhyPat.length)]
                    );
                if (n.pick == null) return false;
                note.push(n);    
            }
        };    

        return {verse: verse, phrase: phrase, phrase1: phrase1, note: note};
    };

    function exportToPianoroll(){

        Work.global.seqXY=[];
    
        var drumer = new motf.AutoDrumer(pianoroll, 3);
    
        var pos = 0;
        // for (var i=0; i<Improviser1.verse.pick.length; i++){
        // 	pianoroll.addNote({
        // 			x: pos,
        // 			y: Improviser1.verse.pick[i].note - 21 - 24,
        // 			d: Improviser1.verse.pick[i].len * 2, 
        // 			s: 0, 
        // 			v: 1, 
        // 			l: 0, //j,
        // 			t: 0 // type: 0: normal note; 1: just improvised			
        // 	});
        // 	pos += Improviser1.verse.pick[i].len * 2;
        // };
        pos = 0;
        for (var i=0; i<Improviser1.bass.length; i++)
        for (var j=0; j<Improviser1.bass[i].pick.length; j++){	
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.bass[i].pick[j].note - 21 - 12,
                    d: Improviser1.bass[i].pick[j].len, 
                    s: 1, 
                    v: 1, 
                    l: 2, //j,
                    t: 0 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.bass[i].pick[j].len;
        }
        pos = 0;
        for (var i=0; i<Improviser1.meline.length; i++)
        for (var j=0; j<Improviser1.meline[i].pick.length; j++){	
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.meline[i].pick[j].note - 21,
                    d: Improviser1.meline[i].pick[j].len, 
                    s: 0, 
                    v: 1, 
                    l: 1, //j,
                    t: 2 // type: 0: normal note; 1: just improvised			
            });
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.meline[i].pick[j].note - 21 + 12,
                    d: Improviser1.meline[i].pick[j].len, 
                    s: 0, 
                    v: 1, 
                    l: 1, //j,
                    t: 2 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.meline[i].pick[j].len;
        }
        pos = 0;
        for (var i=0; i<Improviser1.melody.length; i++)
        for (var j=0; j<Improviser1.melody[i].pick.length; j++)
        if (Improviser1.melody[i].pick[j]) {
        //	console.log(motf.melody[i].pick[j]);
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.melody[i].pick[j].note - 21,
                    d: Improviser1.melody[i].pick[j].len, 
                    s: 0, 
                    v: 1, 
                    l: 0, //j,
                    t: 0 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.melody[i].pick[j].len;
        };
    
        pianoroll.autoSimpleChordByKey();
        pianoroll.deSelectAll();
        drumer.fill();
        pianoroll.autoZoom("xy");
    };    

    Improviser1.tryBuild = (ctx) => { Improviser1.buildCount=0; tryBuild(ctx); };
    
    //debugger
})()
