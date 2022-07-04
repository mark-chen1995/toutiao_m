/**
 * 用户请求模块
 */
import request from '@/utils/request'

export const login = function (data) {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}
/**
 * 发送验证码
 * @param {*} mobile 手机号
 */
export const sendSms = function (mobile) {
  return request({
    method: 'GET',
    url: `v1_0/sms/codes/${mobile}`
  })
}
/**
 * 刷新token
 * @param {*} refreshToken 刷新令牌
 * @returns
 */
export const refreshToken = (refreshToken) => {
  return request({
    method: 'PUT',
    url: '/v1_0/authorizations',
    data: {
      Authorization: `Bearer ${refreshToken}`
    }
  })
}
