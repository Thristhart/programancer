// this triggers every time the mouse moves, we want to try to make this processing-light
// only use simple comparisons for now, is a quadtree worth it?
// if we don't allow interaction with walls, this becomes a lot less intense...
canvas.addEventListener("mousemove", function(event) {
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  for(var i = 0; i < interactible_entities.length; i++) {
    if( interactible_entities[i].x < x &&
        interactible_entities[i].y < y &&
        interactible_entities[i].x + interactible_entities[i].width > x &&
        interactible_entities[i].y + interactible_entities[i].height > y)
      doHover(interactible_entities[i], x, y);
  }
});

function doHover(target, mouseX, mouseY) {
  console.log(target.x, target.y);
}
