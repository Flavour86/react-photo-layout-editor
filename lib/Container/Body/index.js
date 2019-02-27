'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GridLayout = require('./GridLayout');

var _GridLayout2 = _interopRequireDefault(_GridLayout);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = function (_React$Component) {
	_inherits(Body, _React$Component);

	function Body(props) {
		_classCallCheck(this, Body);

		var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

		_this.state = {
			status: false
		};
		_this.changeSettingHandle = _this.changeSettingHandle.bind(_this);
		return _this;
	}

	_createClass(Body, [{
		key: 'changeSettingHandle',
		value: function changeSettingHandle() {
			var _this2 = this;

			this.setState({
				status: true
			});

			setTimeout(function () {
				_this2.setState({
					status: false
				});
			}, 200);
		}
	}, {
		key: 'render',
		value: function render() {
			var status = this.state.status;

			return _react2.default.createElement(
				'div',
				{ className: 'ple-container' },
				_react2.default.createElement(
					'div',
					{ className: 'ple-body' },
					_react2.default.createElement(_Toolbar2.default, { changeSetting: this.changeSettingHandle }),
					_react2.default.createElement(_GridLayout2.default, { settingStatus: status })
				)
			);
		}
	}]);

	return Body;
}(_react2.default.Component);

Body.displayName = 'Body';
exports.default = Body;