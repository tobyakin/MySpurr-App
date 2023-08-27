import { ref } from 'vue'
import { defineStore } from 'pinia'
import { handleTalentWorkDetails,handleTalentPortfolio,handleBusinessDetails,handleBusinessPortfolio } from "@/services/Onboarding"


export const useOnboardingStore = defineStore('onBoardingStore', () => {
    const step =ref(1)

    const submitTalentPortfolio = async(payload) => {
          handleTalentPortfolio(payload)
    }
    const submitBusinessPortfolio = async(payload) => {
          handleBusinessPortfolio(payload)
    }
    const submitTalentWorkDetails = async(payload) => {
          handleTalentWorkDetails(payload)
    }
    const submitBusinessDetails = async(payload) => {
          handleBusinessDetails(payload)
    }

    return { 
        submitTalentPortfolio,
        submitBusinessPortfolio,
        submitTalentWorkDetails,
        submitBusinessDetails,
        step

    }
})