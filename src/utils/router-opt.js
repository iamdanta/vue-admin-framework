/**
 * 过滤secondNotMenuKey=false的数据
 * @param data 路由数据
 * @param secondNotMenuKey 配置的不是Menu的标识符
 * @returns {*|Array}
 */
export function filterRouter(data, secondNotMenuKey) {
	// 配置过滤的依据字段
	let KEY = 'menu';
	if (secondNotMenuKey) {
		KEY = secondNotMenuKey;
	}

	/**
	 * this is condition of menu
	 * @param c
	 * @returns {boolean}
	 */
	let hasMenu = (c) => {
		if (c.hasOwnProperty('meta') && c.meta.hasOwnProperty(KEY)) {
			return true;
		} else {
			return false;
		}
	};
	/**
	 * this is condition of children
	 * @param c
	 * @returns {boolean}
	 */
	let hasChildren = (c) => {
		if (c.hasOwnProperty('children') && c.children.length > 0) {
			return true;
		} else {
			return false;
		}
	};
	/**
	 * rebuild data
	 * @param data
	 * @returns {*|Array}
	 */
	let rebuildData = (data) => {
		let res = [];
		if (Array.isArray(data)) {
			res = [];
			data.forEach((c) => {
				if (hasChildren(c)) {
					c.children = rebuildData(c.children);
				}
				if (!hasMenu(c) || (hasMenu(c) && c.meta.menu)) {
					res.push(c);
				}
			});
		} else {
			res = {};
			if (hasChildren(data)) {
				data.children = rebuildData(data.children);
			}
			if (!hasMenu(data) || (hasMenu(data) && data.meta.menu)) {
				res = data;
			}
		}
		return res;
	};
	try {
		let copy = JSON.parse(JSON.stringify(data));
		return rebuildData(copy);
	}catch (e) {
		console.info('[路由可能不是一个标准的JSON格式]', e);
		return rebuildData(data);
	}
}