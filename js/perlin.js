// Perlin noise
// http://flafla2.github.io/2014/08/09/perlinnoise.html

// Hash lookup table as defined by Ken Perlin.  This is a randomly
// arranged array of all numbers from 0-255 inclusive.
var p = [
	151,160,137,91,90,15,                 
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,    
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];

// Doubled permutation to avoid overflow
function Perlin() {
	this.permutations = [];
	for (var i = 0; i < 512; i++) {
		this.permutations.push(p[i % 256]);
	}

}

Perlin.prototype.fade = function(t) {
	// 6t^5 - 15t^4 + 10t^3
	return t * t * t * (t * (t * 6 - 15) + 10);
}

Perlin.prototype.gradient = function(hash, x, y) {
	switch(hash & 0xF) {
		case 0x0: return  x + y;
		case 0x1: return -x + y;
		case 0x2: return  x - y;
		case 0x4: return -x - y;
		case 0x5: return  x;
		case 0x6: return -x;
		case 0x7: return -y;
		case 0x8: return  y;
		case 0x9: return  x + y;
		case 0xA: return -x + y;
		case 0xB: return  x - y;
		case 0xC: return -x - y;
		case 0xD: return  x;
		case 0xE: return -x;
		case 0xF: return -y;
		default: return 0;
	}
}

Perlin.prototype.linterp = function(a, b, x) {
	return a + x * (b - a);
}

Perlin.prototype.perlin = function(x, y) {
	var xi = Math.floor(x) & 255;
	var yi = Math.floor(y) & 255;

	var xf = x % 1.0;
	var yf = y % 1.0;

	var u = this.fade(xf);
	var v = this.fade(yf);

	var aa, ab, ba, bb;
	aa = this.permutations[this.permutations[xi] 		+ yi];
	ab = this.permutations[this.permutations[xi] 		+ yi + 1];
	ba = this.permutations[this.permutations[xi + 1]	+ yi];
	bb = this.permutations[this.permutations[xi + 1] 	+ yi + 1];

	var x1, y1;
	x1 = this.linterp(this.gradient(aa, xf, yf), 
					  this.gradient(ba, xf-1, yf),
					  u);
	y1 = this.linterp(this.gradient(ab, xf, yf-1), 
					  this.gradient(bb, xf-1, yf-1),
					  u);

	return this.linterp(x1, y1, v);
}

