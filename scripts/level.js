function Level(width, height) {
  this.width = width;
  this.height = height;

  this.buildWallArray();

  backgroundCanvas.width = width * WALL_WIDTH;
  backgroundCanvas.height = height * WALL_HEIGHT;
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

Level.prototype.destroy = function() {
  for(var x = 0; x < this.width; x++) {
    for(var y = 0; y < this.height; y++) {
      var wall = this.walls[x][y];
      if(wall)
        wall.removeListener();
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
var currentLevel;
Level.load = function(name) {
  var lastLevel;
  if(currentLevel)
    lastLevel = currentLevel;
  require(name, 'level', function() {
    if(lastLevel) {
      lastLevel.destroy();
      delete(lastLevel);
    }
    registerRenderCleanup();
    triggerBackgroundRender();
  });
}
