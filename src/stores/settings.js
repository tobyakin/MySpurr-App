import { ref } from 'vue'
import { defineStore } from 'pinia'
import { updateUserSettings, resetPassword, deleteAccount } from '@/services/Settings'

export const useUserSettingsStore = defineStore('settings', () => {

  const settingsData = ref({
    talent_id: '',
    first_name: '',
    last_name: '',
    email: '',
    location: '',
    currency: '',
    application_lin: '',
    country_code: '',
    phone_number: '',
    billing_address: {
      country: '',
      state: '',
      address_1: '',
      address_2: '',
      city: '',
      zip_code: ''
    },
    language: [
      {
        language: '',
        proficiency: ''
      }
    ]
  })
  const resetPasswordData = ref({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })
  const userSettings = async () => {
    let payload = {
      first_name: settingsData.value.first_name,
      last_name: settingsData.value.last_name,
      email: settingsData.value.email,
      location: settingsData.value.location,
      currency: settingsData.value.currency,
      application_lin: settingsData.value.application_lin,
      country_code: settingsData.value.country_code,
      phone_number: settingsData.value.phone_number,
      billing_address: {
        country: settingsData.value.billing_address.country,
        state: settingsData.value.billing_address.state,
        address_1: settingsData.value.billing_address.address_1,
        address_2: settingsData.value.billing_address.address_2,
        city: settingsData.value.billing_address.city,
        zip_code: settingsData.value.billing_address.zip_code
      }
    }
    try {
      let res = await updateUserSettings(settingsData.value.talent_id, payload)
      return res
    } catch (error) {
      console.error(error)
    }
  }
  const handleResetpassowrd = async () => {
    let payload = {
      old_password: resetPasswordData.value.old_password,
      new_password: resetPasswordData.value.new_password,
      confirm_password: resetPasswordData.value.confirm_password
    }
    try {
      let res = await resetPassword(payload)
      return res
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeleteAccount = async (talent_id) => {
    try {
      let res = await deleteAccount(talent_id)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  return {
    userSettings,
    settingsData,
    resetPasswordData,
    handleResetpassowrd,
    handleDeleteAccount
  }
})
