var WALL_WIDTH = 50;
var WALL_HEIGHT = WALL_WIDTH;

Wall = Entity.child();


Wall.prototype.construct = function(x, y, color) {
  this.x = x;
  this.y = y;

  if(color)
    this.color = color;
  else
    this.color = "Black";
}
Wall.prototype.draw = function() {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, WALL_WIDTH, WALL_HEIGHT);
}
