var Improviser1={};
(function(){
    var buildCount = 0;

    function rebuild(){
        var ctx = new Motf.Context(Work.global.key, Work.global.scale_id, Work.global.mode, 4, 4, 120);
        root= {note: ctx.root, len: 64}; 
        buildCount++;
        Improviser1.success = true;
        var verse = new Motf.Imp1(ctx);
        var phrase = [
            new Motf.Imp1(ctx, verse.pick[0], verse.pick[1].note, 0),
            new Motf.Imp1(ctx, verse.pick[1], verse.pick[2].note, 0),
            new Motf.Imp1(ctx, verse.pick[2], verse.pick[3].note, 0),
            new Motf.Imp1(ctx, verse.pick[3], verse.home.note, 0),
        ]
        var phrase1 = [];
        for (var i=0; i<phrase.length; i++) {
            phrase1.push({pick:[]});
        for (var j=0; j<phrase[i].pick.length; j++)
            phrase1[i].pick.push({note: ctx.getNoteByScaleMove(phrase[i].pick[j].note, 
                [0,2,4][Math.floor(Math.random()*3)]), len:phrase[i].pick[j].len});
            phrase1[i].home=phrase[i].home;
        };
        var note = [];
        for (var i=0; i<phrase.length; i++){
            var r1 = Math.floor(Math.random()*6);
            var r2 = Math.floor(Math.random()*2)+6;
            note.push(
                new Motf.Imp1(ctx, phrase1[i].pick[0], phrase1[i].pick[1].note, r1),
                new Motf.Imp1(ctx, phrase1[i].pick[1], phrase1[i].pick[2].note, r1),
                new Motf.Imp1(ctx, phrase1[i].pick[2], phrase1[i].pick[3].note, r2),
                new Motf.Imp1(ctx, phrase1[i].pick[3], phrase1[i].home, r2),
            );
        };
        if (!Improviser1.success) {
            if (buildCount>3000) {
                console.log("Max search reached. Improvision failed.")
                return;
            }
            rebuild();
            return;
        }
        Improviser1.verse = verse;
        Improviser1.bass = phrase;
        Improviser1.melody = note;
        console.log("Improvision k"+ ctx.key + " s" + ctx.scaleId + " m" + ctx.mode + 
            " succeeded after "+buildCount+" iterations."); 
        Imp();
    };

    Improviser1.rebuild = () => { buildCount=0; rebuild() };
    
    //debugger
})()
