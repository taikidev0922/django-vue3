import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    username: '',
    isLoggedIn: false
  }),
  actions: {
    login(username, password) {
      return api
        .post('/auth/login', {
          username,
          password
        })
        .then((response) => {
          localStorage.setItem('access', response.data.access_token)
          this.username = response.data.user.username
          this.isLoggedIn = true
        })
    },
    logout() {
      localStorage.removeItem('access')
      this.username = ''
      this.isLoggedIn = false
    },
    renew() {
      return api.post('/auth/user').then((response) => {
        this.username = response.data.user.username
        this.isLoggedIn = true
      })
    }
  }
})
