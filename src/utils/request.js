import axios from 'axios'
import router from '@/router'
import { refreshToken } from '@/api/user'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://geek.itheima.net1/'
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data } = response
  return data
}, async function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // token过期，使用refresh_token刷新
    try {
      await refreshToken
    } catch (error) {
      if (error.response.status === 500) {
        // refresh_token过期，重新登录
        Toast.fail('token过期，请重新登录')
        router.push('/login')
      }
    }
  }
  return Promise.reject(error.response)
})
export default request
