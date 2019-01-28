/**
 * is touch device
 *
 * @returns {boolean}
 */
export function isTouchDevice()
{
	return (
		('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0)
	);
}


/**
 * Sleep
 *
 * @param {Number} time
 * @param {String} id
 * @return {Promise}
 */
export function sleep(time, id='pleTimer')
{
	return new Promise((resolve) => {
		window[id] = setTimeout(resolve, time);
	});
}


/**
 * Get image size
 *
 * @param {String} src
 * @return {Promise}
 */
export function getImageSize(src)
{
	return new Promise((resolve, reject) => {
		if (!(src && typeof src === 'string')) reject();

		let img = document.createElement('img');

		img.onload = function()
		{
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight,
				ratio: img.naturalHeight / img.naturalWidth,
			});
		};

		img.onerror = function()
		{
			reject();
		};

		img.src = src;
	});
}


/**
 * get css prefix
 *
 * @variation {Object}
 */
export const cssPrefix = (function()
{
	const styles = window.getComputedStyle(document.documentElement, '');
	const pre = (Array.prototype.slice
		.call(styles)
		.join('')
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	)[1];
	const dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

	return {
		dom: dom,
		lowercase: pre,
		css: `-${pre}-`,
		js: pre[0].toUpperCase() + pre.substr(1)
	};
})();


/**
 * check support css
 *
 * @param {String} key
 * @param {String} value
 * @return {Boolean}
 */
export function checkSupportCss(key, value)
{
	if (CSS && CSS.supports)
	{
		return CSS.supports(key, value);
	}
}

const validateUrlIsBase64 = function (url) {
	const reg = /^data:image\/(?:.*);base64,.*/
	return reg.test(url)
}

/**
 * load image
 *
 * @param {String} src
 * @return {Promise}
 */
export function loadImage(src) {
	return new Promise(function (resolve) {
		if (src) {
			let image = new Image();
			const getImageByBlob = function (url) {
				const xhr = new XMLHttpRequest();
				xhr.open('get', url, true);
				xhr.responseType = 'blob';
				xhr.onload = function () {
					if (this.status === 200) {
						var reader = new FileReader();
						reader.readAsDataURL(this.response);
						reader.onload = function (e) {
							//console.log("FileReader Res",e);
							image.src = e.target.result;
							resolve(image);
						};
					}
				};
				xhr.send();
			}
			const getImageByBase64 = function (base64) {
				window.document.body.appendChild(image);

				image.onload = function(e)
				{
					window.document.body.removeChild(image);
					resolve(image);
				};
				image.onError = function(e) {
					resolve(null);
				};

				image.setAttribute('crossOrigin', 'anonymous');
				image.style.display = 'none'
				image.src = base64;
			}
			if (validateUrlIsBase64(src)) {
				getImageByBase64(src)
			} else {
				getImageByBlob(src);
			}
		} else {
			resolve(null);
		}
	});
}
