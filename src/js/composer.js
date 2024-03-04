var Composer={};

(function() {

const palette=[
	"rgba(235,80,130",
	"rgba(245,160,70",
	"rgba(100,205,20",
	"rgba(10,185,160",
	"rgba(10,120,235",
	"rgba(180,100,225",
];

Composer.palette=palette;

for (var i=0; i<palette.length; i++){
	document.getElementById("btn_max_"+i).style.background=palette[i]+",0.8)";
	document.getElementById("btn_min_"+i).style.background=palette[i]+",0.8)";
};

var height = Global.footerH, width=window.innerWidth;

var chord= (Work.global.scale=="Chinese" ? [{k:0,w:0.35},{k:2,w:0.2},{k:3,w:0.45}] 
							  : [{k:0,w:0.35},{k:2,w:0.2},{k:4,w:0.45}]);

Composer.chord=chord;

var rank=[];
var draft= [];
var search_count=0;
var search_result= [];
var len_list=[];
var solutions=[];

var rankRepeating=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i < search_result.length; i++) {
		
		var c=0;

// 		for (var j=1; j<search_result[i].length; j++)
// 			if (search_result[i][j].y==search_result[i][j-1].y)
// 				c++;

		for (var sampleL=2; sampleL<search_result[i].length/2; sampleL++){
			for (var j=0; j<search_result[i].length-sampleL; j++){
				var sample=[];
				for (var k=0; k<sampleL; k++) {
					sample.push(search_result[i][j+k].y);
				}
			
				for (var t=j+1; t<search_result[i].length-sampleL+1; t++)
					for (var p=-12; p<13; p++) {
						var rep=1;
						for (var k=0; k<sampleL; k++) 
							if (search_result[i][t+k].y+p != sample[k]){
								rep=0;
								break;
							};
						if (rep==1) {
							c+= sampleL*sampleL;
							break;
						}
					}
			};
		};

		var r=c/search_result[i].length;
		
		data.push(r);

		if (max < r) max = r;
		if (min > r) min = r;
	};

	return {min, min, max: max, data: data};
};

var rankLeadingToDest=(dest)=>{
	var data=[], max=-999, min=999;
	for (var i=0; i < search_result.length; i++) {

// 		var ltn= (getNoteByOffset(dest.y,1)==search_result[i][search_result[i].length-1].y
// 		 || getNoteByOffset(dest.y,-1)==search_result[i][search_result[i].length-1].y
// 		 || (dest.y % 12 ==search_result[i][search_result[i].length-1].y % 12
// 		 	&& dest.y != search_result[i][search_result[i].length-1].y)) ? 1:0;

// 		var ltn= (getNoteByOffset(dest.y,-1,"diatonic")==search_result[i][search_result[i].length-1].y
// 		|| getNoteByOffset(dest.y,+1,"diatonic")==search_result[i][search_result[i].length-1].y) ? 1:0;
		
		var ltn = Math.abs(dest.y, search_result[i][search_result[i].length-1].y) < 3 ? 1 : 0;

		data.push(ltn);

		if (max < ltn) max = ltn;
		if (min > ltn) min = ltn;
	};

	return {min, min, max: max, data: data};
};
// notes in triad chord
var rankInHarmony=(root)=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		var tih=0; //total in harmony
		for (var j=0; j<search_result[i].length-1; j++){
			for (var k=0; k<chord.length; k++)
				if (getNoteByOffset(root.y,chord[k].k,"diatonic") % 12 
				== search_result[i][j].y % 12)
					tih+=search_result[i][j].l*chord[k].w;
		};
		data.push(tih);
		if (max < tih) max = tih;
		if (min > tih) min = tih;
	};
	return {min, min, max: max, data: data};
};
var rankGranularity=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		var l=search_result[i].length-1;
		data.push(l);
		if (max < l) max = l;
		if (min > l) min = l;
	};
	return {min, min, max: max, data: data};
};
var rankKeySpan=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		var ma=-999, mi=999;
		for (var j=0; j<search_result[i].length-1; j++){
			if (ma < search_result[i][j].y) ma = search_result[i][j].y;
			if (mi > search_result[i][j].y) mi = search_result[i][j].y;
		};
		data.push(ma-mi);
		if (max < ma-mi) max = ma-mi;
		if (min > ma-mi) min = ma-mi;
	};
	return {min, min, max: max, data: data};
};
var rankUpNDown=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		data.push(0);
		var last_d=0;
		for (var j=1; j<search_result[i].length; j++){
			var d=0;
			if (search_result[i][j].y>search_result[i][j-1].y) d=1;
			if (search_result[i][j].y<search_result[i][j-1].y) d=-1;
			if (d!=last_d){
				data[i]++;
				last_d=d;
			};
		};
		if (max<data[i]) max=data[i];
		if (min>data[i]) min=data[i];
	};
	return {min, min, max: max, data: data};
};

