import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllSkills } from '@/services/skills'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref({})

  const getskills = async () => {
    try {
      skills.value = await getAllSkills()
      console.log('skills :', skills.value) // Add this line
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
