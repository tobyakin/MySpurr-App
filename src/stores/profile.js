import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserProfile } from '@/services/Profile'

export const useUserProfile = defineStore('profile', () => {
  const user = ref({})

  const userProfile = async () => {
    try {
    user.value = await getUserProfile()
      console.log('User Profile:', user.value) // Add this line
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
