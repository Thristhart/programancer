BackgroundElement = Entity.child();

// Ensure that the element doesn't subscribe to the update loop, and instead subscribes to
// the background update call
BackgroundElement.prototype.registerListener = function() {
  me = this;
  canvas.addEventListener("renderBackground", function() {me.draw(backgroundContext)});
}
