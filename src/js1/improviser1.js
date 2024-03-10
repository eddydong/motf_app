var Improviser1={};
(function(){
    var rhythm4 = [[1,1,1,1],[2,1,1],[1,2,1],[1,1,2],[3,1],[1,3],[2,2],[4]]
    var suggester = {values: [0,  -1,  1,   -2,   2,  -3,   3,  -4,   4,  -5,  5], 
                    chances: [1,   1,  1,  0.2, 0.1, 0.1, 0.3,   0,   0,   0,  0]};
    var ctx = new Motf.Context(Work.global.key, Work.global.scale_id, Work.global.mode, 4, 4, 120);
    var root = {note: ctx.root, len: 64}; 
    
    class Motif {
        constructor(parent=root, home=ctx.root, rhythm=0, then=()=>{}){
            this.rhythm = rhythm;
            this.then = then;
            this.parent = parent;
            this.home = home;
            this.steps = rhythm4[rhythm].length;
            this.draft = [{note: parent.note, len: rhythm4[this.rhythm][0] / 4 * this.parent.len}];
            this.variant = [];
            this.search(1);
            this.pick = [];
            if (this.variant.length == 0) {
            //    console.log("No solution at n"+parent.note+" l"+parent.len+" h"+home+" r"+rhythm+", re-searching...");
                Improviser1.success=false;
                return;
            };
            this.repick(); // get a random pick
            this.then(this);
        }
        // populat the variant(s) list
        search(n){
            if (n == this.steps) {
                var last = this.draft[this.draft.length-1].note;
                if (last == ctx.getNoteByScaleMove(this.home,1) ||
                    last == ctx.getNoteByScaleMove(this.home,0) ||
                    last == ctx.getNoteByScaleMove(this.home,-1)||
                    last == ctx.getNoteByScaleMove(this.home,-3)) {
                    this.variant.push(myLib.deepCopy(this.draft));
                }
            } else for (var i=0; i<suggester.values.length; i++) if (Math.random()<suggester.chances[i]) {
                this.draft.push({note: ctx.getNoteByScaleMove(this.draft[n-1].note, suggester.values[i]),
                    len: rhythm4[this.rhythm][n] / 4 * this.parent.len});
                this.search(n+1);
                this.draft.pop();
            };
        }
        // get a new pick from the varian(s)
        repick(){
            this.pick = this.variant[Math.floor(Math.random()*this.variant.length)];
        }
        // mutate a pick by random note pitch modifications 
        mutate(){
            for (var i=1; i<this.pick.length; i++){
                this.pick[i].note = ctx.getNoteByScaleMove(this.pick[i].note, 
                    Math.floor(Math.random()*3)-1);
            }    
        }
        // transpose the pick to a new home
        transTo(newHome){
            var dist = newHome - this.pick[0].note;
            this.pick[0].note = newHome;
            for (var i=1; i<this.pick.length; i++){
                this.pick[i].note += dist;
                while (!ctx.inScale(this.pick[i].note))
                    this.pick[i].note--;
            }
        }
    }
    
    var buildCount = 0;
    function rebuild(){
        buildCount++;
        Improviser1.success = true;
        var verse = new Motif();
        var phrase = [
            new Motif(verse.pick[0], verse.pick[1].note, 0),
            new Motif(verse.pick[1], verse.pick[2].note, 0),
            new Motif(verse.pick[2], verse.pick[3].note, 0),
            new Motif(verse.pick[3], verse.home.note, 0),
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
                new Motif(phrase1[i].pick[0], phrase1[i].pick[1].note, r1),
                new Motif(phrase1[i].pick[1], phrase1[i].pick[2].note, r1),
                new Motif(phrase1[i].pick[2], phrase1[i].pick[3].note, r2),
                new Motif(phrase1[i].pick[3], phrase1[i].home, r2),
            );
        };
        if (!Improviser1.success) {
            if (buildCount>5000) {
                console.log("Max search reached. Improvision failed.")
                return;
            }
            rebuild();
            return;
        }
        Improviser1.verse = verse;
        Improviser1.bass = phrase;
        Improviser1.melody = note;
        console.log("Improvision succeeded after "+buildCount+" iterations.");
        Imp();
    };

    Improviser1.rebuild = () => { buildCount=0; rebuild() };
    
    //debugger
})()
