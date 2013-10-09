
// The way I'm handling arguments is stupid and ugly!
// The reasoning behind it is that I want prototype.construct() to have variable amounts of args
// and not have to deal with the ugliness of an array.
// I am being ugly here so that I am not ugly in all the children of entity
function Entity(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  this.construct(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);

  this.registerListener();

}
Entity.prototype.construct = function(x, y) {
  this.x = x;
  this.y = y;
}
Entity.prototype.registerListener = function() {
  var me = this;
  canvas.addEventListener("renderLoop", function() {me.draw()});
}

Entity.prototype.draw = function() {
  context.fillStyle = "black";
  context.fillRect(this.x, this.y, 20, 20);
}

Entity.child = function() {
  // NOTE: this is NOT a flexible function. it should apply to all cases of Entity but use caution
  var target = this;
  var child = function() {
    return target.apply(this, arguments);
  };
  child.prototype = Object.create(target.prototype);
  child.child = Entity.child; // making sure children can have children

  return child;
}

require('ents/wall');
