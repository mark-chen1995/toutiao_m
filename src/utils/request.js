import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/'
})

export default request
