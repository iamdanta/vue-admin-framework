import {localDataArea, localDataDic} from '@/utils/local-data';

/**
 * 首次加载数据
 */
export function init () {

}

/**
 * 检查是否有缓冲
 * @returns {boolean}
 */
export function checkCache() {
	if (localDataArea.get() === null || localDataDic.get() === null) {
		return false;
	} else {
		return true;
	}
}
