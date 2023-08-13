import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Auth/LoginPage.vue'
import Register from '../views/Auth/Register/RegisterPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: Register
    },
  ]
})

export default router
