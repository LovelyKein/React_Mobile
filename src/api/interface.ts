import axios from "axios"
import { storage } from "@/assets/utils"

const request = axios.create({
  baseURL: '/proxyApi',
  timeout: 50000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const token = storage.get('Token')
  token ? config.headers["authorization"] = token : null // 携带 token
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  } else {
    return Promise.reject('状态码：' + res.status)
  }
}, (err) => {
  return Promise.reject(err)
})

export default request