var getNoteByOffset=(n, o, mode)=>{
 	if (mode=="chromatic") return n+o;
 	
//	if (Composer.diatonic_mask[n]==0) return null;

	var c=0;
	if (o>0) {
		for (var i=n; i<108; i++){
			if (Composer.diatonic_mask[i]==1){
				if (c==o) return i;
				c++;
			};
		};
	} else {
		for (var i=n; i>=0; i--){
			if (Composer.diatonic_mask[i]==1){
				if (c==o) return i;
				c--;
			};
		};
	};
	return null;
}

var getOffset=(n1,n2,mode)=>{
 	if (mode=="Chromatic") return Math.abs(n1- n2);
 	
	if (Composer.diatonic_mask[n1]==0 || Composer.diatonic_mask[n2]==0) return null;
	
	if (n1== n2) return 0;

	var min=n1 > n2 ? n2 : n1;
	var max=n1 > n2 ? n1 : n2;

	var c=0;
	for (var i=min; i<max; i++)
	if (Composer.diatonic_mask[i]==1) c++;
	
	return c;
}

var getTransposedOffset=(n1,n2,mode)=>{
	if (mode!="Chromatic" && (Composer.diatonic_mask[n1]==0 || Composer.diatonic_mask[n2]==0)) return null;
	var o=getOffset(n1,n2,mode);
 	return Math.min(Math.abs(o),Math.abs(7-o));
}

// n: current note; o: offset in chord scale; c: chord (a set of notes)
var getChordNote=(n,o,c)=>{
	var nn=(n + 9) % 12;
	if (c.mask[nn]==0) {
		throw "note "+n+" is not in chord ["+c.name+"] "+c.mask;
		return null;
	};
	
	var oc=0;
	if (o>0) {
		for (var i=n+1; i<88; i++) {
			if (c.mask[(i % 12 + 9) % 12]==1) oc++;
			if (oc==o) return i;
		};
	} else if (o<0) {
		for (var i=n-1; i>=0; i--) {
			if (c.mask[(i % 12 + 9) % 12]==1) oc--;
			if (oc==o) return i;
		};
	} else return n;
}

var isInChord=(n,c)=>{
	var nn=(n % 12 + 9) % 12;
	return (c && c.mask && c.mask[nn]==1);
}

var findSolutions=(params)=>{
	var min, max, s=[];
	
	for (var p=0; p<params.length; p++){
	
		s.push(new Set());

		min= rank[p].min+(rank[p].max-rank[p].min)*params[p][0]
		max= rank[p].min+(rank[p].max-rank[p].min)*params[p][1]

		for (var i=0; i<search_result.length; i++) 
			if (rank[p].data[i]>=min && rank[p].data[i]<=max)
				s[p].add(i);
	};
	
	var res=[];
	
	for (var i=0; i<search_result.length; i++) {
		var goodone=1;
		for (var j=0; j<s.length; j++)
			if (!s[j].has(i)) { goodone=0; break; };
		if (goodone==1) res.push(i);
	};
	
//	console.log(res.length+" / "+search_result.length+" / "+search_count);

	return res;
};
var suggest=()=>{
	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
}

