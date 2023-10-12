import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllSkills } from '@/services/Skills'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref({})

  const getskills = async () => {
    try {
      skills.value = await getAllSkills()
      return skills.value
    } catch (error) {
      console.error('Error fetching skills :', error)
    }
  }

  return {
    skills,
    getskills
  }
})
