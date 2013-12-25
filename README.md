Sparky
=============================
Sparky is a simple node.js library for communicating with a Spark core. Sparky wraps the four default methods (analogRead, analogWrite, digitalRead, digitalWrite), and has a run method for any custom firmware methods on your SparkCore.

Installation
-----------------------------
```
npm install sparky
```

Usage
-----------------------------
Turn the built-in LED on.

```
var Sparky = require('sparky')

var core1 = new Sparky({
	deviceId: 'your device id',
	token: 'your access token',
})
core1.digitalWrite('D7', 'HIGH');
```

Blinking the built-in LED.

```
var Sparky = require('sparky')

var core1 = new Sparky(config);
var val = 0;
(function toggle() {
	val = 1 - val;
	core1.digitalWrite('D7', val);
	setTimeout(toggle, 1000);
})();
```

Run a custom command from your SparkCore firmware.
```
var Sparky = require('sparky')

var core1 = new Sparky({
	deviceId: 'your device id',
	token: 'your access token',
})
core1.run('MyCustomFunction', 'what,ever,you,want', callback);
```

Read a variable from your SparkCore. See the examples/read_var code for an example sketch.
```
var Sparky = require('sparky')

var core1 = new Sparky({
	deviceId: 'your device id',
	token: 'your access token',
})

core1.get('MyCustomVariable', function(response) {
	// Full response of the SparkCore API resides in the first argument
});
```

