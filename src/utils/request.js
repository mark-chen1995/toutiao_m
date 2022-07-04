import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/'
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data } = response
  return data
}, function (error) {
  // 对响应错误做点什么
  console.log(error.response)
  return Promise.reject(error.response)
})
export default request
