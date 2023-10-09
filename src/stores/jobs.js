import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getJobs, getJobsDetails, applyForJobs } from '@/services/Job'

export const useJobsStore = defineStore('jobs', () => {
  const Job = ref([])
  const singleJob = ref({})

  // const jobApplicationForm = reactive({
  //   job_id: '',
  //   rate: '',
  //   available_start: '',
  //   resume: '',
  //   other_file: '',
  //   question_answers: []
  // })
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
    const applyForJob = async (id, payload) => {
      // let payload = {
      //   job_id: id,
      //   rate: jobApplicationForm.value.rate,
      //   available_start: jobApplicationForm.value.available_start,
      //   resume: jobApplicationForm.value.resume,
      //   other_file: jobApplicationForm.value.other_file,
      //   question_answers: jobApplicationForm.value.question_answers
      // }
      applyForJobs(id, payload)
    }
  return {
    Job,
    allJobs,
    singleJob,
    getSingleJob,
    applyForJob
  }
})
