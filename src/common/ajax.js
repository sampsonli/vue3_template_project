/**
 * 默认发生任何异常都返回一个空对象
 * Created by lichun on 2021/5/10.
 */
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const options = {
  baseURL: '',
  timeout: 200000,
  withCredentials: false,
};
const _axios = axios.create(options);





export const get = function (url, config) {
  return _axios.get(url, config).then((response) => {
    if (response && response.status === 200) {
      return response.data;
    }
    throw new Error(response.message);
  });
};
export const post = function (url, param, config) {
  return _axios.post(url, param, config).then((response) => {
    if (response && response.status === 200) {
      return response.data;
    }
    throw new Error(response.message);
  });
};

export const generator = (Apis) => {
  const result = {};
  Object.keys(Apis).forEach(key => {
    const {
      url, method, config = {}, mockUrl, isMock = false, type = 'json',
    } = Apis[key];
    let furl = isMock ? (mockUrl || url) : url;
    if (!isDev) { // 防止mock上生产、测试环境
      furl = url;
    }
    if (method === 'get' || method === 'GET') {
      result[key] = (params = {}, cfg = {}) => {
        const p = Object.keys(params);
        let reqUrl = `${furl}?_t=${Date.now()}`;
        if (p.length) {
          reqUrl = `${reqUrl}&${Object.keys(params).map((k) => [k, params[k]].join('=')).join('&')}`;
        }
        return get(reqUrl, { ...config, ...cfg });
      };
    } else if (method === 'post' || method === 'POST') {
      result[key] = (params = {}, cfg = {}) => {
        let p = params;
        cfg = { ...config, ...cfg };
        if (type === 'form') {
          cfg.headers = cfg.headers || {};
          cfg.headers['content-type'] = 'application/x-www-form-urlencoded';
          p = new URLSearchParams();
          Object.keys(params).forEach((k) => {
            p.append(k, params[k]);
          });
        }
        return post(furl, p, cfg);
      };
    }
  });
  return result;
};