// var search=(root, dest)=>{
// 
// 	if (root.x>=dest.x){
// 		if (root.y == dest.y) 
// 			search_result.push(copyObj(draft));
// 		search_count++;
// 		return;
// 	};
// 
// 	for (var i=0; i<Controls.params.suggester.length; i++)
// 	if (Math.random() < Controls.params.suggester[i].p)
// 	for (var l=0; l<len_list.length; l++)
// 	if (root.x+len_list[l]-1 < dest.x)
// 	{	
// 		draft.push({x: root.x, y: root.y, l: len_list[l]});
// 		var yy=getNoteByOffset(root.y, Controls.params.suggester[i].d, "diatonic");		
// 		if (yy != null){
// 			search({x: root.x + len_list[l], y: yy, l: null}, 
// 				dest);
// 		};
// 		draft.pop();
// 	};
// 	
// // 	};
// };

// var search1=(root, dest, rythm, suggester, totalL, nIndex)=>{
// 	if (root.x>=dest.x){
// 		if (root.y == dest.y) 
// 			search_result.push(copyObj(draft));
// 		search_count++;
// 
// 		return;
// 	};
// 
// 	for (var i=0; i < suggester.length; i++) 
// 	if (Math.random() < suggester[i].p)
// 	{
// 		var len = (totalL/8) * rythm[draft.length % rythm.length];
// 
// 		if (root.x+len-1 < dest.x) {
// 				
// 			draft.push({x: root.x, y: root.y, l: len});
// 
// 			var yy=getNoteByOffset(root.y, suggester[i].d);
// 		
// 			if (yy != null){
// 				search1({x: root.x + len, y: yy, l: root.l}, 
// 					dest, rythm, suggester, totalL, nIndex);
// 			};
// 			
// 			draft.pop();
// 		};
// 	};
// };

// var search1=(root, dest, rythm, suggester, totalL, nIndex)=>{
// 	if (root.x>=dest.x){
// 		if (root.y == dest.y) 
// 			search_result.push(copyObj(draft));
// 		search_count++;
// 
// 		return;
// 	};
// 
// // 	if (draft.length==0){
// // 		for (var i=0; i < suggester.length; i++) 
// // 		if (Math.random() < suggester[i].p)
// // 			draft.push({x: root.x, y: root.y, l: len});
// // 	};
// // 
// 	for (var i=0; i < suggester.length; i++) 
// 	if (Math.random() < suggester[i].p)
// 	{
// 		var len = (totalL/4) * rythm[draft.length % rythm.length];
// 
// 		if (root.x+len-1 < dest.x) {
// 				
// 			draft.push({x: root.x, y: root.y, l: len});
// 
// //			var yy=getNoteByOffset(root.y, suggester[i].d);
// 			var yy=getNoteByOffset(root.y, suggester[i].d, "diatonic");
// 		
// 			if (yy != null){
// 				search1({x: root.x + len, y: yy, l: root.l}, 
// 					dest, rythm, suggester, totalL, nIndex);
// 			};
// 			
// 			draft.pop();
// 		};
// 	};
// };
// 
// var search2=(root, dest)=>{
// 
// 	if (root.x>=dest.x){
// 		if (Math.abs(root.y - dest.y)<3) 
// 			search_result.push(copyObj(draft));
// 		search_count++;
// 		return;
// 	};
// 
// 	for (var i=0; i<Controls.params.suggester.length; i++)
// 	if (Math.random() < Controls.params.suggester[i].p)
// 	for (var l=0; l<len_list.length; l++)
// 	if (root.x+len_list[l]-1 < dest.x)
// 	{	
// 		draft.push({x: root.x, y: root.y, l: len_list[l]});
// 		var yy=getNoteByOffset(root.y, Controls.params.suggester[i].d, "diatonic");		
// 		if (yy != null){
// 			search2({x: root.x + len_list[l], y: yy, l: null}, 
// 				dest);
// 		};
// 		draft.pop();
// 	};
// 	
// // 	};
// };

