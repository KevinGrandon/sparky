/**
 * Checks the state of a button every 200ms
 */
var Sparky = require('sparky')
var config = require('./config')

var core1 = new Sparky(config)

function check() {
  core1.run('laststate', null, function(state) {
  	console.log('State is:', state);
  	setTimeout(check, 500);
  });
}
check();
