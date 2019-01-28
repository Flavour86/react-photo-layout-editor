/**
 * Random range
 * min~max 사이의 랜덤 정수를 반환한다.
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} useDecimal
 * @return {Number}
 */
export function randomRange(min, max, useDecimal=false)
{
	if (useDecimal)
	{
		return Math.random() * (max - min) + min;
	}
	else
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}


/**
 * get ratio for resize
 * max와 min값의 차이의 비율을 가져온다.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function getRatioForResize(min, max)
{
	return (max > min) ? min / max : max / min;
}


/**
 * Get timestamp
 *
 * @return {Number}
 */
export function getTimeStamp()
{
	return Math.round(+new Date()/1000);
}


/**
 * get ratio
 *
 * @param {Number} w
 * @param {Number} h
 * @return {Number}
 */
export function getRatio(w, h)
{
	let result = parseInt(w) / parseInt(h);
	result = Math.round(result * 1000) / 1000;
	return result;
}
