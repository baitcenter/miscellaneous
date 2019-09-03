import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT || 1e4,
})

/**
 * 实例请求拦截函数
 * @param  {Object} config 请求配置信息
 * @return {Object | Promise}        请求配置信息或错误信息
 */
instance.interceptors.request.use(
  config => {
    // transform post data to queryString
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data)
    }

    return config
  },
  err => {
    Toast(err.message || '数据请求未成功')

    return Promise.reject(err)
  }
)

/**
 * 实例响应拦截函数
 * @param  {Object} res 请求响应信息
 * @return {Object | Promise}     请求响应信息或错误信息
 */
instance.interceptors.response.use(
  res => {
    const { data } = res

    return data
  },
  err => {
    if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
      Toast.fail('接口请求超时，请刷新!')
    } else {
      Toast.fail(err.message || '接口返回出错!')
    }

    return Promise.reject(err)
  }
)

/**
 * 封装后导出的数据请求函数
 * @param  {String} method HTTP请求类型
 * @param  {String} path   请求路径
 * @param  {Object} params 请求参数
 * @param  {Object} opts   请求配置参数
 * @return {Promise}       异步Promise
 */
export default function(method, path, params = {}, opts = {}) {
  method = method.toLowerCase()

  switch (method) {
    case 'get':
      return instance.get(path, { params })
    case 'post':
      return instance.post(path, params, opts)
    case 'delete':
      return instance.delete(path, { params })
    case 'put':
      return instance.put(path, params)
    default:
      return Promise.reject(new Error(`未知的method---${method}`))
  }
}
