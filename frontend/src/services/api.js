import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_ROOT_URL,
  timeout: import.meta.env.VITE_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        const messages = Object.values(error.response.data).flat()
        return Promise.reject({ level: 'warning', messages: messages })
      case 401:
        const token = localStorage.getItem('access')
        if (token) {
          localStorage.removeItem('access')
          return Promise.reject(new Error('ログイン有効期限が切れました。再度ログインしてください'))
        } else {
          return Promise.reject(new Error('認証エラー'))
        }
      case 403:
        return Promise.reject(new Error('権限がありません'))
      default:
        return Promise.reject(new Error('システムエラー'))
    }
  }
)

export default api
