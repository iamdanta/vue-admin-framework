import { clearLocalData, getLocalData, setLocalData } from './local-storage';

/**
 * token 管理类
 * @method getToken 获取 token
 * @method setToken 设置 token
 */
class Auth {
  name = '';
  constructor(tokenName) {
    this.name = tokenName;
  }

  /**
   * 获取 token
   * @returns {string/null} 如果有 token 并且未过期返回 token 值，否则返回 null
   */
  getToken() {
    const data = getLocalData(this.name);
    if (data && data.expires > Date.now()) {
      return data;
    } else {
      this.clear();
      return null;
    }
  }

  /**
   * 设置 token
   * @param {Object} token 设置 token 对象，例如：{token: 'token', expires: 'expires'}
   */
  setToken(token) {
    setLocalData(this.name, token);
  }

  /**
   * 清理 token
   */
  clear() {
    clearLocalData(this.name);
  }
}

// 用户 token
export const userAuth = new Auth('USER_AUTH_TOKEN');
