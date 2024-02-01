import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getJobs, getJobsDetails, applyForJobs, postJobs, getMyJobs } from '@/services/Job'

export const useJobsStore = defineStore('jobs', () => {
  const Job = ref([])
  const MyJob = ref([])
  const singleJob = ref({})

  // const jobApplicationForm = reactive({
  //   job_id: '',
  //   rate: '',
  //   available_start: '',
  //   resume: '',
  //   other_file: '',
  //   question_answers: []
  // })
      const ciso = ref('')
      const siso = ref('')

  const postJobsValue = ref({
      job_title: '',
      country_id: '',
      state_id: '',
      job_type: '',
      description: '',
      responsibilities: '',
      required_skills: '',
      benefits: '',
      salaray_type: '',
      salary_min: '',
      salary_max: '',
      skills: [
      ],
      experience: '',
      qualification: '',
      questions: [
        {
          question: ''
        },
      ]
    }
  )
  const allJobs = async () => {
    try {
      Job.value = await getJobs()
      return Job.value
    } catch (error) {
      console.error(error)
    }
  }
    const handleMyJobs = async () => {
      try {
        MyJob.value = await getMyJobs()
        return MyJob.value
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
      try{
        let res = await applyForJobs(id, payload)
        return res
      }catch (error) {
        /**/
      }
    }
        const handlePostJob = async () => {
          let payload = {
            job_title: postJobsValue.value.job_title,
            country_id: ciso.value,
            state_id: siso.value,
            job_type: postJobsValue.value.job_type,
            description: postJobsValue.value.description,
            responsibilities: postJobsValue.value.responsibilities,
            required_skills: postJobsValue.value.required_skills,
            benefits: postJobsValue.value.benefits,
            salaray_type: postJobsValue.value.salaray_type,
            salary_min: postJobsValue.value.salary_min,
            salary_max: postJobsValue.value.salary_max,
            skills: postJobsValue.value.skills,
            experience: postJobsValue.value.experience,
            qualification: postJobsValue.value.qualification,
            questions: postJobsValue.value.questions
          }
          try {
            let res = await postJobs(payload)
            return res
          } catch (error) {
            /**/
          }
        }

  return {
    Job,
    allJobs,
    singleJob,
    getSingleJob,
    applyForJob,
    handlePostJob,
    postJobsValue,
    ciso,
    siso,
    MyJob,
    handleMyJobs
  }
})
