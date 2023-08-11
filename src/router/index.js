import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/Auth/LoginPage.vue'
import TalentSignup from '../views/Auth/Register/TalentSignup.vue'
import BusinessSignup from '../views/Auth/Register/BusinessSignup.vue'
import Register from '../views/Auth/Register/Register.vue'
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
    {
      path: '/talent/signup',
      name: 'talent-signup',
      component: TalentSignup
    },
    {
      path: '/business/signup',
      name: 'business-signup',
      component: BusinessSignup
    },
  ]
})

export default router
