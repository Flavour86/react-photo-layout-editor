import React from 'react';

import GridLayout from "./GridLayout";
import Toolbar from './Toolbar';


export default class Body extends React.Component {

	static displayName = 'Body';

	constructor(props) {
		super(props);
		this.state = {
			status: false
		}
		this.changeSettingHandle = this.changeSettingHandle.bind(this)
	}

	changeSettingHandle () {
		this.setState({
			status: true
		})

		setTimeout(() => {
			this.setState({
				status: false
			})
		}, 200)
	}

	render() {
		const {status} = this.state
		return (
			<div className="ple-container">
				<div className="ple-body">
					<Toolbar changeSetting={this.changeSettingHandle}/>
					<GridLayout settingStatus={status}/>
				</div>
			</div>
		);
	}

}
