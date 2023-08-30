import { createRouter, createWebHistory } from 'vue-router'
import middleware from './Middleware';
import LoginPage from '../views/Auth/LoginPage.vue'
import Register from '../views/Auth/RegisterPage.vue'
import Verify from '../views/Auth/VerifyPage.vue'
import HomeView from '../views/HomeView.vue'
import JobsView from '../views/Jobs/Jobs.vue'
import TalentOnboarding from '../views/OnBoarding/Talent.vue'
import BusinessOnboarding from '../views/OnBoarding/Business.vue'
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
      path: '/verify',
      name: 'verify',
      component: Verify,
      // beforeEnter: [middleware.redirectDashboard],
    },
    {
      path: "/logout",
      name: "Logout",
      beforeEnter: [middleware.deleteSession],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/talent/onboarding',
      name: 'talent-onboarding',
      component: TalentOnboarding,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/business/onboarding',
      name: 'business-onboarding',
      component: BusinessOnboarding,
      beforeEnter: [middleware.redirectLogin]
    },
  ], 

})

export default router
