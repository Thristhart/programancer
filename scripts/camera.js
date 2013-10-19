var cameraX = 0;
var cameraY = 0;
var cameraScale = 1;
var cameraWidth = WIDTH;
function translateCamera(xDiff, yDiff) {
  cameraX += xDiff;
  cameraY += yDiff;
}

function scaleCamera(scale) {
  cameraScale *= scale;
  cameraWidth *= scale;
}

function moveCameraTo(newX, newY) {
  translateCamera(newX - cameraX, newY - cameraY);
}

function setCameraScale(newScale) {
  scaleCamera(newScale / cameraScale);
}

var cameraFocus = null;
function focusCamera() {
  if(!cameraFocus || !currentLevel)
    return;

  var cameraRadius = cameraWidth/2;
  
  cameraX = cameraFocus.x - cameraRadius;
  cameraY = cameraFocus.y - cameraRadius;

  var leftEdge = cameraX;
  var rightEdge = cameraX + cameraWidth;
  var topEdge = cameraY;
  var botEdge = cameraY + cameraWidth;

  if(leftEdge < 0)
    cameraX = 0;
  if(rightEdge > currentLevel.width * WALL_WIDTH)
    cameraX -= rightEdge - (currentLevel.width * WALL_WIDTH);
  if(topEdge < 0)
    cameraY = 0;
  if(botEdge > currentLevel.height * WALL_HEIGHT)
    cameraY -= botEdge - (currentLevel.height * WALL_HEIGHT);
}

canvas.addEventListener("renderLoop", focusCamera);
