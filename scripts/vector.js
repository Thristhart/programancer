function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.getMagnitude();
}

Vector.findShortest = function(vectorArray) {
  var shortest = vectorArray[0];
  for(var i = 1; i < vectorArray.length; i++) {
    if(vectorArray[i].magnitude < shortest.magnitude)
      shortest = vectorArray[i];
  }
  return shortest;
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
  this.degrees = 180/Math.PI * newRadians;
}
Vector.prototype.setDegrees = function(newDegrees) {
  this.setRadians(Math.PI/180 * newDegrees);
}

Vector.prototype.getDegrees = function() {
  return this.degrees = this.getRadians() * 180/Math.PI;
}

Vector.prototype.getRadians = function() {
  return this.radians = Math.atan2(this.y, this.x);
}

Vector.prototype.normalize = function() {
  var unit = this.getUnit();

  this.set(unit.x, unit.y);
}

Vector.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;

  this.getMagnitude();
  this.getDegrees();
}

Vector.prototype.minus = function(other) {
  return new Vector(this.x - other.x, this.y - other.y);
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
}

Vector.prototype.scalar = function(scalar) {
  return new Vector(scalar * this.x, scalar * this.y);
}
