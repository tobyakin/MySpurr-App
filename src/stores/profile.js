import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserProfile } from '@/services/Profile'

export const useUserProfile = defineStore('profile', () => {
  const user = ref({})

  const userProfile = async () => {
    try {
    user.value = await getUserProfile()
      return user.value;
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  return {
    user,
    userProfile
  }
})
