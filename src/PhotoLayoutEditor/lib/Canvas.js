/**
 * Canvas
 */
export default class Canvas {

	/**
	 * constructor
	 *
	 * @param {Number} width
	 * @param {Number} height
	 * @param {String} bgColor
	 */
	constructor(width=150, height=100, bgColor='#ffffff')
	{

		//console.log("canvas-fun")
		this.el = document.createElement('canvas');
		this.el.style.display = "none";

		// if(document.getElementById('ueditor_0')!=null){
		// 	document.getElementById('ueditor_0').contentDocument.body.appendChild(this.el);
		// }
		//document.body.appendChild(this.el);
		this.ctx = this.el.getContext('2d');

		this.el.width = width;
		this.el.height = height;

		this.ctx.fillStyle = bgColor;
		this.ctx.fillRect(0, 0, width, height);
		//console.log("canvas-fun-end")
	}

}