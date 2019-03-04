'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _reactSimpleColorpicker = require('react-simple-colorpicker');

var _reactSimpleColorpicker2 = _interopRequireDefault(_reactSimpleColorpicker);

var _actions = require('../../../actions');

var actions = _interopRequireWildcard(_actions);

var _lib = require('../../../lib');

var libs = _interopRequireWildcard(_lib);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _EditLayoutSetting = require('./EditLayoutSetting');

var _EditLayoutSetting2 = _interopRequireDefault(_EditLayoutSetting);

var _BorderSetting = require('./BorderSetting');

var _BorderSetting2 = _interopRequireDefault(_BorderSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// // import $ from 'jquery/dist/jquery.slim';


var Toolbar = function (_React$Component) {
	_inherits(Toolbar, _React$Component);

	function Toolbar(props) {
		_classCallCheck(this, Toolbar);

		var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

		_this.cacheCols = props.tree.body.setting.column;
		_this.state = {
			active: {
				setting: false,
				borderSetting: false,
				editBlockColor: false
			},
			visible: {
				setting: true,
				shuffle: false, //隐藏随机排版
				add: true,
				select: true,
				edit: false,
				removeImage: false,
				duplicate: false,
				removeBlock: false,
				editColor: false
			}
		};
		return _this;
	}

	_createClass(Toolbar, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var state = this.state,
			    props = this.props;


			var newState = Object.assign({}, state);
			var updated = false;

			// select block
			if (props.tree.body.activeBlock.length !== nextProps.tree.body.activeBlock.length) {
				var active = !!nextProps.tree.body.activeBlock.length;
				newState.visible = Object.assign({}, newState.visible, {
					edit: false,
					removeImage: false,
					duplicate: active,
					removeBlock: active,
					editColor: active
				});
				updated = true;
			}

			if (nextProps.tree.body.activeBlock[0]) {
				// check image block
				var isImage = false;
				nextProps.tree.body.activeBlock.some(function (k) {
					if (nextProps.tree.body.grid[k].image) {
						isImage = true;
						return true;
					}
				});

				// select image block
				var block = nextProps.tree.body.grid[nextProps.tree.body.activeBlock[0]];
				newState.visible = Object.assign({}, newState.visible, {
					removeImage: isImage,
					edit: !!(block && block.image)
				});
				updated = true;
			}

			if (updated) {
				this.setState(newState);
			}
		}
	}, {
		key: 'changeActive',
		value: function changeActive(keyName, userSW, event) {
			var _this2 = this;

			var state = this.state;

			var sw = userSW || !state.active[keyName];
			var cTarget = event ? event.currentTarget : null;

			if (sw) {
				$(document).on('click.pleToolbar', function (e) {
					if ($(e.target).closest('.ple-toolbar__pop').length) return;
					if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
						_this2.changeActive(keyName, false);
					}
				});
			} else {
				$(document).off('click.pleToolbar');
			}

			this.setState({
				active: _extends({}, state.active, _defineProperty({
					setting: false,
					borderSetting: false,
					editColor: false
				}, keyName, sw))
			});
		}
	}, {
		key: 'deactivate',
		value: function deactivate() {
			var _this3 = this;

			$(document).off('click.pleToolbar');
			return new Promise(function (reject) {
				_this3.setState({
					active: {
						setting: false,
						borderSetting: false,
						editColor: false
					}
				}, reject);
			});
		}

		/**
   * Submit edit setting
   *
   * @param {Object} state
   * @return {Boolean}
   */

	}, {
		key: 'submitEditSetting',
		value: function submitEditSetting(state, key) {
			var _this4 = this;

			this.props.changeSetting();
			// update setting
			this.props.dispatch(actions.body.updateSetting(state));

			// close palette
			libs.util.sleep(50).then(function () {
				return _this4.changeActive(key, false);
			});

			return false;
		}
	}, {
		key: 'filterProps',
		value: function filterProps(source, keys) {
			if (Object.prototype.toString.call(source) !== '[object Object]' || keys === undefined || keys === null) {
				throw '参数不合法！';
			}
			var obj = {};
			if (Object.prototype.toString.call(keys) === '[object String]' && source[keys]) {
				obj[keys] = source[keys];
			}

			if (Object.prototype.toString.call(keys) === '[object Array]') {
				keys.forEach(function (key) {
					if (source[key]) {
						obj[key] = source[key];
					}
				});
			}

			return obj;
		}
	}, {
		key: 'getImageBtnStatus',
		value: function getImageBtnStatus() {
			var activeBlock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var grid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			return !(activeBlock.length === 1 && grid[activeBlock[0]].image);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var state = this.state,
			    props = this.props;

			var activeBlockColor = '#fff';

			if (_typeof(props.tree.body.grid) === 'object' && libs.object.isArray(props.tree.body.activeBlock)) {
				var n = props.tree.body.activeBlock[0];
				activeBlockColor = props.tree.body.grid[n] && props.tree.body.grid[n].color ? props.tree.body.grid[n].color : props.setting.body.blockColor;
			}

			return _react2.default.createElement(
				'nav',
				{ className: 'ple-toolbar' },
				_react2.default.createElement(
					'div',
					{ className: 'ple-toolbar__wrap' },
					_react2.default.createElement(
						'div',
						{ className: 'ple-toolbar-item ple-toolbar-canvas' },
						_react2.default.createElement(
							'h5',
							null,
							'\u753B\u5E03\u8BBE\u7F6E'
						),
						_react2.default.createElement(
							_Button2.default,
							{
								className: (0, _classnames2.default)('ple-edit-setting ple-toolbar-item-button', {
									'ple-toolbar__block-active': state.active.setting
								}),
								onClick: function onClick(e) {
									e.persist();
									if (!state.active.setting) {
										_this5.deactivate().then(function () {
											_this5.changeActive('setting', null, e);
										});
									}
								},
								title: '\u5927\u5C0F' },
							_react2.default.createElement(_EditLayoutSetting2.default, {
								submit: function submit(e) {
									return _this5.submitEditSetting(e, 'setting');
								},
								setting: this.filterProps(props.tree.body.setting, ['width', 'height', 'column']),
								defaultSetting: this.filterProps(props.setting.body.setting, ['width', 'height', 'column']) })
						),
						_react2.default.createElement(
							_Button2.default,
							{
								className: (0, _classnames2.default)('ple-edit-setting ple-toolbar-item-button', {
									'ple-toolbar__block-active': state.active.borderSetting
								}),
								onClick: function onClick(e) {
									e.persist();
									if (!state.active.borderSetting) {
										_this5.deactivate().then(function () {
											_this5.changeActive('borderSetting', null, e);
										});
									}
								},
								title: '\u8FB9\u6846' },
							_react2.default.createElement(_BorderSetting2.default, {
								submit: function submit(e) {
									return _this5.submitEditSetting(e, 'borderSetting');
								},
								setting: this.filterProps(props.tree.body.setting, ['outerMargin', 'innerMargin', 'bgColor']),
								defaultSetting: this.filterProps(props.setting.body.setting, ['outerMargin', 'innerMargin', 'bgColor']) })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'ple-toolbar-item ple-toolbar-canvas' },
						_react2.default.createElement(
							'h5',
							null,
							'\u533A\u5757\u8BBE\u7F6E'
						),
						_react2.default.createElement(_Button2.default, { title: '\u6DFB\u52A0', className: 'ple-toolbar-item-button', onClick: function onClick() {
								return props.api.grid.add();
							} }),
						_react2.default.createElement(_Button2.default, { title: '\u5168\u9009', className: 'ple-toolbar-item-button', onClick: function onClick() {
								return props.api.grid.toggleSelectAll();
							} }),
						_react2.default.createElement(_Button2.default, { title: '\u590D\u5236', className: 'ple-toolbar-item-button', disabled: !props.tree.body.activeBlock.length, onClick: function onClick() {
								props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));
							} }),
						_react2.default.createElement(_Button2.default, { title: '\u5220\u9664', className: 'ple-toolbar-item-button', disabled: !props.tree.body.activeBlock.length, onClick: function onClick() {
								props.api.grid.remove(props.tree.body.activeBlock);
							} }),
						_react2.default.createElement(
							_Button2.default,
							{ title: '\u80CC\u666F\u8272', className: (0, _classnames2.default)('ple-toolbar-item-button', {
									'ple-toolbar__block-active': state.active.editColor
								}), disabled: !props.tree.body.activeBlock.length, onClick: function onClick(e) {
									e.persist();
									if (!state.active.editColor) {
										_this5.deactivate().then(function () {
											return _this5.changeActive('editColor', null, e);
										});
									}
								} },
							_react2.default.createElement(
								'div',
								{ className: 'ple-colorPicker__wrap' },
								_react2.default.createElement(_reactSimpleColorpicker2.default, {
									onChange: function onChange(color) {
										if (!color) return;
										props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));
									},
									color: activeBlockColor,
									className: 'ple-colorPicker__body' })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'ple-toolbar-item ple-toolbar-canvas', style: { borderRight: 0 } },
						_react2.default.createElement(
							'h5',
							null,
							'\u56FE\u7247\u8BBE\u7F6E'
						),
						_react2.default.createElement(_Button2.default, { title: '\u7F29\u653E', className: 'ple-toolbar-item-button', disabled: this.getImageBtnStatus(props.tree.body.activeBlock, props.tree.body.grid), onClick: function onClick() {
								return props.api.cropper.open(props.tree.body.activeBlock[0]);
							} }),
						_react2.default.createElement(_Button2.default, { title: '\u6E05\u9664', className: 'ple-toolbar-item-button', disabled: this.getImageBtnStatus(props.tree.body.activeBlock, props.tree.body.grid), onClick: function onClick() {
								return props.api.grid.removeImages(props.tree.body.activeBlock);
							} })
					)
				)
			);
		}
	}]);

	return Toolbar;
}(_react2.default.Component);

Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = {
	dispatch: null,
	tree: null,
	changeSetting: function changeSetting() {}
};
exports.default = (0, _reactRedux.connect)(function (state) {
	return Object.assign({}, state, {});
})(Toolbar);