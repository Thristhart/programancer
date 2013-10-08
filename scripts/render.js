var canvas = document.getElementById("display");
var context = canvas.getContext("2d");

var WIDTH = 600;
var HEIGHT = 600;

function triggerRenderEvents() {
  clear(); // clear the screen before rendering
  renderEvent = new CustomEvent("renderLoop", {
    detail: {milliseconds: new Date().getTime()},
    bubbles: false
  });
  canvas.dispatchEvent(renderEvent);
}


function renderLoop() {
  window.requestAnimationFrame(function(time) {
    triggerRenderEvents();

    // FPS calc

    renderLoop();
  });
}

var fpsSamples = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
function drawFPS() {
  fpsSamples.shift();
  fpsSamples.push(fps);

  var avgFPS = 0;
  for(var i = 0; i < fpsSamples.length; i++)
    avgFPS += fpsSamples[i];
  avgFPS /= fpsSamples.length;
  
  context.fillStyle = "red";
  context.font = "14pt Segoe UI";
  context.fillText(Math.floor(avgFPS), 0, 20, 40);
}

function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

var lastFrameTime = 0;
var fps = 60;
function calculateFPS(renderEvent) {
  var time = renderEvent.detail.milliseconds;
  if(lastFrameTime != 0) {
    var diff = time - lastFrameTime;
    fps = 1000/diff;
  }
  lastFrameTime = time;
}
canvas.addEventListener("renderLoop", calculateFPS);
canvas.addEventListener("renderLoop", drawFPS);

renderLoop();
