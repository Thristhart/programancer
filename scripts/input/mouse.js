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
      return doHover(interactible_entities[i], x, y);
  }
  // if we got here there is no hover target
  currentHoverTarget = null;
});

canvas.addEventListener("mousedown", function(event) {
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  if(currentHoverTarget) {
    doClickDown(currentHoverTarget, x, y);
  }
});
canvas.addEventListener("mouseup", function(event) {
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  if(currentClickDownTarget) {
    doClick(currentClickDownTarget, x, y);
  }
});

var currentHoverTarget;
function doHover(target, mouseX, mouseY) {
  var hoverEvent = new CustomEvent("hover", {
    detail: {
      x: mouseX,
      y: mouseY,
      target: target
    },
    bubbles: true,
    cancelable: false
  });

  currentHoverTarget = target;

  mouseHandler.dispatchEvent(hoverEvent);
}

var currentClickDownTarget;
function doClickDown(target, mouseX, mouseY) {
  currentClickDownTarget = target;

  var clickDownEvent = new CustomEvent("clickDown", {
    detail: {
      x: mouseX,
      y: mouseY,
      target: target
    },
    bubbles: true,
  });

  mouseHandler.dispatchEvent(clickDownEvent);
}

function doClick(target, mouseX, mouseY) {
  var clickEvent = new CustomEvent("click", {
    detail: {
      x: mouseX,
      y: mouseY,
      target: target
    },
    bubbles: true,
  });
  
  currentClickDownTarget = null; // once we've clicked, we should no longer have a target
  
  mouseHandler.dispatchEvent(clickEvent);
}

var mouseHandler = document.createElement("div");
