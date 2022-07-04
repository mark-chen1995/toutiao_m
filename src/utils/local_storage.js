/**
 * 封装本地存储的增、删、改操作
 */

export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
export const getItem = key => {
  const resultStr = window.localStorage.getItem(key)
  try {
    return JSON.parse(resultStr)
  } catch (error) {
    // 解析异常则说明该key对应的不是数组或者对象
    return resultStr
  }
}
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
