'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import $ from 'jquery/dist/jquery.slim';

var _lib = require('../lib');

var libs = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
	function Keyboard() {
		var _this = this;

		_classCallCheck(this, Keyboard);

		this.eventName = 'PLE_' + libs.number.getTimeStamp();
		this.code = null;
		this.keyName = null;
		this.names = {
			17: 'CTRL',
			18: 'ALT',
			91: 'CMD',
			93: 'CMD',
			16: 'SHIFT'
		};

		// init key down event
		$(window).on('keydown.' + this.eventName, function (e) {
			return _this._keyDown(e);
		});
	}

	/**
  * apply
  *
  * @param {Number} code
  */


	_createClass(Keyboard, [{
		key: 'apply',
		value: function apply(code) {
			this.code = code;
			this.keyName = this.names[this.code] || null;
		}

		/**
   * key down event
   *
   * @param {Event} e
   */

	}, {
		key: '_keyDown',
		value: function _keyDown(e) {
			var _this2 = this;

			// apply keyCode
			this.apply(e.keyCode);

			// set events
			$(window).on('keyup.' + this.eventName, function () {
				return _this2._keyUp();
			}).on('contextmenu.' + this.eventName, function () {
				return _this2._keyUp();
			}).on('blur.' + this.eventName, function () {
				return _this2._keyUp();
			}).off('keydown.' + this.eventName);
		}

		/**
   * key up event
   *
   */

	}, {
		key: '_keyUp',
		value: function _keyUp() {
			var _this3 = this;

			// apply keyCode
			this.apply(null);

			// set events
			$(window).on('keydown.' + this.eventName, function (e) {
				return _this3._keyDown(e);
			}).off('contextmenu.' + this.eventName + ' keyup.' + this.eventName + ' blur.' + this.eventName);
		}

		/**
   * destroy event
   *
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			$(window).off('keydown.' + this.eventName + ' contextmenu.' + this.eventName + ' keyup.' + this.eventName + ' blur.' + this.eventName);
		}
	}]);

	return Keyboard;
}();

exports.default = Keyboard;