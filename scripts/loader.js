var prefix = "/programancer/scripts/"

var eventDOMTracker = document.createElement("div");


function createScriptElement(filename) {
  var script = document.createElement("script");
  script.src = prefix + filename;


  script.addEventListener("load", function() { 
    var scriptLoadEvent = new CustomEvent("scriptLoad", {
      detail: {
        filename: filename
      },
      bubbles: true,
      cancelable: false
    });
    
    eventDOMTracker.dispatchEvent(scriptLoadEvent);

  });


  document.body.appendChild(script);
}


var requireTargets = [];
function require(scriptName) {
  var filename = scriptName + ".js";

  requireTargets.push(filename);
  if(requireTargets.length == 1)
  {
    doLoad(filename);
  }
}

// seperated to another function to allow room for activities
function doLoad(filename) {
  createScriptElement(filename);
}

eventDOMTracker.addEventListener("scriptLoad", function(event) { 
  if(requireTargets.shift() && requireTargets.length > 0)
    doLoad(requireTargets[0]);
});
