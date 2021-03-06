import axios from 'axios';
import {stringify} from 'qs';

import {errorMessage, warnMessage} from './error-handler';
import {localDataUser} from './local-data';
import {requestNoToken} from './no-token';

/**
 * 创建 axios 服务实例
 * @description
 * 该方法所需的参数如下：
 * @param {String} method 请求方式 `get/post`
 * @param {Object} data post 请求的参数
 * @param {Object} params get 请求的参数
 */
const service = axios.create({
  traditional: true,
  // withCredentials: true,
  timeout: 300000,
  paramsSerializer: (params) => {
    return stringify(params, {arrayFormat: 'brackets'});
  }
});

export default service;

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;

    if (!requestNoToken.includes(config.url)) {
      const userData = localDataUser.get();
      if (userData) {
        config.headers.token = userData.token;
      } else {
        warnMessage('请求已取消(未获取到 token)：' + config.url);
        source.cancel('Cancel');
      }
    }

    // post 参数转换为 FormData 形式
    if (config.method === 'post' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.data = stringify(config.data);
    }

    return config;
  },
  (error) => {
    return promiseError(error, '请求错误');
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    // if (!data || data.success === false) {
    //   // 判断 token 是否正确
    //   if (data.tokenInvalid) {
    //     errorMessage('登陆已过期，请重新登陆');
    //     localDataUser.clear();
    //     location.href = '/login'; // 跳转至登陆
    //   } else {
    //     return promiseError(data);
    //   }
    // } else {
    //   return data;
    // }
    return data;
  },
  (error) => {
    return promiseError(error);
  }
);

function promiseError (data, defaultMessage = '服务异常') {
  if (!(data instanceof axios.Cancel)) {
    errorMessage(data || defaultMessage, '', true);
  }
  return Promise.reject(data);
}
