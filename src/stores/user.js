import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { encrypt,decrypt } from "../services/Encrypt"
import { getUserProfile } from '@/services/Profile'

export const useStore = defineStore('user', () => {
    const token = ref(null);

    const user = ref(null)
    const userDetails = ref(null)


    const getUser = computed(() => {
        
        let encryptedData  = localStorage.getItem("_user_data");
        if (encryptedData) {
          user.value = decrypt(encryptedData, import.meta.env.VITE_ENCRYPT_KEY)
          return user.value
        } else {
          return null // or any other appropriate default value
        }    })


    const saveUser = (userData) => {
        user.value = userData
        let ciphertext = encrypt(JSON.stringify(user.value),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_user_data', ciphertext);
    }

        const userProfile = async () => {
    try {
      userDetails.value = await getUserProfile()
      return userDetails.value
    } catch (error) {
      console.error(error)
      userDetails.value = null
      return null
    }
        }


    const features = computed(async () => {
      await userProfile() // Wait for userProfile to complete
      if (userDetails.value && userDetails.value.data && userDetails.value.data.type) {
        const account = userDetails.value.data.type
        console.log(account)
        let allFeature = ['JOBS', 'MY_APPLICATIONS', 'GO_PRO', 'COURSES', 'JOBS', 'MESSAGES']

        if (account.toLowerCase() === 'business') {
          return ['JOB_LISTING', 'MY_SCHEDULE', 'ALL_APPLICATIONS']
        }
        return allFeature
      }
      return [] // Return an empty array if features are not available
    })
  
    return {
      user,
      getUser,
      saveUser,
      token,
      features,
      userProfile,
      userDetails
    }
})