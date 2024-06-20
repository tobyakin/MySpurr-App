import { createRouter, createWebHistory } from 'vue-router'
import middleware from './Middleware';
import LoginPage from '../views/Auth/LoginPage.vue'
import Register from '../views/Auth/RegisterPage.vue'
import Verify from '../views/Auth/VerifyPage.vue'
import OTPPage from '@/views/Auth/OTPPage.vue'
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
import PostJob from '@/views/Jobs/Business/PostJob.vue'
import MyApplications from '@/views/MyApplications/MyApplications.vue'
import MessagesPage from '@/views/Messages/MessagesPage.vue'
import MobileChatPage from '@/views/Messages/MobileChatPage.vue'
import WalletOverviewPage from '@/views/Wallet/OverviewPage.vue'
import ProfilePage from '@/views/Profile/index.vue'
import SettingsPage from '@/views/Settings/SettingsPage.vue'
import MyWork from '@/views/MyWork/MyWork.vue'
import HelpCenterPage from '@/views/HelpCenter/HelpCenterPage.vue'
import BookMarkPage from '@/views/BookMark/BookMarkPage.vue'
import AddPortfolio from '@/views/Portfolio/AddPortfolio.vue'
import EditPortfolio from '@/views/Portfolio/EditPortfolio.vue'
import OpenTicket from '@/views/HelpCenter/OpenTicket.vue'
import JobListingPage from '@/views/JobListing/JobListingPage.vue'
import FindTalents from '@/views/FindTalents/FindTalents.vue'
import PreviewJob from '@/views/JobListing/PreviewJob.vue'
import AllApplications from '@/views/AllApplications/AllApplications.vue'
import PublicProfile from '@/views/Profile/PublicProfile.vue'
import EditJob from '@/views/Jobs/Business/EditJob.vue'
import MySchedule from '@/views/MySchedule/MySchedule.vue'
import SuccessPage from '@/views/Jobs/Business/SuccessPage.vue'
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
      path: '/login/verify/:email',
      name: 'verify-login',
      component: OTPPage
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
      path: '/success',
      name: 'success',
      component: SuccessPage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/talents',
      name: 'talents',
      component: FindTalents,
      beforeEnter: [middleware.redirectLogin]
    },

    {
      path: '/job-lists',
      name: 'job-lists',
      component: JobListingPage,
      beforeEnter: [middleware.redirectLogin]
    },

    {
      path: '/applications/:slug/:id',
      name: 'applications',
      component: AllApplications,
      beforeEnter: [middleware.redirectLogin]
    },

    {
      path: '/preview-job/:id',
      name: 'preview-job',
      component: PreviewJob,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesPage,
      beforeEnter: [middleware.redirectLogin],
      meta: { hideChatWidget: true}
    },
    {
      path: '/messages/:id',
      name: 'chats',
      component: MobileChatPage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/open-ticket',
      name: 'open-ticket',
      component: OpenTicket,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/talent/:name/:uuid',
      name: 'view-talent',
      component: PublicProfile,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/my-schedule',
      name: 'my-schedule',
      component: MySchedule,
      beforeEnter: [middleware.redirectLogin]
    },

    {
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/my-work',
      name: 'my-work',
      component: MyWork,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/help-center',
      name: 'help-center',
      component: HelpCenterPage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookMarkPage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: WalletOverviewPage,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/my-applications',
      name: 'my-applications',
      component: MyApplications,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/post-job',
      name: 'post-jobs',
      component: PostJob,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/edit-job/:id',
      name: 'edit-job',
      component: EditJob,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/view/job/:id',
      name: 'view-jobs',
      component: ViewJob,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/add-portfolio',
      name: 'add-portfolio',
      component: AddPortfolio,
      beforeEnter: [middleware.redirectLogin]
    },
    {
      path: '/edit-portfolio/:id',
      name: 'edit-portfolio',
      component: EditPortfolio,
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
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
