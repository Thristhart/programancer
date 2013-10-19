var player = null; // the current player

Player = ControllableEntity.child();

Player.prototype.constructors.push(function() {
  cameraFocus = this; // make the camera follow us
});

Player.prototype.draw = function() {
  context.fillStyle = "blue";
  context.fillRect(this.x, this.y, this.width, this.height);
}

function createPlayerAt(x, y) {
  player = new Player(WALL_WIDTH * x, WALL_HEIGHT * y);
}
