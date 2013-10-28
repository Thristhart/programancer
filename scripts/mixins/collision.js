CollisionMixin = {
  test_collide: function(other) {
    if(!other)
      return false;
    return (other.x + other.width  > this.x &&
            other.y + other.height > this.y &&
            this.x + this.width > other.x &&
            this.y + this.height > other.y);
  },
  resolve_dynamic_collision: function(other) {
    var diff = this.find_collision_components(other);
    if(!diff)
      return false; // CANNOT RESOLVE!

    var my_distance = diff.scalar(-.5);
    var their_distance = diff.scalar(.5);

    this.x += my_distance.x;
    this.y += my_distance.y;

    other.x += their_distance.x;
    other.y += their_distance.y;
    
    return true;
  },
  resolve_static_collision: function(other) {
    var diff = this.find_collision_components(other);
    if(!diff)
      return false; // CANNOT RESOLVE!

    this.x -= diff.x;
    this.y -= diff.y;

    return true;
  },
  // A: LS->oRS
  // B: RS->oLS
  // C:TS->OBS
  // D:BS->OTS
  find_collision_components: function(other) {
    var rightVector = new Vector(this.x - (other.x + other.width), 0);
    var leftVector = new Vector((this.x + this.width) - other.x, 0);
    var botVector = new Vector(0, this.y - (other.y + other.height));
    var topVector = new Vector(0, (this.y + this.height) - other.y);

    var options = [];
    if(!other.right_blocked)
      options.push(rightVector);
    
    if(!other.left_blocked)
      options.push(leftVector);
    
    if(!other.bot_blocked)
      options.push(botVector);

    if(!other.top_blocked)
      options.push(topVector);

    if(!other.top_right_blocked)
      options.push(topVector.plus(rightVector));
    
    if(!other.top_left_blocked)
      options.push(topVector.plus(leftVector));
    
    if(!other.bot_right_blocked)
      options.push(botVector.plus(rightVector));
    
    if(!other.bot_left_blocked)
      options.push(botVector.plus(leftVector));
    
    var shortest = Vector.findShortest(options);

    if(shortest)
      return shortest;
    
    return null; // ERROR! No valid direction
  }

}
