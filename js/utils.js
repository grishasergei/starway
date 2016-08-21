function get_random_in_range(min, max) {
	return Math.random() * (max - min) + min;
}

function get_random_int(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_random_bm() {
	/*
	Gaussiam random value usinr Box-Muller transform
	http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
	*/
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function clear_canvas(canvas) {
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function get_random_grayscale(min, max) {
	/*
	Random grayscale
	http://stackoverflow.com/questions/22692588/random-hex-generator-only-grey-colors
	*/
	var value = get_random_int(min, max); //* Math.abs(get_random_bm());
	//value = Math.floor(value);
	var color = "#" + (value).toString(16) + 
					  (value).toString(16) + 
					  (value).toString(16);	
	return color;
}


function make_map_background(canvas, palette) {
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "rgb(" +  palette.background + ")";
	context.fillRect(0, 0, canvas.width, canvas.height);

	add_bg_stars(canvas, palette);
	add_nebula(canvas, palette);
}

function add_bg_stars(canvas, palette) {

	var ratios = [1/30, 1/300, 1/1200, 1/2000];
	//var colors = ["#333333", "#555555", "#777777", "#4860A8"];
	var colors = [palette.background_star_1,
	palette.background_star_2,
	"(60, 60, 60)",
	palette.background_star_3
	];

	var x, y, n, color;
	
	var x_max = canvas.width;
	var y_max = canvas.height;
	
	var context = canvas.getContext("2d");
	
	for (var j = 0; j < ratios.length; j++) {
		n = Math.floor(canvas.width * canvas.height * ratios[j]);
		
		color = "rgb(" + colors[j] + ")";
		context.fillStyle = color;
		
		for (var i = 0; i < n; i++) {
			x = get_random_int(0, x_max);
			y = get_random_int(0, y_max);
			context.fillRect(x, y, 1, 1);
		}
		
	}
}

function add_nebula(canvas, palette) {

	var context = canvas.getContext("2d");

	var x,
		y,
		n,
		radius,
		gradient,
		margin;
	margin = 200;
	n = Math.floor(1 / 100000 * canvas.width * canvas.height);
	var x_range = 500;
	var y_range = 200
	var color = palette.nebula;

	for(var i = 0; i < n; i++) {
		x = get_random_int(margin, canvas.width - margin);
		y = get_random_int(margin, canvas.height - margin);
		radius = get_random_int(200, 500);
		gradient = context.createRadialGradient(x, y,
			radius,
			x, y,
			0);

		gradient.addColorStop(0,"transparent");
		gradient.addColorStop(1,"rgba(" + color + ", 0.2");
		context.fillStyle = gradient;

		context.fillRect(x - radius, 
						 y - radius,
						 radius * 2,
						 radius * 2);	
	}

}

function draw_line(context, p1, p2) {
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.stroke();
}

