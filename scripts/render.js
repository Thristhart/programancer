var canvas = document.getElementById("display");
var context = canvas.getContext("2d");
var backgroundCanvas = document.getElementById("backgroundCanvas");
var backgroundContext = backgroundCanvas.getContext("2d");

var WIDTH = 600;
var HEIGHT = 600;

function triggerRenderEvents() {
  clear(); // clear the screen before rendering

  context.save();
  context.translate(-cameraX, -cameraY);
  context.scale(cameraScale, cameraScale);

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
  backgroundCanvas.width = backgroundCanvas.width; // clear the background
  canvas.dispatchEvent(renderEvent);
}


function renderLoop() {
  window.requestAnimationFrame(function(time) {
    triggerRenderEvents();

    renderLoop();
  });
}



function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

canvas.addEventListener("renderLoop", function() {
  context.drawImage(backgroundCanvas, 0, 0);
});

var renderCleanupEvent;
function registerRenderCleanup() {
  if(renderCleanupEvent)
    canvas.removeEventListener("renderLoop", renderCleanupEvent);

  canvas.addEventListener("renderLoop", function() {
    context.restore();
  });
}

