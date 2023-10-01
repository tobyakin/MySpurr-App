import { createRouter, createWebHistory } from 'vue-router'
import middleware from './Middleware';
import LoginPage from '../views/Auth/LoginPage.vue'
import Register from '../views/Auth/RegisterPage.vue'
import Verify from '../views/Auth/VerifyPage.vue'
import ForgottenPassword from '../views/Auth/ForgottenPassword.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import HomeView from '../views/HomeView.vue'
import JobsView from '../views/Jobs/JobsPage.vue'
import ViewJob from '../views/Jobs/ViewJobPage.vue'
import CoursesView from '../views/Courses/ComingSoon.vue'
import TalentOnboarding from '../views/OnBoarding/TalentPage.vue'
import BusinessOnboarding from '../views/OnBoarding/BusinessPage.vue'
import UploadProofOfIdentity from '@/views/UploadIdentity/UploadProofOfIdentity.vue'
import OnboardingRequest from '@/components/ui/Onboarding/OnboardingRequest.vue'
import Community from '@/views/Community/ComingSoon.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: Register,
      beforeEnter: [middleware.redirectDashboard]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: [middleware.redirectDashboard]
    },
    {
      path: '/verify/:email',
      name: 'verify',
      component: Verify
      // beforeEnter: [middleware.redirectDashboard],
    },
    {
      path: '/forgotten-password',
      name: 'forgotten-password',
      component: ForgottenPassword
      // beforeEnter: [middleware.redirectDashboard],
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword
      // beforeEnter: [middleware.redirectDashboard],
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: [middleware.deleteSession]
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
      path: '/view/job/:id',
      name: 'view-jobs',
      component: ViewJob,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingRequest,
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
    {
      path: '/verify-identity',
      name: 'verify-identity',
      component: UploadProofOfIdentity,
      beforeEnter: [middleware.redirectLogin]
    }
  ]
})

export default router
