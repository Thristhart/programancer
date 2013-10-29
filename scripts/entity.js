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
Entity.prototype.update_functions = [];
Entity.prototype.constructors.push(function() {
  var me = this;
  tickRegister.addEventListener("tick", function(event) {
    for(var i = 0; i < me.update_functions.length; i++) {
      me.update_functions[i].apply(me, [event.detail.time]);
    }
  });
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

Entity.extend = function(target) {
  for (var property in target) {
    if (target.hasOwnProperty(property)) {
      this.prototype[property] = target[property];
    }
  }
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
  child.prototype.update_functions = clone_array(target.prototype.update_functions);

  child.child = Entity.child; // making sure children can have children
  child.extend = Entity.extend; // children can be extended

  return child;
}

function clone_array(targetArray) {
  var clone = [];
  for(var i = 0; i < targetArray.length; i++) {
    clone.push(targetArray[i]);
  }
  return clone;
}

