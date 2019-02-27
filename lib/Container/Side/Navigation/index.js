'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../../Body/Toolbar/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNavigation = function (_React$Component) {
	_inherits(SideNavigation, _React$Component);

	function SideNavigation(props) {
		_classCallCheck(this, SideNavigation);

		var _this = _possibleConstructorReturn(this, (SideNavigation.__proto__ || Object.getPrototypeOf(SideNavigation)).call(this, props));

		_this.comps = {
			inputFile: null
		};
		_this.state = {
			timestamp: Date.now()
		};
		return _this;
	}

	/**
  * Upload images
  *
  * @param {Event} e
  */


	_createClass(SideNavigation, [{
		key: 'upload',
		value: function upload(e) {
			this.props.onUpload(e.target.files);

			this.setState({
				timestamp: Date.now()
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props,
			    state = this.state,
			    comps = this.comps;


			return _react2.default.createElement(
				'nav',
				{ className: 'ple-sideNavigation ple-side__navigation' },
				_react2.default.createElement(
					'div',
					{ className: 'ple-sideNavigation__wrap' },
					_react2.default.createElement(_Button2.default, { title: '\u6DFB\u52A0\u5230\u5DE6\u4FA7', onClick: props.onAttach }),
					_react2.default.createElement(_Button2.default, { title: '\u5168\u9009', onClick: props.onToggleSelect }),
					_react2.default.createElement(
						'span',
						{ title: '\u4E0A\u4F20\u56FE\u7247', key: state.timestamp, style: { display: "none" } },
						_react2.default.createElement('input', {
							ref: function ref(r) {
								comps.inputFile = r;
							},
							type: 'file',
							accept: 'image/*',
							onChange: function onChange(e) {
								return _this2.upload(e);
							}, multiple: true }),
						_react2.default.createElement(
							'i',
							{ className: 'ple-sp-ico ple-ico-upload ple-abs' },
							'upload images'
						)
					),
					_react2.default.createElement(_Button2.default, { title: '\u5220\u9664', onClick: props.onRemove })
				)
			);
		}
	}]);

	return SideNavigation;
}(_react2.default.Component);

SideNavigation.displayName = 'Navigation';
SideNavigation.defaultProps = {
	onRemove: function onRemove() {},
	onToggleSelect: function onToggleSelect() {},
	onAttach: function onAttach() {},
	onUpload: function onUpload() {}
};
exports.default = SideNavigation;