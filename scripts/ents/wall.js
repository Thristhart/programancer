var WALL_WIDTH = 50;
var WALL_HEIGHT = WALL_WIDTH;

/*
function Wall(x, y) {

  this.registerListener();
}*/

Wall = Entity.child();

//Wall.prototype = Object.create(Entity.prototype);
//
//
Wall.prototype.draw = function() {
  context.fillRect(this.x, this.y, WALL_WIDTH, WALL_HEIGHT);
}
