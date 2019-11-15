import axios from 'axios';
import { stringify } from 'qs';

import errorMessage from './error-handler';
import { getToken } from '../api/user-auth';
import { userAuth } from '@/utils/auth';

/**
 * 创建 axios 服务实例
 * @description
 * 该方法所需的参数如下：
 * @param {String} url 请求的 url，默认配置了一级路径，只需二级路径，例如：/login
 * @param {String} method 请求方式 `get/post`
 * @param {Object} data post 请求的参数
 * @param {Object} params get 请求的参数
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 20000
});

export default service;

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 设置 token
    if (!config.url.includes('/getToken')) {
      config = addToken(config);
    } else {
      config = postDataTransform(config);
    }

    return config;
  },
  (error) => {
    errorMessage(error || 'response error.');
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (!data || data.error) {
      if (data.error === 'TOKEN INVALID') {
        return getToken();
      } else {
        errorMessage(data.error || 'response error.');
        return Promise.reject(data);
      }
    } else {
      return data;
    }
  },
  (error) => {
    errorMessage(error || 'response error.');
    return Promise.reject(error);
  }
);

/**
 * 将 token 添加到请求参数中
 * @description
 * 后台的 token 处理在参数中，而不是 headers 中
 * 所以在这里只使用参数中的 token
 * (config.headers['Authorization'] = `Bearer ${token}`)
 * @param {Object} config 请求配置
 * @returns {Promise|Object}
 */
function addToken(config) {
  const token = userAuth.getToken();

  // 判断 token 是否存在，不存在发送获取 token 的请求
  if (token) {
    if (config.method === 'post') {
      config.data = config.data || {};
      config.data.token = token;
      postDataTransform(config);
    } else if (config.method === 'get') {
      config.params = config.params || {};
      config.params.token = token;
    }
    return config;
  } else {
    return getToken().then(() => addToken(config));
  }
}

/**
 * post 参数转换
 * @description
 * 在跨域请求中需要进行转换以降低浏览器的安全机制（不用发送 options 请求）。
 * @param {Object} config 请求配置
 */
function postDataTransform(config) {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = stringify(config.data);
  }
  return config;
}
