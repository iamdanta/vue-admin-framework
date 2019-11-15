import request from '../utils/request';
import { userAuth } from '@/utils/auth';

/**
 * 获取 token
 * @description
 * process 作用为防重复请求。
 * @returns {Promise}
 */
export function getToken() {
  return (getToken.process = getToken.process
    ? getToken.process
    : createToken().then((res) => {
        getToken.process = null;
        if (res && res.token) {
          userAuth.setToken(res);
        }
      }));
}

/**
 * 创建 token
 * @api
 */
function createToken() {
  return request({
    url: `/getToken`,
    method: 'post',
    data: {
      username: 'test',
      password: '123'
    }
  });
}
