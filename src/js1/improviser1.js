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
                console.log("Improvision k"+ ctx.key + " s" + ctx.scaleId + " m" + ctx.mode + 
                    " succeeded after " + (i+1) + " iterations."); 
                Imp();
                return;
            }
        }
        console.log("falied "+buildCount);
        console.log("Max search reached. Improvision failed.")
    }

    function rebuild(ctx){
        var parent = {note: Work.global.key+60, len:64};
        var home = Work.global.key+60;
        var verse = new Motf.ImpNote(ctx, parent, home, 0)
        if (verse.pick == null) return false;

        var phrase = [];
        for (var i=0; i<verse.pick.length; i++) {
            var home = (i==verse.pick.length-1) ? verse.home : verse.pick[i+1].note;
            var p = new Motf.ImpNote(ctx, verse.pick[i], home, 0);
            if (p.pick == null) return false;
            phrase.push(p);
        };

        phrase =[
            {pick:[{note: 60, len: 4},{note: 55, len: 4},{note: 57, len: 4},{note: 52, len: 4}], home: 53},
            {pick:[{note: 53, len: 4},{note: 48, len: 4},{note: 53, len: 4},{note: 55, len: 4}], home: 60},
            {pick:[{note: 60, len: 4},{note: 55, len: 4},{note: 57, len: 4},{note: 52, len: 4}], home: 53},
            {pick:[{note: 53, len: 4},{note: 48, len: 4},{note: 53, len: 4},{note: 55, len: 4}], home: 60}
        ];

        var phrase1 = [];
        for (var i=0; i<phrase.length; i++) {
            phrase1.push({pick:[]});
        for (var j=0; j<phrase[i].pick.length; j++)
            phrase1[i].pick.push({note: ctx.getNoteByScaleMove(phrase[i].pick[j].note, 
                [0,2,4][Math.floor(Math.random()*3)]), len:phrase[i].pick[j].len});
            phrase1[i].home=phrase[i].home;
        };

        var note = [];
        for (var i=0; i<phrase1.length; i++){
            var rhyPat = [Math.floor(Math.random()*4), 4, 5, 6, 7];
            for (var j=0; j<phrase1[i].pick.length; j++){
                var home = (j==phrase1[i].pick.length-1) ? phrase1[i].home : phrase1[i].pick[j+1].note;
                var n = new Motf.ImpNote(ctx, phrase1[i].pick[j], home, rhyPat[Math.floor(Math.random()*rhyPat.length)]);
                if (n.pick == null) return false;
                note.push(n);    
            }
        };    

        return {verse: verse, phrase: phrase, phrase1: phrase1, note: note};
    };

    Improviser1.tryBuild = (ctx) => { Improviser1.buildCount=0; tryBuild(ctx); };
    
    //debugger
})()
