import React from 'react';
import Button from '../../Body/Toolbar/Button'


export default class SideNavigation extends React.Component {

	static displayName = 'Navigation';

	static defaultProps = {
		onRemove: () => {},
		onToggleSelect: () => {},
		onAttach: () => {},
		onUpload: () => {},
	};

	constructor(props) {
		super(props);

		this.comps = {
			inputFile: null,
		};
		this.state = {
			timestamp : Date.now(),
		};
	}

	/**
	 * Upload images
	 *
	 * @param {Event} e
	 */
	upload(e) {
		this.props.onUpload(e.target.files);

		this.setState({
			timestamp : Date.now()
		});
	}

	render() {
		const { props, state, comps } = this;

		return (
			<nav className="ple-sideNavigation ple-side__navigation">
				<div className="ple-sideNavigation__wrap">
					<Button title="添加到左侧" onClick={props.onAttach} />
					<Button title="全选" onClick={props.onToggleSelect} />
					<span title="上传图片" key={state.timestamp}  	style={{ display: "none" }}>
						<input
							ref={(r) => { comps.inputFile = r; }}
							type="file"
							accept="image/*"
							onChange={(e) => this.upload(e)} multiple />
						<i className="ple-sp-ico ple-ico-upload ple-abs">upload images</i>
					</span>

					<Button title="删除" onClick={props.onRemove} />
				</div>
			</nav>
		);
	}

}
