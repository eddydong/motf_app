//const { accessSync } = require("node:original-fs");

var Improviser1={};
(function(){
    function build(ctx){
        return new Promise((resolve, reject)=>{
            var buildCount= 10000;
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
                    Improviser1.walkingbass = res.walking;
                    Improviser1.basicbass = res.basic;
                    exportToPianoroll();
                    resolve("Improvision k"+ ctx.key + " s" + ctx.scaleId + " m" + ctx.mode + 
                    " succeeded after " + (i+1) + " iterations.");
                    return;
                }
            }
            reject("Max search "+ buildCount +" reached. Improvision failed - try again!");    
            return;
        })
    }

    function rebuild(ctx){
        var verse, phrase, phrase1, phrase2, note1, note2;

        // var parent = {note: Work.global.key+60, len:128};
        // var home = Work.global.key+60;
        // verse = new motf.ImpNote(ctx, parent, home, "bass");
        // //for (var i=0; i<verse.pick.length; i++) verse.pick[i].len=verse.pick[i].len;
        // if (verse.pick == null) return false;
        // // repeat
        // // verse.pick.push(verse.pick[0],verse.pick[1]);

        var root = Work.global.key + 60;
        verse = {pick:[{note: root, len: 32},
                       {note: root, len: 32},
                       {note: root, len: 32},
                       {note: root, len: 32}], 
                 home: root};

        phrase = [];
        for (var i=0; i<verse.pick.length/2; i++) {
            var home = (i==verse.pick.length-1) ? verse.home : verse.pick[i+1].note;
            var p = new motf.ImpNote(ctx, verse.pick[i], home, "bassline");
            if (p.pick == null) return false;
            phrase.push(p);
        };
       // repeat
        for (var i=0; i<verse.pick.length/2; i++) {
            phrase.push(phrase[i]);
        };

        // phrase1 = [];
        // for (var i=0; i<verse.pick.length/2; i++) {
        //     var home = (i==verse.pick.length-1) ? verse.home : verse.pick[i+1].note;
        //     var p = new motf.ImpNote(ctx, verse.pick[i], home, 8);
        //     if (p.pick == null) return false;
        //     for (var j=0; j<p.pick.length; j++)
        //         phrase1.push(p.pick[j]);
        // };
        // var phaseLen = phrase1.length;
        // phrase1[phrase1.length-1].home = verse.home;
        // for (var i=phrase1.length-2; i>=0; i--) phrase1[i].home=phrase1[i+1].note;
        // //repeat
        // for (var i=0; i < phaseLen; i++) {
        //     phrase1.push(phrase1[i]);
        // };

        // phrase =[
        //     {pick:[{note: 60, len: 8},{note: 55, len: 8},{note: 57, len: 8},{note: 52, len: 8}], home: 53},
        //     {pick:[{note: 53, len: 8},{note: 48, len: 8},{note: 53, len: 8},{note: 55, len: 8}], home: 60},
        //     {pick:[{note: 60, len: 8},{note: 55, len: 8},{note: 57, len: 8},{note: 52, len: 8}], home: 53},
        //     {pick:[{note: 53, len: 8},{note: 48, len: 8},{note: 53, len: 8},{note: 55, len: 8}], home: 60}
        // ];

        phrase1 = []; 
        for (var i=0; i<phrase.length/2; i++) {
            for (var j=0; j<phrase[i].pick.length; j++) {
                var choices = [0];
                if (ctx.inScale(phrase[i].pick[j].note+7))
                    for (var k=0; k<3; k++) choices.push(7);
                if (ctx.inScale(phrase[i].pick[j].note+4))
                    for (var k=0; k<2; k++) choices.push(4)
                else if (ctx.inScale(phrase[i].pick[j].note+3))
                    for (var k=0; k<2; k++) choices.push(3);
                phrase1.push({note: phrase[i].pick[j].note +
                    choices[Math.floor(Math.random()*choices.length)], 
                    len:phrase[i].pick[j].len});    
            }
        };
        // repeat
        for (var i=0; i<phrase1.length/2; i++) {
            phrase1.push(phrase1[i]);
        };   
        phrase1[phrase1.length-1].home = verse.home;
        for (var i=phrase1.length-2; i>=0; i--) phrase1[i].home=phrase1[i+1].note;

        // phrase1 =[
        //     {note: 67, len: 8},{note: 62, len: 8},{note: 64, len: 8},{note: 59, len: 8},
        //     {note: 60, len: 8},{note: 55, len: 8},{note: 60, len: 8},{note: 62, len: 8},
        //     {note: 67, len: 8},{note: 62, len: 8},{note: 64, len: 8},{note: 59, len: 8},
        //     {note: 60, len: 8},{note: 55, len: 8},{note: 60, len: 8},{note: 62, len: 8}
        // ];

        note1 = []; var mutAuto = [2,1,1,0, 2,1,1,0, 2,1,1,0, 2,1,1,0];
        for (var i=0; i<phrase1.length; i++){
            var home = (i==phrase1.length-1) ? phrase1[0].note : phrase1[i+1].note;
            var n = new motf.ImpNote1(ctx, phrase1[i], home, "piano", i % 4 == 3, (i % 8) / 16, mutAuto[i]);
            if (n.pick == null) return false;
            note1.push(n);    
        };   

        note2 = [];
        for (var i=0; i<phrase1.length; i++){
                var home = (i==phrase1.length-1) ? verse.home : phrase1[i+1].note;
                var n = new motf.ImpNote(ctx, phrase1[i], home, "counter_melody", i % 4 == 3);
                if (n.pick == null) return false;
                note2.push(n);    
        };   

        walking = [];
        for (var i=0; i<phrase.length; i++)
        for (var j=0; j<phrase[i].pick.length; j++){
                var home = (j==phrase[i].pick.length-1) ? phrase[i].home : phrase[i].pick[j+1].note;
                var n = new motf.ImpNote(ctx, phrase[i].pick[j], home, "bassWalking", j % 4 == 3);
                if (n.pick == null) return false;
                walking.push(n);    
        };   

        basic = [];
        for (var i=0; i<phrase.length; i++)
        for (var j=0; j<phrase[i].pick.length; j++){
                var home = (j==phrase[i].pick.length-1) ? phrase[i].home : phrase[i].pick[j+1].note;
                var n = new motf.ImpNote1(ctx, phrase[i].pick[j], home, "piano", i % 4 == 3, (i % 8) / 16, (j==3)?4:3);
                if (n.pick == null) return false;
                basic.push(n);    
        };   

        return {verse: verse, phrase: phrase, phrase1: phrase1, phrase2: phrase2, 
                note1: note1, note2: note2, walking: walking, basic: basic};
    };

    function exportToPianoroll(){

        Work.global.seqXY=[];
    
        var drumer = new motf.Drumer(pianoroll, 6);
    
        var start = 16;
        var pos = start;
        var syncopation = Math.floor(Math.random()*3) * 2;

        // bass
        pos = start;
        for (var i=0; i<Improviser1.basicbass.length; i++){
            for (var j=0; j<Improviser1.basicbass[i].pick.length; j++){	
                if (Improviser1.basicbass[i].pick[j].note!=null)
                    pianoroll.addNote({
                        x: pos + Improviser1.basicbass[i].pick[j].x,
                        y: Improviser1.basicbass[i].pick[j].note - 21 - 12,
                        d: Improviser1.basicbass[i].pick[j].len, 
                        s: 1, 
                        v: 1, 
                        l: 4, //j,
                        t: 0, // type: 0: normal note; 1: just improvised			
                        p: 1
                });
            }
            pos += Improviser1.basicbass[i].parent.len;
        }   

        // meline / melody baseline -> purple on chord page
        pos = start;
        for (var i=0; i<Improviser1.meline1.length; i++){	
            if (Improviser1.meline1[i].note!=null){
            pianoroll.addNote({
                    x: pos,
                    y: Improviser1.meline1[i].note - 21 + 12,
                    d: Improviser1.meline1[i].len, 
                    s: 0, 
                    v: 0.3, 
                    l: 2, //j,
                    t: 2, // type: 0: normal note; 1: just improvised			
                    p: 1
            });
            pianoroll.addNote({
                x: pos,
                y: Improviser1.meline1[i].note - 21,
                d: Improviser1.meline1[i].len, 
                s: 0, 
                v: 1, 
                l: 2, //j,
                t: 2, // type: 0: normal note; 1: just improvised			
                p: 1
            });
            };
            pos += Improviser1.meline1[i].len;
        }

        // melody1
        pos = start;
        var prevNote=null;
        for (var i=0; i<Improviser1.melody1.length; i++){
        for (var j=0; j<Improviser1.melody1[i].pick.length; j++)
        if (Improviser1.melody1[i].pick[j]) {
            if (Improviser1.melody1[i].pick[j].note!=null)
                pianoroll.addNote({
                    x: pos + Improviser1.melody1[i].pick[j].x,
                    y: Improviser1.melody1[i].pick[j].note - 21,
                    d: Improviser1.melody1[i].pick[j].len, 
                    s: 0, 
                    v: 0.8 + Math.max(Improviser1.melody1[i].pick[j].len / Improviser1.melody1[i].parent.len, 0.5), 
                    l: 0, //j,
                    t: 0, // type: 0: normal note; 1: just improvised			
                    p: 1
                });
        };
        pos += Improviser1.melody1[i].parent.len;
        };
        // var lastNote1=Improviser1.melody1[Improviser1.melody1.length-1].pick[Improviser1.melody1[Improviser1.melody1.length-1].pick.length-1];
        // var lastNote2=Improviser1.melody1[Improviser1.melody1.length-1].pick[Improviser1.melody1[Improviser1.melody1.length-1].pick.length-2];
        // if (lastNote2 && (lastNote1.len + lastNote2.len <= 4)) {
        //     pianoroll.addNote({
        //         x: start - lastNote1.len,
        //         y: lastNote1.note - 21,
        //         d: lastNote1.len, 
        //         s: 0, 
        //         v: 1, 
        //         l: 0, //j,
        //         t: 0, // type: 0: normal note; 1: just improvised			
        //         p: 1
        //     }); 
        //     pianoroll.addNote({
        //         x: start - lastNote1.len - lastNote2.len,
        //         y: lastNote2.note - 21,
        //         d: lastNote2.len, 
        //         s: 0, 
        //         v: 1, 
        //         l: 0, //j,
        //         t: 0, // type: 0: normal note; 1: just improvised		
        //         p: 1
        //     }); 
        // } else if (lastNote1.len <= 12) {
        //     pianoroll.addNote({
        //         x: start - lastNote1.len,
        //         y: lastNote1.note - 21,
        //         d: lastNote1.len, 
        //         s: 0, 
        //         v: 1, 
        //         l: 0, //j,
        //         t: 0, // type: 0: normal note; 1: just improvised			
        //         p: 1
        //     }); 
        // };

        
        // melody2
        pos = start;
        for (var i=0; i<Improviser1.melody2.length; i++)
        for (var j=0; j<Improviser1.melody2[i].pick.length; j++) {
            if (Improviser1.melody2[i].pick[j].note!=null) 
                pianoroll.addNote({
                        x: pos,
                        y: Improviser1.melody2[i].pick[j].note - 21,
                        d: Improviser1.melody2[i].pick[j].len, 
                        s: 0, 
                        v: 1, 
                        l: 1, //j,
                        t: 0, // type: 0: normal note; 1: just improvised
                        p: 1		
                });
            pos += Improviser1.melody2[i].pick[j].len;
        };
        // var lastNote=Improviser1.melody2[Improviser1.melody2.length-1].pick[Improviser1.melody2[Improviser1.melody2.length-1].pick.length-1];
        // if (lastNote.len<=4)
        //     pianoroll.addNote({
        //         x: start - lastNote.len,
        //         y: lastNote.note - 21,
        //         d: lastNote.len, 
        //         s: 0, 
        //         v: 1, 
        //         l: 1, //j,
        //         t: 0 // type: 0: normal note; 1: just improvised			
        //     }); 

        // jazz walking bass
        pos = start;
        for (var i=0; i<Improviser1.walkingbass.length; i++)
        for (var j=0; j<Improviser1.walkingbass[i].pick.length; j++){
            if (Improviser1.walkingbass[i].pick[j].note!=null) 
                pianoroll.addNote({
                        x: pos,
                        y: Improviser1.walkingbass[i].pick[j].note - 21 - 12,
                        d: Improviser1.walkingbass[i].pick[j].len, 
                        s: 0, 
                        v: 1, 
                        l: 5, //j,
                        t: 2, // type: 0: normal note; 1: just improvised			
                        p: 0.68
                });
            pos += Improviser1.walkingbass[i].pick[j].len;
        };
    
        var chorder = new motf.Chorder(pianoroll, 4, 3, 0);
    
        pianoroll.deSelectAll();
        drumer.fill();
        pianoroll.autoZoom("y");
    };    

    Improviser1.tryBuild = (ctx) => { 
        Improviser1.buildCount=0; 
        console.log('starting building');
        build(ctx).then(
            msg=>{
                pianoroll.scroll("beginning");
                pianoroll.play();        
                console.log(msg);
            },
            err=>{
                console.log(err);
            }
        );
    };
    
    //debugger
})()
