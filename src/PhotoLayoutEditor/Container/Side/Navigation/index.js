import React from 'react';


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
					<button type="button" title="添加到左侧" onClick={props.onAttach}>
						<i className="ple-sp-ico ple-ico-reply ple-abs">Moving the image to grid block</i>
					</button>
					<button type="button" title="全选/取消选择" onClick={props.onToggleSelect}>
						<i className="ple-sp-ico ple-ico-select ple-abs">Toggle all select</i>
					</button>
					<span title="上传图片" key={state.timestamp}  	style={{ display: "none" }}>
						<input
							ref={(r) => { comps.inputFile = r; }}
							type="file"
							accept="image/*"
							onChange={(e) => this.upload(e)} multiple />
						<i className="ple-sp-ico ple-ico-upload ple-abs">upload images</i>
					</span>
					
					
					<button type="button" title="移除图片" onClick={props.onRemove}>
						<i className="ple-sp-ico ple-ico-trash ple-abs">remove images</i>
					</button>
				</div>
			</nav>
		);
	}

}