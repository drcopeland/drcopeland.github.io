const size = [300,400];
const nrow = 3;
const ncol = 3;
const numPics = 12;

const cellWidth = size[0]/ncol;
const cellHeight = size[1]/nrow;

// Implement Fisher-Yates-Durstenfeld algorithm for random permutation
// Args: n 
// Return: a permutation, stored as a rearrangement of [0,1,...n-1]
function randPerm(n) {
	// initialize array
	var a = Array(n);
	for (let i=0; i<n; i++) {
		a[i]=i;
	}

	// shuffle
	for (let i=n-1; i>1; i=i-1) {
		var j = Math.floor(Math.random() * i);
		var b = a[i]; a[i] = a[j]; a[j]=b;
	}
	return a;
}

var imgArray = randPerm(numPics);
console.log(imgArray)

class Cell {

	constructor(imgnum, xpos, ypos) {
		this.imgnum = imgnum;
		this.count = 0;
		this.xpos = xpos; // counted from upper left xpos = 0, 1, ... ncol -1
		this.ypos = ypos; // counted from upper left ypos = 0, 1, ... nrow - 1
		this.cellid = 'cell' + this.xpos + this.ypos;
		this.random
	}

	
	dir() {
		return 'HomePics/chops/pic_' + String(this.imgnum) + '_' + String(this.ypos) + '_' + String(this.xpos) + '.jpg';	
	}

	style() {
		let xp = this.xpos*(size[0]/ncol);
		let yp = this.ypos*(size[1]/nrow);
		let st = 'position: absolute; left: ' + xp + 'px; top: ' + yp + 'px;';
		return st;
	}	

	show() {
		var xp = this.xpos*(size[0]/ncol);
		var yp = Math.floor(this.ypos*(size[1]/nrow));

		document.write("<img id = " + this.cellid + " src=" + this.dir() +">");
		document.getElementById(this.cellid).style.width = cellWidth + "px";
		document.getElementById(this.cellid).style.position = "absolute";
		document.getElementById(this.cellid).style.left = xp + "px";
		document.getElementById(this.cellid).style.top = yp + "px";
		document.getElementById(this.cellid).onmouseover = (this.onHover).bind(this);

	}

	onHover() {
		this.count = (this.count+1)%numPics;
		console.log(this.count);
		this.imgnum = imgArray[this.count];
		document.getElementById(this.cellid).src = this.dir();
		
		
	}
}

startImg = Math.floor(Math.random()*numPics);



for (let i=0; i<nrow; i++) {
	for (let j=0; j<ncol; j++) {
		cell = new Cell(imgArray[0], i, j)
		cell.show()
	}
}

