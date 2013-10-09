FPSCounter = Entity.child();

FPSCounter.prototype.construct = function(x, y) {
  this.x = x;
  this.y = y;
  this.samples = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
  this.avgFPS = 60;
  this.lastSampleMilliseconds = 0;
}
FPSCounter.prototype.draw = function(ctx, renderEvent) {
  var fps = 60;

  if(this.lastSampleMilliseconds != 0)
    fps = 1000/(renderEvent.detail.milliseconds - this.lastSampleMilliseconds);

  this.lastSampleMilliseconds = renderEvent.detail.milliseconds;

  this.samples.shift();
  this.samples.push(fps);

  var avg = 0;
  for(var i = 0; i < this.samples.length; i++)
    avg += this.samples[i];
  avg /= this.samples.length;

  this.avgFPS = avg;
  
  context.fillStyle = "red";
  context.font = "14pt Segoe UI";
  context.fillText(Math.floor(this.avgFPS), this.x, this.y, 40);
};

var FPS = new FPSCounter(0, 20);
