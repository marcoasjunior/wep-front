import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.token}`
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 1000
})

export default axios
