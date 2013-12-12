/**
 * Sweeps a servo through all positions.
 * For a regular servo this will sweep from 0 - 180 degrees
 * For continuous servos,
 *  0  - Counter-clockwise
 *  90 - Stop
 *  180 - Clockwise
 */
var Sparky = require('sparky')
var config = require('./config')

var core1 = new Sparky(config)

var pos = 0;
var mod = 1;
function write() {
  core1.run('servowrite', 'A0,' + pos);
  pos += mod;
  if (pos === 180) mod = -1
  if (pos === 0) mod = 1
  setTimeout(write, 500);
}
write();
