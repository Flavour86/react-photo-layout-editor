import React from 'react';
import Tip from './Tip'


export default class EditLayoutSetting extends React.Component {

	static displayName = 'EditLayoutSetting';

	static defaultProps = {
		submit: (e) => {},
		setting: null,
		defaultSetting: {
			width: 100,
			height: 100,
			column: 5,
			outerMargin: 10,
			innerMargin: 10
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

	render() {
		const { state } = this;

		return (
			<Tip tipTitle="大小设置" submit={this._submit.bind(this)} reset={this._reset.bind(this)}>
				<dl>
					<dt><label htmlFor="frm_width">列宽</label></dt>
					<dd className="ple-type-input">
						<input
							type="number" name="width" id="frm_width"
							min={1} max={999} maxLength={3}
							value={state.width}
							onChange={(e) => this._change(e)}
							style={{width: '109px'}}
							required/>
						<span>px</span>
					</dd>
				</dl>
				<dl>
					<dt><label htmlFor="frm_height">列高</label></dt>
					<dd className="ple-type-input">
						<input
							type="number" name="height" id="frm_height"
							min={1} max={999}
							value={state.height}
							onChange={(e) => this._change(e)}
							style={{width: '109px'}}
							required/>
						<span>px</span>
					</dd>
				</dl>
				<dl>
					<dt><label htmlFor="frm_column">列数</label></dt>
					<dd className="ple-type-input">
						<input
							type="number" name="column" id="frm_column"
							min={1} max={99}
							value={state.column}
							onChange={(e) => this._change(e)}
							style={{width: '109px'}}
							required/>
						<span>ea</span>
					</dd>
				</dl>
			</Tip>
		);
	}
}
