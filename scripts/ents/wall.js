var WALL_WIDTH = 50;
var WALL_HEIGHT = WALL_WIDTH;

Wall = BackgroundElement.child();


Wall.prototype.construct = function(x, y, color) {
  this.x = x;
  this.y = y;

  this.width = WALL_WIDTH;
  this.height = WALL_HEIGHT;

  if(color)
    this.color = color;
  else
    this.color = "Black";
  
  interactible_entities.push(this);
}
Wall.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, WALL_WIDTH, WALL_HEIGHT);
}
