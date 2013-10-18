ControllableEntity = MovingEntity.child();

ControllableEntity.prototype.constructors.push(function(x, y) {
  this.x = x;
  this.y = y;

  var me = this;
  keyboardRegister.addEventListener("movement", function(event) {
    me.control(event.detail.keys);
  });
});

ControllableEntity.prototype.control = function(keys) {
  this.facing.set(keys.RIGHT - keys.LEFT, keys.DOWN - keys.UP);

  this.facing.normalize();
  if(this.facing.magnitude > 0)
    this.speed = 0.2;
  else
    this.speed = 0;
}
