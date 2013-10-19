var keyStatus = {
  LEFT: false,
  RIGHT: false,
  UP: false,
  DOWN: false
}
canvas.addEventListener("keydown", function(event) {
  var movement = false;
  switch(event.keyCode) {
    case 37: // Left Arrow
    case 65: // A
      if(!keyStatus.LEFT)
        movement = true;
      keyStatus.LEFT = true;
      break;
    case 38: // Up Arrow
    case 87: // W
      if(!keyStatus.UP)
        movement = true;
      keyStatus.UP = true;
      break;
    case 39: // Right Arrow
    case 68: // D
      if(!keyStatus.RIGHT)
        movement = true;
      keyStatus.RIGHT = true;
      break;
    case 40: // Down Arrow
    case 83: // S
      if(!keyStatus.DOWN)
        movement = true;
      keyStatus.DOWN = true;
      break;
  }
  if(movement)
    triggerMovementEvent();

});
canvas.addEventListener("keyup", function(event) {
  var movement = false;
  switch(event.keyCode) {
    case 37: // Left Arrow
    case 65: // A
      keyStatus.LEFT = false;
      movement = true;
      break;
    case 38: // Up Arrow
    case 87: // W
      keyStatus.UP = false;
      movement = true;
      break;
    case 39: // Right Arrow
    case 68: // D
      keyStatus.RIGHT = false;
      movement = true;
      break;
    case 40: // Down Arrow
    case 83: // S
      keyStatus.DOWN = false;
      movement = true;
      break;
  }
  if(movement)
    triggerMovementEvent();
});

function triggerMovementEvent() {
  var movementEvent = new CustomEvent("movement", {
    detail: {
      keys: keyStatus
    },
    bubbles: true,
    cancelable: false
  });

  keyboardRegister.dispatchEvent(movementEvent);
}
var keyboardRegister = document.createElement("div"); 
