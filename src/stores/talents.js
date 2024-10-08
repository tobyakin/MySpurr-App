import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllTalents, getSingleTalent, getSingleTalentPortfolio } from '@/services/Talents'

export const useTalentsStore = defineStore('talents', () => {
  const talent = ref({})
  const singleTalent = ref({})
  const talentPortfolio = ref({})

  const allTalents = async () => {
    try {
      talent.value = await getAllTalents()
      return talent.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleGetSingleTalent = async (uuid) => {
    try {
      singleTalent.value = await getSingleTalent(uuid)
      return singleTalent.value
    } catch (error) {
      console.error(error)
    }
  }
  const SingleTalentPortfolio = async (id) => {
    try {
      talentPortfolio.value = await getSingleTalentPortfolio(id)
      return singleTalent.value
    } catch (error) {
      console.error(error)
    }
  }

  return {
    talent,
    allTalents,
    singleTalent,
    handleGetSingleTalent,
    SingleTalentPortfolio,
    talentPortfolio
  }
})
