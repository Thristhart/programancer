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

    renderLoop();
  });
}


function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

renderLoop();
