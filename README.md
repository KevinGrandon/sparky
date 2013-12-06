Sparky
-----------------------------
Sparky is a simple node.js library for communicating with a Spark core.

Installation
=============================
```
npm install sparky
```

Usage
=============================

```
var Sparky = require('sparky').Sparky

var sparky = new Sparky({
	deviceId: 'your device id',
	token: 'your access token',
})
sparky.digitalWrite('D7', 'HIGH');
```

Blinking the built-in LED

```
var Sparky = require('sparky').Sparky

var sparky = new Sparky(config);
var val = 0;
(function toggle() {
	val = 1 - val;
	sparky.digitalWrite('D7', val);
	setTimeout(toggle, 1000);
})();
```