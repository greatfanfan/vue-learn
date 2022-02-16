import axios from 'axios'
import { getToken } from './utils/token'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: '/api',
    timeout: 3000
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // 在发送前做些什么
    // 获取并设置token
    // console.log(getToken('token'))
    config.headers['token'] = getToken('token')
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做些什么
    let { status, message } = response.data
    if (status !== 200) {
        Message({type: 'warning', message: message || 'error'})
    }
    return response
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default service