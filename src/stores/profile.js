import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getPouchAccounts,
} from '@/services/Profile'

export const usePouchSavingStore = defineStore('profile', () => {
  const user = ref([])

  const getUserProfile = async () => {
    user.value = await getPouchAccounts()
    return user.value
  }

  return {
    user,
    getUserProfile,
  }
})