var search3=(chordOrScale, root, dest, rythm, suggester, totalL)=>{

	if (root.x>=dest.x){
//		if (getOffset(root.y, dest.y, "Chromatic")<4) 
//		if (Math.abs(root.y - dest.y)>0 && Math.abs(root.y - dest.y)<=4) 
		if (root.y==dest.y)
			search_result.push(copyObj(draft));
		search_count++;
		return;
	};
	
	var chords=Theory.getChordsByMelodyKeyScale(Work.global.key, Work.global.scale_id,
		0,pianoroll.endMeas);
		
//		console.log(chords);
	
	if (rythm=="random"){
		for (var i=0; i<suggester.length; i++)
		if (Math.random() < suggester[i].p)
		for (var l=0; l<len_list.length; l++)
		if (root.x+len_list[l]-1 < dest.x)
		{	
			draft.push({x: root.x, y: root.y, l: len_list[l]});
			var yy;
			if (Math.random()>chordOrScale || !isInChord(root.y, chords[Math.floor(root.x
					/(Work.global.bpMeas/Work.global.bpNote*16))]))
				yy=getNoteByOffset(root.y, suggester[i].d, "diatonic");		
			else
				yy=getChordNote(root.y, suggester[i].d, chords[Math.floor(root.x
					/(Work.global.bpMeas/Work.global.bpNote*16))]);
			if (yy != null){
				search3(chordOrScale,
					{x: root.x + len_list[l], y: yy, l: null}, 
					dest, rythm, suggester, totalL);
			};
			draft.pop();
		};
	} else {	
		for (var i=0; i < suggester.length; i++) 
			if (Math.random() < suggester[i].p){
				var len = (totalL/4) * rythm[draft.length % rythm.length];
				if (root.x+len-1 < dest.x) {
					draft.push({x: root.x, y: root.y, l: len});
					var yy;
					if (Math.random()>chordOrScale || !isInChord(root.y, chords[Math.floor(root.x
							/(Work.global.bpMeas/Work.global.bpNote*16))]))
						yy=getNoteByOffset(root.y, suggester[i].d, "diatonic");		
					else
						yy=getChordNote(root.y, suggester[i].d, chords[Math.floor(root.x
							/(Work.global.bpMeas/Work.global.bpNote*16))]);
					if (yy != null){
						search3(chordOrScale,
							{x: root.x + len, y: yy, l: root.l}, 
							dest, rythm, suggester, totalL);
					};
					draft.pop();
				};
			}
	};
};

var getSolutionN=()=>{ return solutions.length; };

var split=(params, root, dest)=>{
	search_count=0;
	len_list=[];
	search_result=[];
	rank=[];
	draft=[];
	solutions=[];
	var noteL=root.l;

	for (var i=1; i<root.l; i++)
		if (root.l % Math.pow(2, i) == 0)
			if (root.l / Math.pow(2,i) >= root.l/4) 
				len_list.push(root.l / Math.pow(2,i));

//	var imp = (mode=="preset") ? Controls.params : Work.layer[0].imp_a[root.x];

	search3(
		params.chordOrScale,
		root, 
		dest, 
		params.rhythm,
		params.suggester,
 		dest.x-root.x,
	);

	rank.push(rankUpNDown());
	rank.push(rankKeySpan());
	rank.push(rankInHarmony(root));
	rank.push(rankGranularity());
	rank.push(rankLeadingToDest(dest));
	rank.push(rankRepeating());
	
	solutions=findSolutions(params.iparams);
	
	if (solutions.length>0)
	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
	else return null;
}

