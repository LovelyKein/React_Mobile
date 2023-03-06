import axios from "axios"

const request = axios.create({
  baseURL: '/proxyApi',
  timeout: 50000
})

// 请求拦截器
request.interceptors.request.use((config) => {
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