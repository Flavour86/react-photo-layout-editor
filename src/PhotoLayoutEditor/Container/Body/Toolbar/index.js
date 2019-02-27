import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
// // import $ from 'jquery/dist/jquery.slim';
import ColorPicker from 'react-simple-colorpicker';

import * as actions from '../../../actions';
import * as libs from '../../../lib';

import Button from './Button';
import EditLayoutSetting from './EditLayoutSetting';
import BorderSetting from './BorderSetting'


class Toolbar extends React.Component {

	static displayName = 'Toolbar';

	static defaultProps = {
		dispatch: null,
		tree: null,
		changeSetting: function () {}
	};

	constructor(props)
	{
		super(props);
		this.cacheCols = props.tree.body.setting.column
		this.state = {
			active: {
				setting: false,
				borderSetting: false,
				editBlockColor: false,
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
		}
	}

	componentWillReceiveProps(nextProps)
	{
		const { state, props } = this;

		let newState = Object.assign({}, state);
		let updated = false;

		// select block
		if (props.tree.body.activeBlock.length !== nextProps.tree.body.activeBlock.length)
		{
			let active = !!(nextProps.tree.body.activeBlock.length);
			newState.visible = Object.assign({}, newState.visible, {
				edit: false,
				removeImage: false,
				duplicate: active,
				removeBlock: active,
				editColor: active
			});
			updated = true;
		}

		if (nextProps.tree.body.activeBlock[0])
		{
			// check image block
			let isImage = false;
			nextProps.tree.body.activeBlock.some(k => {
				if (nextProps.tree.body.grid[k].image)
				{
					isImage = true;
					return true;
				}
			});

			// select image block
			let block = nextProps.tree.body.grid[nextProps.tree.body.activeBlock[0]];
			newState.visible = Object.assign({}, newState.visible, {
				removeImage: isImage,
				edit: !!(block && block.image)
			});
			updated = true;
		}

		if (updated)
		{
			this.setState(newState);
		}
	}

	changeActive(keyName, userSW, event)
	{
		const { state } = this;
		const sw = userSW || !state.active[keyName];
		const cTarget = event ? event.currentTarget : null;

		if (sw)
		{
			$(document).on('click.pleToolbar', (e) => {
				if ($(e.target).closest('.ple-toolbar__pop').length) return;
				if (!(e.target === cTarget) && !(e.target.parentNode === cTarget))
				{
					this.changeActive(keyName, false);
				}
			});
		}
		else
		{
			$(document).off('click.pleToolbar');
		}

		this.setState({
			active: {
				...state.active,
				setting: false,
				borderSetting: false,
				editColor: false,
				[keyName] : sw,
			}
		});
	}

	deactivate()
	{
		$(document).off('click.pleToolbar');
		return new Promise((reject) => {
			this.setState({
				active: {
					setting: false,
					borderSetting: false,
					editColor: false,
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
	submitEditSetting(state, key)
	{

		if (this.cacheCols !== state.column) {
			this.props.changeSetting()
			this.cacheCols = state.column
		}
		// update setting
		this.props.dispatch(actions.body.updateSetting(state));

		// close palette
		libs.util.sleep(50).then(() => this.changeActive(key, false));

		return false;
	}

	render()
	{
		const { state, props } = this;
		let activeBlockColor = '#fff';

		if (typeof props.tree.body.grid === 'object' && libs.object.isArray(props.tree.body.activeBlock))
		{
			const n = props.tree.body.activeBlock[0];
			activeBlockColor = (props.tree.body.grid[n] && props.tree.body.grid[n].color) ?
				props.tree.body.grid[n].color :
				props.setting.body.blockColor;
		}

		return (
			<nav className="ple-toolbar">
				<div className="ple-toolbar__wrap">
					<div className="ple-toolbar-item ple-toolbar-canvas">
						<h5>画布设置</h5>
						<Button
							className={classNames('ple-edit-setting ple-toolbar-item-button', {
								'ple-toolbar__block-active': state.active.setting
							})}
							onClick={(e) => {
								e.persist();
								if (!state.active.setting)
								{
									this.deactivate().then(() => {
										this.changeActive('setting', null, e);
									});
								}
							}}
							title="大小">
							<EditLayoutSetting
								submit={(e) => this.submitEditSetting(e, 'setting')}
								setting={props.tree.body.setting}
								defaultSetting={props.setting.body.setting}/>
						</Button>
						<Button
							className={classNames('ple-edit-setting ple-toolbar-item-button', {
								'ple-toolbar__block-active': state.active.borderSetting
							})}
							onClick={(e) => {
								e.persist();
								if (!state.active.borderSetting)
								{
									this.deactivate().then(() => {
										this.changeActive('borderSetting', null, e);
									});
								}
							}}
							title="边框">
							<BorderSetting
								submit={(e) => this.submitEditSetting(e, 'borderSetting')}
								setting={props.tree.body.setting}
								defaultSetting={props.setting.body.setting}/>
						</Button>
					</div>
					<div className="ple-toolbar-item ple-toolbar-canvas">
						<h5>区块设置</h5>
						<Button title="添加" className="ple-toolbar-item-button" onClick={() => props.api.grid.add()} />
						<Button title="全选" className="ple-toolbar-item-button" onClick={() => props.api.grid.toggleSelectAll()} />
						<Button title="复制" className="ple-toolbar-item-button" disabled={!props.tree.body.activeBlock.length} onClick={() => {
							props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));
						}}/>
						<Button title="删除" className="ple-toolbar-item-button" disabled={!props.tree.body.activeBlock.length} onClick={() => {
							props.api.grid.remove(props.tree.body.activeBlock);
						}}/>
						<Button title="背景色" className={classNames('ple-toolbar-item-button', {
							'ple-toolbar__block-active': state.active.editColor
						})} disabled={!props.tree.body.activeBlock.length} onClick={(e) => {
							e.persist();
							if (!state.active.editColor) {
								this.deactivate().then(() => this.changeActive('editColor', null, e));
							}
						}}>
							<div className="ple-colorPicker__wrap">
								<ColorPicker
									onChange={(color) => {
										if (!color) return;
										props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));
									}}
									color={activeBlockColor}
									className="ple-colorPicker__body"/>
							</div>
						</Button>
					</div>
					<div className="ple-toolbar-item ple-toolbar-canvas" style={{ borderRight: 0}}>
						<h5>图片设置</h5>
						<Button title="缩放" className="ple-toolbar-item-button" disabled={!props.tree.body.activeBlock.length} onClick={() => props.api.cropper.open(props.tree.body.activeBlock[0])} />
						<Button title="清除" className="ple-toolbar-item-button" disabled={!props.tree.body.activeBlock.length} onClick={() => props.api.grid.removeImages(props.tree.body.activeBlock)} />
					</div>

					{/*{state.visible.shuffle && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-arrow-random"*/}
							{/*onClick={() => props.api.grid.shuffle()}*/}
							{/*title="随机排版"/>*/}
					{/*)}*/}
					{/*{state.visible.add && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-plus"*/}
							{/*onClick={() => props.api.grid.add()}*/}
							{/*title="添加区块"/>*/}
					{/*)}*/}
					{/*{state.visible.select && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-select"*/}
							{/*onClick={() => props.api.grid.toggleSelectAll()}*/}
							{/*title="全选/取消选择"/>*/}
					{/*)}*/}

					{/*{state.visible.edit && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-pencil"*/}
							{/*className="ple-toolbar__block-key"*/}
							{/*onClick={() => props.api.cropper.open(props.tree.body.activeBlock[0])}*/}
							{/*title="编辑图片"/>*/}
					{/*)}*/}
					{/*{state.visible.removeImage && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-empty"*/}
							{/*className="ple-toolbar__block-key"*/}
							{/*onClick={() => props.api.grid.removeImages(props.tree.body.activeBlock)}*/}
							{/*title="清除区块中的图片"/>*/}
					{/*)}*/}
					{/*{state.visible.duplicate && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-duplicate"*/}
							{/*className="ple-toolbar__block-key"*/}
							{/*onClick={() => {*/}
								{/*if (props.tree.body.activeBlock === null)*/}
								{/*{*/}
									{/*alert('Not found select block');*/}
									{/*return;*/}
								{/*}*/}
								{/*props.dispatch(actions.body.duplicateBlock(props.tree.body.activeBlock));*/}
							{/*}}*/}
							{/*title="复制区块"/>*/}
					{/*)}*/}
					{/*{state.visible.removeBlock && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-trash"*/}
							{/*className="ple-toolbar__block-key"*/}
							{/*onClick={() => {*/}
								{/*if (props.tree.body.activeBlock === null)*/}
								{/*{*/}
									{/*alert('Not found select block');*/}
									{/*return;*/}
								{/*}*/}
								{/*props.api.grid.remove(props.tree.body.activeBlock);*/}
							{/*}}*/}
							{/*title="删除区块"/>*/}
					{/*)}*/}
					{/*{state.visible.editColor && (*/}
						{/*<Button*/}
							{/*iconClass="ple-ico-palette"*/}
							{/*className={classNames(*/}
								{/*'ple-edit-color',*/}
								{/*'ple-toolbar__block-key',*/}
								{/*{ 'ple-toolbar__block-active': state.active.editColor }*/}
							{/*)}*/}
							{/*onClick={(e) => {*/}
								{/*e.persist();*/}
								{/*if (!state.active.editColor)*/}
								{/*{*/}
									{/*this.deactivate().then(() => this.changeActive('editColor', null, e));*/}
								{/*}*/}
							{/*}}*/}
							{/*title="区块背景色">*/}
							{/*<div className="ple-colorPicker__wrap">*/}
								{/*<ColorPicker*/}
									{/*onChange={(color) => {*/}
										{/*if (!color) return;*/}
										{/*props.dispatch(actions.body.changeColorBlock(props.tree.body.activeBlock, color));*/}
									{/*}}*/}
									{/*color={activeBlockColor}*/}
									{/*className="ple-colorPicker__body"/>*/}
							{/*</div>*/}
						{/*</Button>*/}
					{/*)}*/}
				</div>
			</nav>
		);
	}

}


export default connect((state) => Object.assign({}, state, {}))(Toolbar);
