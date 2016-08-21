var star_colors = [
	"251,171,82",
	"184,83,73",
	"201,128,210",
	"105,95,155",
	"54,105,170",
	"143,156,100",
	"52,97,94"
];

function Star(name, x, y, color) {
    this.name = name;
    this.x = x;
	this.y = y;
	this.radius = get_random_int(10, 40);
	this.color = color;

	this.draw_in_context = function(context) {
		context.fillRect(this.x, this.y, 1, 1);
		
		//context.beginPath();
		//context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
				
		var gradient = context.createRadialGradient(this.x,this.y,this.radius,
			this.x,this.y,0);

		gradient.addColorStop(0,"transparent");
		gradient.addColorStop(1,"rgba("+ this.color + ", 0.5)");
		context.fillStyle = gradient;

		context.globalCompositeOperation = "lighter";
		context.fillRect(this.x - this.radius, 
						 this.y - this.radius,
						 this.radius * 2,
						 this.radius * 2);
		context.globalCompositeOperation = "source-over";

		context.fillStyle = "#FFFFFF";
		context.font = "11px Courier";
		context.fillText(this.name, this.x + 5, this.y + 2);
	};
}
