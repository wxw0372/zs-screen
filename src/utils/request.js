import axios from 'axios'
import { getCookie } from './auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //   baseURL: 'https://api-hmzs.itheima.net/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getCookie()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 相应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
