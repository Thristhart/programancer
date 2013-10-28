// All movement values are on a scale of pixels-per-millisecond
// Additionally, one pixel ~= 1/50th of a meter
// Therefore, walking speed is roughly .004

MovingEntity = Entity.child();
MovingEntity.extend(CollisionMixin);

MovingEntity.prototype.constructors.push(function(x, y) {
  this.facing = new Vector(1, 0);
  this.speed = 0;

  var me = this;
  tickRegister.addEventListener("tick", function(event) {
    me.doMovement(event.detail.time);
  });
});

MovingEntity.prototype.doMovement = function(time) {
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += this.facing.x * this.speed * time;
  this.y += this.facing.y * this.speed * time;

  if(this.x != this.oldX || this.y != this.oldY) {
    this.checkCollision();
  }
}

MovingEntity.prototype.checkCollision = function() {
  this.clearWalls();

  for(var i = 0; i < interactible_entities.length; i++)
    this.checkCollisionAgainstEnt(interactible_entities[i]);
}
MovingEntity.prototype.clearWalls = function() {
  var worldX = Math.floor((this.x + this.width/2) / WALL_WIDTH);
  var worldY = Math.floor((this.y + this.height/2) / WALL_HEIGHT);


  for(var x = -1; x < 2; x++)
    for(var y = -1; y < 2; y++)
      this.checkCollisionAgainstWall(worldX + x, worldY + y);
}

MovingEntity.prototype.checkCollisionAgainstWall = function(wallX, wallY) {
  return this.checkCollisionAgainstEnt(currentLevel.getWallAt(wallX, wallY));
}

MovingEntity.prototype.checkCollisionAgainstEnt = function(entity) { 
  if(this.test_collide(entity)) {
    var did_resolve;
    if(entity instanceof Wall)
      did_resolve = this.resolve_static_collision(entity);
    else {
      did_resolve = this.resolve_dynamic_collision(entity);
      if(did_resolve && entity.checkCollision)
        entity.clearWalls(); // since we've moved them by colliding, they should recheck their collision now
    }
    if(!did_resolve) {
      me.x = me.oldX;
      me.y = me.oldY;
    }
  }
}
