function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.getMagnitude();
}


Vector.prototype.getMagnitude = function() {
  this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);

  return this.magnitude;
}

Vector.prototype.getUnit = function() {
  if(this.magnitude == 0)
    return new Vector(0, 0);
  return new Vector(this.x / this.magnitude, this.y / this.magnitude);
}
// if x == 0 and y == 0, this is not going to work
Vector.prototype.setMagnitude = function(newMagnitude) {
  var unit = this.getUnit();

  this.x = newMagnitude * unit.x;
  this.y = newMagnitude * unit.y;

  this.magnitude = newMagnitude;
}
Vector.prototype.setRadians = function(newRadians) {
  this.x = Math.cos(newRadians) * this.magnitude;
  this.y = Math.sin(newRadians) * this.magnitude;

  this.radians = newRadians;
  this.degrees = Math.PI/180 * newRadians;
}
Vector.prototype.setDegrees = function(newDegrees) {
  this.setRadians(180/Math.PI * newDegrees);
}
