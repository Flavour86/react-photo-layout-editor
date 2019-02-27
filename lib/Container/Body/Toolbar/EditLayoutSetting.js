'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tip = require('./Tip');

var _Tip2 = _interopRequireDefault(_Tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditLayoutSetting = function (_React$Component) {
	_inherits(EditLayoutSetting, _React$Component);

	function EditLayoutSetting(props) {
		_classCallCheck(this, EditLayoutSetting);

		var _this = _possibleConstructorReturn(this, (EditLayoutSetting.__proto__ || Object.getPrototypeOf(EditLayoutSetting)).call(this, props));

		_this.state = _extends({}, props.defaultSetting, props.setting);
		return _this;
	}

	_createClass(EditLayoutSetting, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			var props = this.props;


			this.setState(_extends({}, props.defaultSetting, props.setting));
		}
	}, {
		key: '_submit',
		value: function _submit() {
			this.props.submit(this.state);
		}
	}, {
		key: '_reset',
		value: function _reset() {
			this.setState(_extends({}, this.props.defaultSetting));
		}
	}, {
		key: '_change',
		value: function _change(e) {
			var value = e.target.value || '';
			switch (e.target.type) {
				case 'text':
					this.setState(_defineProperty({}, e.target.name, value));
					break;
				case 'number':
					value = value || 0;
					this.setState(_defineProperty({}, e.target.name, parseInt(value)));
					break;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var state = this.state;


			return _react2.default.createElement(
				_Tip2.default,
				{ tipTitle: '\u5927\u5C0F\u8BBE\u7F6E', submit: this._submit.bind(this), reset: this._reset.bind(this) },
				_react2.default.createElement(
					'dl',
					null,
					_react2.default.createElement(
						'dt',
						null,
						_react2.default.createElement(
							'label',
							{ htmlFor: 'frm_width' },
							'\u5217\u5BBD'
						)
					),
					_react2.default.createElement(
						'dd',
						{ className: 'ple-type-input' },
						_react2.default.createElement('input', {
							type: 'number', name: 'width', id: 'frm_width',
							min: 1, max: 999, maxLength: 3,
							value: state.width,
							onChange: function onChange(e) {
								return _this2._change(e);
							},
							style: { width: '109px' },
							required: true }),
						_react2.default.createElement(
							'span',
							null,
							'px'
						)
					)
				),
				_react2.default.createElement(
					'dl',
					null,
					_react2.default.createElement(
						'dt',
						null,
						_react2.default.createElement(
							'label',
							{ htmlFor: 'frm_height' },
							'\u5217\u9AD8'
						)
					),
					_react2.default.createElement(
						'dd',
						{ className: 'ple-type-input' },
						_react2.default.createElement('input', {
							type: 'number', name: 'height', id: 'frm_height',
							min: 1, max: 999,
							value: state.height,
							onChange: function onChange(e) {
								return _this2._change(e);
							},
							style: { width: '109px' },
							required: true }),
						_react2.default.createElement(
							'span',
							null,
							'px'
						)
					)
				),
				_react2.default.createElement(
					'dl',
					null,
					_react2.default.createElement(
						'dt',
						null,
						_react2.default.createElement(
							'label',
							{ htmlFor: 'frm_column' },
							'\u5217\u6570'
						)
					),
					_react2.default.createElement(
						'dd',
						{ className: 'ple-type-input' },
						_react2.default.createElement('input', {
							type: 'number', name: 'column', id: 'frm_column',
							min: 1, max: 99,
							value: state.column,
							onChange: function onChange(e) {
								return _this2._change(e);
							},
							style: { width: '109px' },
							required: true }),
						_react2.default.createElement(
							'span',
							null,
							'ea'
						)
					)
				)
			);
		}
	}]);

	return EditLayoutSetting;
}(_react2.default.Component);

EditLayoutSetting.displayName = 'EditLayoutSetting';
EditLayoutSetting.defaultProps = {
	submit: function submit(e) {},
	setting: null,
	defaultSetting: {
		width: 100,
		height: 100,
		column: 5,
		outerMargin: 10,
		innerMargin: 10
	}
};
exports.default = EditLayoutSetting;