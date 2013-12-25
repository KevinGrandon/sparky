/**
 * Reads a variable every 500ms and outputs it to the console.
 * See the spark.ino for the arduino code to upload to the spark core.
 */
var Sparky = require('sparky')
var config = require('./config')

var core1 = new Sparky(config)

function check() {
  core1.get('laststate', function(state) {
  	console.log('State is:', state.TEMPORARY_allTypes.number);
  	setTimeout(check, 500);
  });
}
check();
