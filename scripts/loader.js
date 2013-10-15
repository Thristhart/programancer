
var scriptPrefix = "/programancer/scripts/";
var levelPrefix = "/programancer/content/levels/";

var eventDOMTracker = document.createElement("div");


function createScriptElement(prefix, filename, callback) {
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
    if(callback)
      callback(filename);
  });


  document.body.appendChild(script);
  return script;
}


var requireTargets = [];
function require(scriptName, type, callback) {
  if(!type)
    type = "script";

  var scriptData = {};
  scriptData.filename = scriptName + ".js";
  scriptData.type = type;
  scriptData.callback = callback;

  requireTargets.push(scriptData);
  if(requireTargets.length == 1)
  {
    doLoad(scriptData.type, scriptData.filename, scriptData.callback);
  }
}

// seperated to another function to allow room for activities
function doLoad(type, filename, callback) {
  var prefix;
  switch(type) {
    case "script":
      prefix = scriptPrefix;
      break;
    case "level":
      prefix = levelPrefix;
      break;
  }
  createScriptElement(prefix, filename, callback);
}

eventDOMTracker.addEventListener("scriptLoad", function(event) { 
  if(requireTargets.shift() && requireTargets.length > 0)
    doLoad(requireTargets[0].type, requireTargets[0].filename, requireTargets[0].callback);
});
