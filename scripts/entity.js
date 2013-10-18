var interactible_entities = [];

function Entity() {
  for(var i = 0; i < this.constructors.length; i++) {
    this.constructors[i].apply(this, arguments);
  }

  this.registerListener();
}
Entity.prototype.constructors = [];
Entity.prototype.constructors.push(function(x, y) {
  this.x = x;
  this.y = y;

  this.width = 10;
  this.height = 10;
});
Entity.prototype.registerListener = function() {
  var me = this;
  this.listener = function(event) {
    me.draw(context, event);
  };

  canvas.addEventListener("renderLoop", this.listener);
}
Entity.prototype.removeListener = function() {
  canvas.removeEventListener("renderLoop", this.listener);
}

Entity.prototype.draw = function(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

Entity.child = function() {
  // NOTE: this is NOT a flexible function. it should apply to all cases of Entity but use caution
  var target = this;
  var child = function() {
    return target.apply(this, arguments);
  };
  
  child.prototype = Object.create(target.prototype);
  // ensure that children have a seperate reference for constructors
  child.prototype.constructors = clone_array(target.prototype.constructors); 

  child.child = Entity.child; // making sure children can have children

  return child;
}

function clone_array(targetArray) {
  var clone = [];
  for(var i = 0; i < targetArray.length; i++) {
    clone.push(targetArray[i]);
  }
  return clone;
}

require('vector');
require('ents/moving');
require('ents/controllable');
require('ents/background_element');
require('ents/wall');
require('ents/fps_counter');
