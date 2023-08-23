import { createRouter, createWebHistory } from 'vue-router'
import middleware from '../services/Middleware';
import LoginPage from '../views/Auth/LoginPage.vue'
import Register from '../views/Auth/RegisterPage.vue'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/dashboard",
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: Register,
      beforeEnter: [middleware.redirectDashboard],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: [middleware.redirectDashboard],
    },
    {
      path: "/logout",
      name: "Logout",
      beforeEnter: [middleware.deleteSession],
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: HomeView,
      beforeEnter: [middleware.redirectLogin]
    },
  ]
})

export default router
