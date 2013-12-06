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
	_command: function(command, pin, value, callback) {
		command = command.toLowerCase();
		command = 'curl https://api.spark.io/v1/devices/' + this.config.deviceId + '/' + command + '   -d access_token=' + this.config.token + ' -d params=' + pin + (value ? ',' + value : '');
		debug('Running command: ', command);
		child = exec(command,
			function (error, stdout, stderr) {
			debug('stdout: ' + stdout);
			debug('stderr: ' + stderr);
			if (error !== null) {
			  debug('exec error: ' + error);
			}
			if (callback) {
				callback(JSON.parse(stdout).return_value);
			}
		});
	},

	/**
	 * Formats values to expected values,
	 * 1, true -> 'HIGH'
	 * 0, false -> 'LOW'
	 */
	formatDigitalValue: function(value) {
		return value ? 'HIGH' : 'LOW';
	},

	digitalWrite: function(pin, value) {
		value = this.formatDigitalValue(value);
		this._command('digitalWrite', pin, value);
	},

	analogWrite: function(pin, value) {
		this._command('analogWrite', pin, value);
	},

	digitalRead: function(pin, callback) {
		this._command('digitalRead', pin, null, callback);
	},

	analogRead: function(pin, callback) {
		this._command('analogRead', pin, null, callback);
	}
}

exports.Sparky = Sparky
