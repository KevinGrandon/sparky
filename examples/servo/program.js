var Sparky = require('sparky')
var config = require('./config')

var core1 = new Sparky(config)

var val = 0;
(function toggle() {
	val = 180 - val;
	core1.run('servowrite', 'A0,' + val);
	setTimeout(toggle, 3000);
})();
