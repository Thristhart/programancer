function Level(width, height) {
  this.width = width;
  this.height = height;

  this.buildWallArray();
}

Level.prototype.buildWallArray = function() {
  this.walls = [];
  for(var x = 0; x < this.width; x++) {
    this.walls[x] = [];
    for(var y = 0; y < this.height; y++) {
      this.walls[x][y] = null;
    }
  }
}

Level.prototype.getWallAt = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    return "OUT OF BOUNDS";

  return this.walls[x][y];
}

Level.prototype.addWall = function(x, y, type) {
  this.walls[x][y] = new type(x * WALL_WIDTH, y * WALL_HEIGHT);
}

Level.prototype.fromStringArray = function(lines) {
  var types = {
    "x": Wall,
  }
  for(var y = 0; y < lines.length; y++) {
    for(var x = 0; x < lines[y].length; x++) {
      var type = types[lines[y][x]];
      if(type)
        this.addWall(x, y, type);
    }
  }
}
