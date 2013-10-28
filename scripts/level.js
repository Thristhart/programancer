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
Level.prototype.assign_blocking = function() {
  for(var x = 0; x < this.width; x++) {
    for(var y = 0; y < this.height; y++) {
      var wall = this.walls[x][y];
      if(!wall)
        continue;
      wall.left_blocked = false;
      wall.right_blocked = false;
      wall.top_blocked = false;
      wall.bot_blocked = false;
      wall.top_left_blocked = false;
      wall.top_right_blocked = false;
      wall.bot_left_blocked = false;
      wall.bot_right_blocked = false;
      if(x > 0) {
        if(this.walls[x - 1][y])
          wall.left_blocked = true;
        if(y > 0 && this.walls[x - 1][y - 1])
          wall.top_left_blocked = true;
        if(y < this.height - 1 && this.walls[x - 1][y + 1])
          wall.bot_left_blocked = true;
      }
      if(y > 0 && this.walls[x][y - 1])
        wall.top_blocked = true;
      if(x < this.width - 1) {
        if(this.walls[x + 1][y])
          wall.right_blocked = true;
        if(y > 0 && this.walls[x + 1][y - 1])
          wall.top_right_blocked = true;
        if(y < this.height - 1 && this.walls[x + 1][y + 1])
          wall.bot_right_blocked = true;
      }
      if(y < this.height - 1 && this.walls[x][y + 1])
        wall.bot_blocked = true;

      if(x == 0)
        wall.left_blocked = true;
      if(y == 0)
        wall.top_blocked = true;
      if(x == this.width)
        wall.right_blocked = true;
      if(y == this.height)
        wall.bot_blocked = true;
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
    currentLevel.assign_blocking();
    registerRenderCleanup();
    triggerBackgroundRender();
  });

}
