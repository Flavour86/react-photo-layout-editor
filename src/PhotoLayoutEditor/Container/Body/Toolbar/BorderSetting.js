import React from 'react';
import Tip from './Tip'
import className from "classnames";
import ColorPicker from "react-simple-colorpicker";

export default class BorderSetting extends React.Component {

  static displayName = 'BorderSetting';

  static defaultProps = {
    submit: (e) => {},
    setting: null,
    defaultSetting: {
      width: 100,
      height: 100,
      column: 5,
      outerMargin: 10,
      innerMargin: 10,
      bgColor: 'rgba(255,255,255,1)',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props.defaultSetting,
      ...props.setting
    };
  }

  componentWillReceiveProps() {
    const { props } = this;

    this.setState({
      ...props.defaultSetting,
      ...props.setting,
    });
  }

  activeBgColorPopup(sw, e) {
  	const { state } = this;
  	const cTarget = e ? e.currentTarget : null;

  	sw = sw || !state.popup_bgColor;

  	if (sw) {
  		$(document).on('click.pleEditBgColor', (e) => {
  			if ($(e.target).closest('.ple-edit-bgColor__popup').length) return;
  			if (!(e.target === cTarget) && !(e.target.parentNode === cTarget)) {
  				this.activeBgColorPopup(false);
  			}
  		});
  	} else {
  		$(document).off('click.pleEditBgColor');
  	}

  	this.setState({ popup_bgColor: sw });
  }

  _submit() {
    this.props.submit(this.state);
  }

  _reset() {
    this.setState({
      ...this.props.defaultSetting
    });
  }

  _change(e) {
    let value = e.target.value || '';
    switch(e.target.type) {
      case 'text':
        this.setState({ [e.target.name]: value });
        break;
      case 'number':
        value = value || 0;
        this.setState({ [e.target.name]: parseInt(value) });
        break;
    }
  }

  _openBgColorPicker(e) {
  	e.persist();
  	this.activeBgColorPopup(null, e);
  }

  render() {
    const { state } = this;

    return (
      <Tip tipTitle="边框设置" submit={this._submit.bind(this)} reset={this._reset.bind(this)}>
        <dl className="ple-type-input">
          <dt><label htmlFor="frm_outerMargin">画布边距</label></dt>
          <dd>
            <input
              type="number" name="outerMargin" id="frm_outerMargin"
              min={0} max={500}
              value={state.outerMargin}
              onChange={(e) => this._change(e)}
              style={{ width: '109px' }}
              required />
            <span>px</span>
          </dd>
        </dl>
        <dl className="ple-type-input">
          <dt><label htmlFor="frm_innerMargin">图片间距</label></dt>
          <dd>
            <input
              type="number" name="innerMargin" id="frm_innerMargin"
              min={0} max={500}
              value={state.innerMargin}
              onChange={(e) => this._change(e)}
              style={{ width: '109px' }}
              required />
            <span>px</span>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="frm_bgColor">背景色</label></dt>
          <dd>
            <div className="ple-edit-bgColor">
								<span className={className('ple-edit-bgColor__inputBox', {
                  'ple-edit-bgColor__inputBox-active': state.popup_bgColor
                })}>
									<input
                    type="text"
                    name="bgColor"
                    id="frm_bgColor"
                    value={state.bgColor}
                    onChange={(e) => this._change(e)}
                    onClick={(e) => this._openBgColorPicker(e)}
                    readOnly={true}
                    required={true}
                    className="ple-edit-bgColor__input"
                    style={{ backgroundColor: state.bgColor }}
                  />
								</span>
              {state.popup_bgColor && (
                <div className="ple-edit-bgColor__popup">
                  <div className="ple-edit-bgColor__picker">
                    <ColorPicker
                      onChange={(color) => this.setState({ bgColor: color })}
                      color={state.bgColor}/>
                  </div>
                </div>
              )}
            </div>
          </dd>
        </dl>
      </Tip>
    );
  }
}
