'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tip = function (_React$Component) {
  _inherits(Tip, _React$Component);

  function Tip(props) {
    _classCallCheck(this, Tip);

    var _this = _possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Tip, [{
    key: '_submit',
    value: function _submit(e) {
      e.preventDefault();
      this.props.submit();
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this.props.reset();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tipTitle = this.props.tipTitle;

      return _react2.default.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            return _this2._submit(e);
          }, className: 'ple-edit-setting' },
        _react2.default.createElement(
          'fieldset',
          { className: 'ple-edit-setting__form' },
          _react2.default.createElement(
            'legend',
            null,
            'Settings form'
          ),
          _react2.default.createElement(
            'h1',
            { className: 'ple-edit-setting__title' },
            tipTitle
          ),
          this.props.children
        ),
        _react2.default.createElement(
          'nav',
          { className: 'ple-edit-setting__buttons' },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'button',
              { type: 'button', onClick: function onClick() {
                  return _this2._reset();
                } },
              '\u91CD\u7F6E'
            )
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'button',
              { type: 'submit', className: 'ple-submit' },
              '\u5E94\u7528'
            )
          )
        )
      );
    }
  }]);

  return Tip;
}(_react2.default.Component);

Tip.displayName = 'Tip';
Tip.defaultProps = {
  tipTitle: '设置',
  submit: function submit(e) {},
  reset: function reset(e) {}
};
exports.default = Tip;