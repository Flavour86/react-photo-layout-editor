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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSimpleColorpicker = require('react-simple-colorpicker');

var _reactSimpleColorpicker2 = _interopRequireDefault(_reactSimpleColorpicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BorderSetting = function (_React$Component) {
  _inherits(BorderSetting, _React$Component);

  function BorderSetting(props) {
    _classCallCheck(this, BorderSetting);

    var _this = _possibleConstructorReturn(this, (BorderSetting.__proto__ || Object.getPrototypeOf(BorderSetting)).call(this, props));

    _this.state = _extends({}, props.defaultSetting, props.setting);
    return _this;
  }

  _createClass(BorderSetting, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var props = this.props;


      this.setState(_extends({}, props.defaultSetting, props.setting));
    }
  }, {
    key: 'activeBgColorPopup',
    value: function activeBgColorPopup(sw, e) {
      var _this2 = this;

      var state = this.state;

      var cTarget = e ? e.currentTarget : null;

      sw = sw || !state.popup_bgColor;

      if (sw) {
        $(document).on('click.pleEditBgColor', function (e) {
          if ($(e.target).closest('.ple-edit-bgColor__popup').length) return;
          if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
            _this2.activeBgColorPopup(false);
          }
        });
      } else {
        $(document).off('click.pleEditBgColor');
      }

      this.setState({ popup_bgColor: sw });
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
    key: '_openBgColorPicker',
    value: function _openBgColorPicker(e) {
      e.persist();
      this.activeBgColorPopup(null, e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var state = this.state;


      return _react2.default.createElement(
        _Tip2.default,
        { tipTitle: '\u8FB9\u6846\u8BBE\u7F6E', submit: this._submit.bind(this), reset: this._reset.bind(this) },
        _react2.default.createElement(
          'dl',
          { className: 'ple-type-input' },
          _react2.default.createElement(
            'dt',
            null,
            _react2.default.createElement(
              'label',
              { htmlFor: 'frm_outerMargin' },
              '\u753B\u5E03\u8FB9\u8DDD'
            )
          ),
          _react2.default.createElement(
            'dd',
            null,
            _react2.default.createElement('input', {
              type: 'number', name: 'outerMargin', id: 'frm_outerMargin',
              min: 0, max: 500,
              value: state.outerMargin,
              onChange: function onChange(e) {
                return _this3._change(e);
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
          { className: 'ple-type-input' },
          _react2.default.createElement(
            'dt',
            null,
            _react2.default.createElement(
              'label',
              { htmlFor: 'frm_innerMargin' },
              '\u56FE\u7247\u95F4\u8DDD'
            )
          ),
          _react2.default.createElement(
            'dd',
            null,
            _react2.default.createElement('input', {
              type: 'number', name: 'innerMargin', id: 'frm_innerMargin',
              min: 0, max: 500,
              value: state.innerMargin,
              onChange: function onChange(e) {
                return _this3._change(e);
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
              { htmlFor: 'frm_bgColor' },
              '\u80CC\u666F\u8272'
            )
          ),
          _react2.default.createElement(
            'dd',
            null,
            _react2.default.createElement(
              'div',
              { className: 'ple-edit-bgColor' },
              _react2.default.createElement(
                'span',
                { className: (0, _classnames2.default)('ple-edit-bgColor__inputBox', {
                    'ple-edit-bgColor__inputBox-active': state.popup_bgColor
                  }) },
                _react2.default.createElement('input', {
                  type: 'text',
                  name: 'bgColor',
                  id: 'frm_bgColor',
                  value: state.bgColor,
                  onChange: function onChange(e) {
                    return _this3._change(e);
                  },
                  onClick: function onClick(e) {
                    return _this3._openBgColorPicker(e);
                  },
                  readOnly: true,
                  required: true,
                  className: 'ple-edit-bgColor__input',
                  style: { backgroundColor: state.bgColor }
                })
              ),
              state.popup_bgColor && _react2.default.createElement(
                'div',
                { className: 'ple-edit-bgColor__popup' },
                _react2.default.createElement(
                  'div',
                  { className: 'ple-edit-bgColor__picker' },
                  _react2.default.createElement(_reactSimpleColorpicker2.default, {
                    onChange: function onChange(color) {
                      return _this3.setState({ bgColor: color });
                    },
                    color: state.bgColor })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return BorderSetting;
}(_react2.default.Component);

BorderSetting.displayName = 'BorderSetting';
BorderSetting.defaultProps = {
  submit: function submit(e) {},
  setting: null,
  defaultSetting: {
    width: 100,
    height: 100,
    column: 5,
    outerMargin: 10,
    innerMargin: 10,
    bgColor: 'rgba(255,255,255,1)'
  }
};
exports.default = BorderSetting;