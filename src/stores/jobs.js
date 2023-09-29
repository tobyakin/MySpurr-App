import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getJobs, getJobsDetails, applyForJobs } from '@/services/Job'

export const useJobsStore = defineStore('jobs', () => {
  const Job = ref([])
  const singleJob = ref({})

  const allJobs = async () => {
    try {
      Job.value = await getJobs()
      return Job.value
    } catch (error) {
      console.error(error)
    }
  }
  const getSingleJob = async (id) => {
    try {
      singleJob.value = await getJobsDetails(id)
      return singleJob.value
    } catch (error) {
      console.error(error)
    }
  }
    const applyForJob = async (id) => {
      applyForJobs(id)
    }

  return {
    Job,
    allJobs,
    singleJob,
    getSingleJob,
    applyForJob
  }
})