// var octSplit=(mode, root, dest)=>{
// 	search_count=0;
// 	len_list=[];
// 	search_result=[];
// 	rank=[];
// 	draft=[];
// 	solutions=[];
// 	var noteL=root.l;
// 	
// 	for (var i=1; i<root.l; i++)
// 		if (root.l % Math.pow(2, i) == 0)
// 			if (root.l / Math.pow(2,i) >= root.l/8) 
// 				len_list.push(root.l / Math.pow(2,i));
// 
// 	var imp = (mode=="preset") ? Controls.params : Work.layer[0].imp_a[root.x];
// 	
// 	if (imp.rhythm=="random")
// 		search(root, dest);
// 	else search1(
// 		root, dest, 
// 		imp.rhythm, 
// 		imp.suggester, 
// 		dest.x-root.x
// 	);
// 
// //	search(root, dest);
// 		
// 	rank.push(rankUpNDown());
// 	rank.push(rankKeySpan());
// 	rank.push(rankInHarmony(root));
// 	rank.push(rankGranularity());
// 	rank.push(rankLeadingToDest(dest));
// 	rank.push(rankRepeating());
// 	
// 	solutions=findSolutions(imp.iparams);
// 	
// 	if (solutions.length>0)
// 	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
// 	else return null;
// }

Composer.search_result=search_result;
Composer.solutions=solutions;

// var octSplit=(root, dest)=>{
// 	search_count=0;
// 	len_list=[];
// 	search_result=[];
// 	rank=[];
// 	draft=[];
// 	solutions=[];
// 	var noteL=root.l;
// 	
// 	for (var i=1; i<root.l; i++)
// 		if (root.l % Math.pow(2, i) == 0)
// 			if (root.l / Math.pow(2,i) >= root.l/8) 
// 				len_list.push(root.l / Math.pow(2,i));
// 
// 	if (styles[meas[(root.x / noteL) % meas.length]].rythm.length==0){
// 		search(root, dest);
// 	} else
// 	search1(
// 		root, dest, 
// 		styles[meas[(root.x / noteL) % meas.length]].rythm, 
// 		styles[meas[(root.x / noteL) % meas.length]].suggester, 
// 		dest.x-root.x
// 	);
// 
// //	search(root, dest);
// 		
// 	rank.push(rankUpNDown());
// 	rank.push(rankKeySpan());
// 	rank.push(rankGranularity());
// 	rank.push(rankInHarmony(root));
// 	rank.push(rankLeadingToDest(dest));
// 	rank.push(rankRepeating());
// 	
// 	solutions=findSolutions(styles[meas[(root.x / noteL) % meas.length]].iparam);
// 	
// 	if (solutions.length>0)
// 	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
// 	else return null;
// }

var init=()=>{
	Composer.diatonic_mask=generate_diatonic_mask();
	Composer.scale=scaleUpdate();
};

// get note# in current scale by given chromatic key c
// for instance given c=41, if current scale is 70-major, then output 2 (41/D is the 2nd note in a major scale)
function scaleNByChroma(c){
	var mask=Theory.scaleDict[Work.global.scale_id].mask;
	var k= (c+9) % 12;
	var cc=0; 
	for (var i=0; i<12; i++) {
		if (mask[i]==1) cc++;
		if (i==k) break;
	}; 
	return cc;
}

Composer.scaleNByChroma=scaleNByChroma;

init();

// exposing public properties (read only)
Composer.height		=	height;
// exposing public methods
Composer.split	=	split;
//Composer.measures = measures;
Composer.getNoteByOffset = getNoteByOffset;
Composer.getChordNote = getChordNote;
Composer.getOffset = getOffset;
Composer.getTransposedOffset = getTransposedOffset;
Composer.init=init;
//Composer.updateScale=updateScale;

function scaleUpdate(){
	var scale=[];
	var mask=Theory.transpose(Theory.scaleDict[Work.global.scale_id].mask, Work.global.key);
	for (var i=0; i<88; i++)
		if (mask[(i+9) % 12]==1) scale.push(i);
	return scale;
}

function generate_diatonic_mask(){
	var scale=[];
	var mask=Theory.transpose(Theory.scaleDict[Work.global.scale_id].mask, Work.global.key);
	for (var i=0; i<88; i++)
		if (mask[(i+9) % 12]==1) scale.push(1); else scale.push(0);
	return scale;
}

}());
