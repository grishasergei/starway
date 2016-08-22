//http://lodev.org/cgtutor/randomnoise.html#Clouds

function SmoothNoise(noise_width) {
	this.PI = 3.14159;
	this.noise = [];
	this.noise_width = noise_width;
	for (var i = 0; i < this.noise_width; i++) {
		this.noise.push([]);
		for (var j = 0; j < this.noise_width; j++) {
			this.noise[i].push(Math.random());
		}
	}
}

SmoothNoise.prototype.evaluate = function(x, y) {
	// get fractional part of x and y
	var xf = x % 1.0;
	var yf = y % 1.0;

	// wrap around
	var x1 = (Math.floor(x) + this.noise_width) % this.noise_width;
	var y1 = (Math.floor(y) + this.noise_width) % this.noise_width;

	// neighbor values
	var x2 = (x1 + this.noise_width - 1) % this.noise_width;
	var y2 = (y1 + this.noise_width - 1) % this.noise_width;

	// smooth the noise with bilinear interpolation
	var value = 0;
	value += xf * yf * this.noise[y1][x1];
	value += (1 - xf) * yf * this.noise[y1][x2];
	value += xf * (1 - yf) * this.noise[y2][x1];
	value += (1 - xf) * (1 - yf) * this.noise[y2][x2];

	return value;
}

SmoothNoise.prototype.turbulence = function(x, y, size, lower_bound) {
	var value = 0;
	var initial_size = size;
	while (size >= lower_bound) {
		value += this.evaluate(x / size, y / size) * size;
		size /= 2.0;
	}

	value = 128.0 * value / initial_size;
	return Math.floor(value);
}

SmoothNoise.prototype.marble = function (x, y, x_period, y_period, turb_power, turb_size) {
	var xy_value = 	x * x_period / this.noise_width + 
					y * y_period / this.noise_width;

	var t = this.turbulence(x, y, turb_size, 1);
	xy_value += turb_power * t / 256.0;

	var sine_value = 256 * Math.abs(Math.sin(xy_value + this.PI));
	return Math.floor(sine_value);
}

SmoothNoise.prototype.wood = function (x, y, x_period, y_period, turb_power, turb_size) {
	var turb_power = turb_power / 1.0;
	var turb_size = turb_size / 1.0;

	var x_value = (x - this.noise_width / 2) / this.noise_width;
	var y_value = (y - this.noise_width / 2) / this.noise_width;
	var distance_value = Math.sqrt(x_value * x_value + y_value * y_value) + 
						 turb_power * this.turbulence(x, y, turb_size, 1) / 256.0;
	var sine_value = 128.0 * Math.abs(Math.sin(x_period * y_period * 
											distance_value * this.PI));
	return Math.floor(sine_value);

}









