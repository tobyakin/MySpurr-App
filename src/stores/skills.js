import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllSkills, getJobTitle } from '@/services/Skills'
import { getCountries, getStates } from '@/services/Countries'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref({})
  const jobTitle = ref({})
  const contriesCode = ref({})
  const states = ref({})
  const getskills = async () => {
    try {
      skills.value = await getAllSkills()
      return skills.value
    } catch (error) {
      console.error('Error fetching skills :', error)
    }
  }
  const getJobTitles = async () => {
    try {
      jobTitle.value = await getJobTitle()
      return jobTitle.value
    } catch (error) {
      console.error('Error fetching job title :', error)
    }
  }
  const getCountriesCode = async () => {
    try {
      contriesCode.value = await getCountries()
      return contriesCode.value
    } catch (error) {
      console.error('Error fetching contries Code :', error)
    }
  }
  const handleGetStates = async (ciso) => {
    try {
      states.value = await getStates(ciso)
      return states.value
    } catch (error) {
      console.error('Error fetching contries Code :', error)
    }
  }

  return {
    skills,
    getskills,
    getJobTitles,
    jobTitle,
    getCountriesCode,
    contriesCode,
    handleGetStates,
    states
  }
})
