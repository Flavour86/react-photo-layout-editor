import React from 'react';

export default class Tip extends React.Component {
  static displayName = 'Tip';
  static defaultProps = {
    tipTitle: '设置',
    submit: function (e) {},
    reset: function (e) {}
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _submit(e) {
    e.preventDefault();
    this.props.submit();
  }

  _reset() {
    this.props.reset()
  }

  render() {
    const {tipTitle} = this.props
    return (
      <form onSubmit={(e) => this._submit(e)} className="ple-edit-setting">
        <fieldset className="ple-edit-setting__form">
          <legend>Settings form</legend>
          <h1 className="ple-edit-setting__title">{tipTitle}</h1>
          {this.props.children}
        </fieldset>
        <nav className="ple-edit-setting__buttons">
					<span>
						<button type="button" onClick={() => this._reset()}>重置</button>
					</span>
          <span>
						<button type="submit" className="ple-submit">应用</button>
					</span>
        </nav>
      </form>
    )
  }
}
