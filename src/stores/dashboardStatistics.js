import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getStatistics } from '@/services/DashboardStatistics'

export const useStatisticsStore = defineStore('Statistics', () => {
  const stat = ref({})
  const handleGetStatistics = async () => {
    try {
      stat.value = await getStatistics()
      return stat.value
    } catch (error) {
      console.error('Error fetching Statistics :', error)
    }
  }
  return {
    stat,
    handleGetStatistics
  }
})
