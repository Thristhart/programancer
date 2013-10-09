var canvas = document.getElementById("display");
var context = canvas.getContext("2d");
var backgroundCanvas = document.getElementById("backgroundCanvas");
var backgroundContext = backgroundCanvas.getContext("2d");

var WIDTH = 600;
var HEIGHT = 600;

function triggerRenderEvents() {
  clear(); // clear the screen before rendering
  var renderEvent = new CustomEvent("renderLoop", {
    detail: {milliseconds: new Date().getTime()},
    bubbles: false
  });
  canvas.dispatchEvent(renderEvent);
}
function triggerBackgroundRender() {
  var renderEvent = new CustomEvent("renderBackground", {
    detail: {milliseconds: new Date().getTime()},
    bubbles: false
  });
  canvas.dispatchEvent(renderEvent);
}


function renderLoop() {
  window.requestAnimationFrame(function(time) {
    triggerRenderEvents();

    renderLoop();
  });
}

var cameraX = 0;
var cameraY = 0;
var cameraScale = 1;
var cameraWidth = WIDTH;
function translateCamera(xDiff, yDiff) {
  cameraX += xDiff;
  cameraY += yDiff;
  context.translate(-xDiff, -yDiff);
}

function scaleCamera(scale) {
  cameraScale *= scale;
  context.scale(scale, scale);
}

function moveCameraTo(newX, newY) {
  translateCamera(newX - cameraX, newY - cameraY);
}

function setCameraScale(newScale) {
  scaleCamera(newScale / cameraScale);
}


function clear() {
  context.clearRect(0, 0, (WIDTH + cameraX) / cameraScale, (HEIGHT + cameraY) / cameraScale);
}

canvas.addEventListener("renderLoop", function() {
  context.drawImage(backgroundCanvas, 0, 0);
});

renderLoop();
