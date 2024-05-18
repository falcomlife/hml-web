/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '@/routes'
import store from '@/store'
import {
  Message
} from 'element-ui'

/**
前后端统一错误码
**/
const errorCode = {
  emptyToken: 100,
  tokenExpired: 101
}
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg, level) => {
  Message({
    showClose: true,
    message: msg,
    type: level
  });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  console.log(router)
  router.replace('/login')
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, data) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      tip(data.rs, 'warning');
      if (data.code == 150) {
        toLogin()
      }
      break;
      // 403
      // 清除token并跳转登录页
    case 403:
      tip(data.rs, 'warning');
      toLogin()
      break;
      // 404请求不存在
    case 404:
      tip('请求的资源不存在', 'warning');
      break;
    case 500:
      tip(data.rs, 'error');
      break;
    default:
      console.log(data.rs);
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 120
});


instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = localStorage.getItem('token')
    token && (config.headers.token = token)
    return config
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res.data.s === 1) {
        tip(res.data.rs, 'error');
        return Promise.reject(res)
      }
      return Promise.resolve(res)
    } else {
      tip(res.data.rs, 'warning');
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const {
      response
    } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      store.commit('changeNetwork', true);
      return Promise.reject(response);
    }
  });

export default instance;
