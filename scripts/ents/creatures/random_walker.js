RandomWalker = MovingEntity.child();
RandomWalker.prototype.constructors.push(function() {
  this.jerk = .2;
  this.assign_facing();
});
RandomWalker.prototype.update_functions.push(function(time) {
  this.speed = 0.2;
  this.facing = this.facing.plus(this.acceleration);
  this.facing.normalize();
  //this.facing = this.target_facing;
});
RandomWalker.prototype.assign_facing = function() {
  this.target_facing = new Vector(1 - Math.random() * 2, 1 - Math.random() * 2);
  this.target_facing.normalize();
  var diff = this.target_facing.minus(this.facing);
  this.acceleration = diff.scalar(this.jerk);
}

RandomWalker.prototype.onCollide = function(other) {
  if(this.last_collide == other)
    return;
  this.last_collide = other;
  this.assign_facing();
}
RandomWalker.prototype.draw = function() {
  context.beginPath();
  context.moveTo(this.x + this.width / 2, this.y + this.height / 2);
  var goofy_line = this.facing.scalar(30);
  context.lineTo(this.x + goofy_line.x, this.y + goofy_line.y);
  context.closePath();
  context.strokeStyle = "10px solid black";
  context.stroke();
  context.fillRect(this.x, this.y, this.width, this.height);
}
