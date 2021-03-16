
import axios from 'axios'


export const nestJSRequest = axios.create({
  baseURL: 'http://baidu.com',
  timeout: 4000,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})
