/**
 * localStorage 操作
 * @description
 * 将 localStorage 获取/设置为 json 数据类型。
 */

/**
 * 获取 localStorage 数据
 * @param {string} name localStorage 名称
 */
export function getLocalData(name) {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  } else {
    return data;
  }
}

/**
 * 设置 localStorage 数据
 * @param {string} name localStorage 名称
 * @param {*} data 存储的内容
 */
export function setLocalData(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
