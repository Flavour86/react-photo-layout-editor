import React from 'react';
import classNames from 'classnames';


export default class Button extends React.Component {

	static displayName = 'Button';

	render() {
		const { props } = this;

		return (
				<button type="button" title={props.title} onClick={props.onClick} className={classNames(props.className, {
					'ple-toolbar-item-disabled-button': props.disabled
				})} disabled={props.disabled}>
					{props.title}
					{!!props.children && (
						<div className="ple-toolbar__pop">{props.children}</div>
					)}
				</button>
		);
	}

}
