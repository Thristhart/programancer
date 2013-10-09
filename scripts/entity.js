
function Entity() {
  this.construct.apply(this, arguments);

  this.registerListener();
}
Entity.prototype.construct = function(x, y) {
  this.x = x;
  this.y = y;
}
Entity.prototype.registerListener = function() {
  var me = this;
  canvas.addEventListener("renderLoop", function() {me.draw(context)});
}

Entity.prototype.draw = function(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(this.x, this.y, 20, 20);
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

require('ents/background_element');
require('ents/wall');
