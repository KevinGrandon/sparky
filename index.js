var exec = require('child_process').exec;
var child;

function Sparky(config) {

	// If no config obj exists, make one
	if (!config) {
		config = {};
	}

	// Check the process.env if values aren't passed in the config
	if (!config.deviceId && process.env.SPARK_DEVICE_ID) {
		config.deviceId = process.env.SPARK_DEVICE_ID;
	}
	if (!config.token && process.env.SPARK_TOKEN) {
		config.token = process.env.SPARK_TOKEN;
	}

	// Bail if we don't have config values
	if (!config.deviceId) {
		console.log('Device id not found.');
		process.exit(1);
	}
	if (!config.token) {
		console.log('Spark token not found.');
		process.exit(1);
	}

	this.config = config;

	this.pinThrottle = {};
}

Sparky.prototype = {

	debug: function() {
		if (this.config.debug) {
			console.log.apply(console, arguments)
		}
	},

	_command: function(command, params, callback) {

		params = params || '';

		// Set a throttle if no throttle is set for the current args
		if (this.nextThrottle && !this.pinThrottle[params]) {
			this.pinThrottle[params] = Date.now() + this.nextThrottle;
			delete this.nextThrottle;
		}

		// Return early if we have a throttle for this pin combination
		if (this.pinThrottle[params] && Date.now() < this.pinThrottle[params]) {
			return false;
		} else  if(this.pinThrottle[params]) {
			delete this.pinThrottle[params];
		}

		command = command.toLowerCase();
		command = 'curl https://api.spark.io/v1/devices/' + this.config.deviceId + '/' + command + '   -d access_token=' + this.config.token + ' -d args=' + params;
		this.debug('Running command: ', command);
		child = exec(command,
			function (error, stdout, stderr) {
			this.debug('stdout: ' + stdout);
			this.debug('stderr: ' + stderr);
			if (error !== null) {
				this.debug('exec error: ' + error);
			}
			if (callback) {
				try {
					callback(JSON.parse(stdout).return_value);
				}
				catch (err) {
					callback(undefined);
				}
			}
		}.bind(this));
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
		this._command('digitalWrite', pin + ',' + value);
	},

	analogWrite: function(pin, value) {
		this._command('analogWrite', pin + ',' + value);
	},

	digitalRead: function(pin, callback) {
		this._command('digitalRead', pin, callback);
	},

	analogRead: function(pin, callback) {
		this._command('analogRead', pin, callback);
	},

	/**
	 * Runs a custom spark core command
	 */
	run: function(command, params, callback) {
		this._command(command, params, callback);
	},

	/**
	 * Do not send the request with the same args to the server within x ms
	 * @param {Integer} Number of seconds to throttle
	 */
	throttle: function(ms) {
		// Set the next throttle value
		// The logic to set this actually happens whenever we send the next command
		this.nextThrottle = ms;
		return this;
	}
};

module.exports = Sparky;
