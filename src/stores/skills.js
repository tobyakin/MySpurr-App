import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllSkills, getJobTitle } from '@/services/Skills'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref({})
  const jobTitle = ref({})

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

  return {
    skills,
    getskills,
    getJobTitles,
    jobTitle
  }
})
