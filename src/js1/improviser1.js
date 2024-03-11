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
        var verse = new Motf.Imp1(ctx, parent, home, 0)
        if (verse.pick == null) return false;

        var phrase = [];
        for (var i=0; i<verse.pick.length; i++) {
            var home = (i==verse.pick.length-1) ? verse.home : verse.pick[i+1].note;
            var p = new Motf.Imp1(ctx, verse.pick[i], home, 0);
            if (p.pick == null) return false;
            phrase.push(p);
        };

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
            var rhyPat = [Math.floor(Math.random()*6), Math.floor(Math.random()*2)+6];
            for (var j=0; j<phrase1[i].pick.length; j++){
                var home = (j==phrase1[i].pick.length-1) ? phrase1[i].home : phrase1[i].pick[j+1].note;
                var n = new Motf.Imp1(ctx, phrase1[i].pick[j], home, rhyPat[Math.floor(j / 2)]);
                if (n.pick == null) return false;
                note.push(n);    
            }
        };    

        return {verse: verse, phrase: phrase, phrase1: phrase1, note: note};
    };

    Improviser1.tryBuild = (ctx) => { Improviser1.buildCount=0; tryBuild(ctx); };
    
    //debugger
})()
