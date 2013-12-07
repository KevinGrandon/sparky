var exec = require('child_process').exec
var child

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

	this._throttle = 0
}

Sparky.prototype = {
	_command: function(command, params, callback) {

		if (this._throttle > 0 && Date.now() < this._throttle) {
			return false
		}
		this._throttle = 0

		command = command.toLowerCase()
		command = 'curl https://api.spark.io/v1/devices/' + this.config.deviceId + '/' + command + '   -d access_token=' + this.config.token + ' -d params=' + params
		debug('Running command: ', command)
		child = exec(command,
			function (error, stdout, stderr) {
			debug('stdout: ' + stdout)
			debug('stderr: ' + stderr)
			if (error !== null) {
			  debug('exec error: ' + error)
			}
			if (callback) {
				callback(JSON.parse(stdout).return_value)
			}
		})
	},

	/**
	 * Formats values to expected values,
	 * 1, true -> 'HIGH'
	 * 0, false -> 'LOW'
	 */
	formatDigitalValue: function(value) {
		return value ? 'HIGH' : 'LOW'
	},

	digitalWrite: function(pin, value) {
		value = this.formatDigitalValue(value)
		this._command('digitalWrite', pin + ',' + value)
	},

	analogWrite: function(pin, value) {
		this._command('analogWrite', pin + ',' + value)
	},

	digitalRead: function(pin, callback) {
		this._command('digitalRead', pin, callback)
	},

	analogRead: function(pin, callback) {
		this._command('analogRead', pin, callback)
	},

	/**
	 * Runs one a custom spark core command
	 */
	run: function(pin, params, callback) {
		this._command('analogRead', params, callback)
	},

	/**
	 * Only run the next command if we have not written to the same pin based on ms
	 * @param {Integer} Number of seconds to throttle
	 */
	throttle: function(ms) {
		// Set throttle if we don't have one set
		if (this._throttle === 0) {
			this._throttle = Date.now() + ms
		}
		return this
	}
}

exports.Sparky = Sparky
