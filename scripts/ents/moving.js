// All movement values are on a scale of pixels-per-millisecond
// Additionally, one pixel ~= 1/50th of a meter
// Therefore, walking speed is roughly .004

MovingEntity = Entity.child();

MovingEntity.prototype.constructors.push(function(x, y) {
  this.facing = new Vector(1, 0);
  this.speed = 0;

  var me = this;
  tickRegister.addEventListener("tick", function(event) {
    me.doMovement(event.detail.time);
  });
});

MovingEntity.prototype.doMovement = function(time) {
  this.x += this.facing.x * this.speed * time;
  this.y += this.facing.y * this.speed * time;
}
