var lastTickTime = new Date().getTime();
function triggerTick() {
  var curTime = new Date().getTime();
  var tickEvent = new CustomEvent("tick", {
    detail: {time: curTime - lastTickTime},
    bubbles: false
  });
  tickRegister.dispatchEvent(tickEvent);
  lastTickTime = curTime;
}

var tickLoop = setInterval(triggerTick, 16.667);

var tickRegister = document.createElement("div");
