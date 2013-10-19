require('events');

require('level');

require('requestAnimationFrame_polyfill');
require('render');
require('camera');

require('input/mouse');
require('input/keyboard');

require('vector');
require('entity');
  require('ents/moving');
    require('ents/controllable');
      require('ents/player');

  require('ents/background_element');
    require('ents/wall');

  require('ents/fps_counter');



require('startup');
