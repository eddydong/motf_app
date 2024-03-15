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
                Improviser1.melody1 = res.note1;
                Improviser1.meline1 = res.phrase1;
                Improviser1.melody2 = res.note2;
                Improviser1.meline2 = res.phrase2;
                console.log("Improvision k"+ ctx.key + " s" + ctx.scaleId + " m" + ctx.mode + 
                    " succeeded after " + (i+1) + " iterations."); 
                //console.log(res.verse, res.phrase, res.phrase1, res.note1);
                exportToPianoroll();
                return;
            }
        }
        console.log("falied "+buildCount);
        console.log("Max search reached. Improvision failed.")
    }

    function rebuild(ctx){
        var verse, phrase, phrase1, phrase2, note1, note2;

        var parent = {note: Work.global.key+60, len:128};
        var home = Work.global.key+60;
        verse = new motf.ImpNote(ctx, parent, home, 14);
        for (var i=0; i<verse.pick.length; i++) verse.pick[i].len=verse.pick[i].len/2;
        if (verse.pick == null) return false;
        // repeat
        verse.pick.push(verse.pick[0],verse.pick[1]);

        phrase = [];
        for (var i=0; i<verse.pick.length/2; i++) {
            var home = (i==verse.pick.length-1) ? verse.home : verse.pick[i+1].note;
            var p = new motf.ImpNote(ctx, verse.pick[i], home, 8);
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

        phrase1 = []; 
        for (var i=0; i<phrase.length/2; i++) {
            for (var j=0; j<phrase[i].pick.length; j++) {
                phrase1.push({note: ctx.getNoteByScaleMove(phrase[i].pick[j].note, 
                    [0,2,2,2,4,4,4,4,4,4][Math.floor(Math.random()*7)]), len:phrase[i].pick[j].len});    
            }
        };
        phrase1[phrase1.length-1].home = verse.home;
        for (var i=phrase1.length-2; i>=0; i--) phrase1[i].home=phrase1[i+1].note;
        // repeat
        for (var i=0; i<phrase1.length/2; i++) {
            phrase1.push(phrase1[i]);
        };   

        note1 = [];
        var r1 = Math.floor(Math.random()*4);
        var r2 = Math.floor(Math.random()*4);
        var r3 = Math.floor(Math.random()*8)+4;
        var r4 = Math.floor(Math.random()*8)+4;
        var r5 = Math.floor(Math.random()*7)+8;
        var r6 = Math.floor(Math.random()*7)+8;
        var rhyPat = [r3, r4 ,r3, r5,  r4, r3, r4, r1,  r3, r4, r3, r5,  r4, r3, r4, r6];
        for (var i=0; i<phrase1.length; i++){
                var home = (i==phrase1.length-1) ? verse.home : phrase1[i+1].note;
                var n = new motf.ImpNote(ctx, phrase1[i], home, rhyPat[i]);
                if (n.pick == null) return false;
                note1.push(n);    
        };   

        note2 = [];
        var rhyPat = [4,4,4,4, 4,4,4,8, 4,4,4,4, 4,4,4,8];
        for (var i=0; i<phrase.length; i++)
        for (var j=0; j<phrase[i].pick.length; j++){
                var home = (j==phrase[i].pick.length-1) ? phrase[i].home : phrase[i].pick[j+1].note;
                var n = new motf.ImpNote(ctx, phrase[i].pick[j], home, rhyPat[note2.length]);
                if (n.pick == null) return false;
                note2.push(n);    
        };   

        return {verse: verse, phrase: phrase, phrase1: phrase1, phrase2: phrase2, note1: note1, note2: note2};
    };

    function exportToPianoroll(){

        Work.global.seqXY=[];
    
        var drumer = new motf.AutoDrumer(pianoroll, 3);
    
        var start = 16;
        var pos = start;
        var syncopation = Math.floor(Math.random()*3) * 2;

        // bass
        pos = start;
        for (var i=0; i<Improviser1.bass.length; i++)
        for (var j=0; j<Improviser1.bass[i].pick.length; j++){	
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.bass[i].pick[j].note - 21 - 12,
                    d: Improviser1.bass[i].pick[j].len, 
                    s: 1, 
                    v: 2, 
                    l: 2, //j,
                    t: 0 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.bass[i].pick[j].len;
        }

        // melody baseline -> purple on chord page
        pos = start;
        for (var i=0; i<Improviser1.meline1.length; i++){	
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.meline1[i].note - 21 + 12,
                    d: Improviser1.meline1[i].len, 
                    s: 0, 
                    v: 0.5, 
                    l: 1, //j,
                    t: 2 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.meline1[i].len;
        }

        // melody
        pos = start;
        for (var i=0; i<Improviser1.melody1.length; i++)
        for (var j=0; j<Improviser1.melody1[i].pick.length; j++)
        if (Improviser1.melody1[i].pick[j]) {
        //	console.log(motf.melody[i].pick[j]);
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.melody1[i].pick[j].note - 21,
                    d: Improviser1.melody1[i].pick[j].len, 
                    s: 0, 
                    v: 1, 
                    l: 0, //j,
                    t: 0 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.melody1[i].pick[j].len;
        };
        var lastNote=Improviser1.melody1[Improviser1.melody1.length-1].pick[Improviser1.melody1[Improviser1.melody1.length-1].pick.length-1];
        if (lastNote.len<=4)
            pianoroll.addNote({
                x: start - lastNote.len,
                y: lastNote.note - 21,
                d: lastNote.len, 
                s: 0, 
                v: 1, 
                l: 0, //j,
                t: 0 // type: 0: normal note; 1: just improvised			
            }); 

        // jazz walking bass
        pos = start;
        for (var i=0; i<Improviser1.melody2.length; i++)
        for (var j=0; j<Improviser1.melody2[i].pick.length; j++)
        if (Improviser1.melody2[i].pick[j]) {
        //	console.log(motf.melody[i].pick[j]);
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.melody2[i].pick[j].note - 21 - 12,
                    d: Improviser1.melody2[i].pick[j].len, 
                    s: 0, 
                    v: 1, 
                    l: 4, //j,
                    t: 2 // type: 0: normal note; 1: just improvised			
            });
            pos += Improviser1.melody2[i].pick[j].len;
        };
    
        pianoroll.autoSimpleChordByKey();
        pianoroll.deSelectAll();
        drumer.fill();
        pianoroll.autoZoom("xy");
    };    

    Improviser1.tryBuild = (ctx) => { Improviser1.buildCount=0; tryBuild(ctx); };
    
    //debugger
})()
