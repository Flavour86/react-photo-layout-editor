'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var setting = exports.setting = {
	base: {
		uploadScript: null,
		uploadParamsConvertFunc: null,
		updateStoreFunc: null
	},
	body: {
		setting: {
			width: 100,
			height: 100,
			column: 6,
			outerMargin: 10,
			innerMargin: 10,
			freeMode: false,
			bgColor: 'rgba(255,255,255,1)'
		},
		blockColor: 'rgba(234,234,234,1)',
		grid: []
	},
	side: {
		files: [],
		visible: true
		//progressPercent: null,
	}
};

var side = exports.side = {
	files: {},
	visible: true,
	progressPercent: null
};