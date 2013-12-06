var exec = require('child_process').exec;
var child;

function debug() {
	//console.log.apply(console, arguments)
}

function Sparky(config) {

	if (!config.deviceId) {
		console.log('Device id not found.')
	}

	if (!config.token) {
		console.log('Spark token not found.')
	}

	this.config = config
}

Sparky.prototype = {
	_command: function(command, pin, value) {
		command = command.toLowerCase();
		command = 'curl https://api.spark.io/v1/devices/' + this.config.deviceId + '/' + command + '   -d access_token=' + this.config.token + ' -d params=' + pin + ',' + value;
		debug('Running command: ', command);
		child = exec(command,
			function (error, stdout, stderr) {
			debug('stdout: ' + stdout);
			debug('stderr: ' + stderr);
			if (error !== null) {
			  debug('exec error: ' + error);
			}
		});
	},
	digitalWrite: function(pin, value) {
		this._command('digitalWrite', pin, value);
	},
	analogWrite: function(pin, value) {
		this._command('analogWrite', pin, value);
	}
}

exports.Sparky = Sparky
