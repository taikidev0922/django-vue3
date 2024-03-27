import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn

  if (!isLoggedIn && to.meta.requiresAuth) {
    authStore.renew().catch(() => {
      forceToLoginPage(to)
    })
  }
})

const forceToLoginPage = (to) => {
  router.replace({
    path: '/login',
    query: { next: to.fullPath }
  })
}

export default router
