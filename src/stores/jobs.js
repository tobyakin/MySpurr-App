import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  getJobs,
  getJobsDetails,
  applyForJobs,
  postJobs,
  getMyJobs,
  myApplications,
  viewJobsDetailsBySlug,
  deleteJob,
  closeJob,
  viewJobsDetailsById,
  getAllTalents,
  getApplicants,
  getTalentApplication,
  getTopPickedJobs
} from '@/services/Job'

export const useJobsStore = defineStore('jobs', () => {
  const Job = ref([])
  const MyJob = ref([])
  const myJobsApplications = ref([])
  const singleJob = ref({})
  const JobDetails = ref({})
  const JobDetailsById = ref({})
  const talent = ref({})
  const applicants = ref({})
  const talentApplication = ref({})
  const topPickedJobs = ref({})
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
      currency:'',
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
  const handleMyJobApplications = async () => {
    try {
      myJobsApplications.value = await myApplications()
      return myJobsApplications.value
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
    const handleGetTopPickedJobs = async () => {
      try {
        topPickedJobs.value = await getTopPickedJobs()
        return topPickedJobs.value
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
  const handelDeleteJob = async (slug) => {
    try {
      let res = await deleteJob(slug)
      return res
    } catch (error) {
      console.error(error)
    }
  }
  const handelCloseJob = async (slug) => {
    try {
      let res = await closeJob(slug)
      return res
    } catch (error) {
      console.error(error)
    }
  }
    const handleGetJobDetailsBySlug = async (slug) => {
      try {
        JobDetails.value = await viewJobsDetailsBySlug(slug)
        return JobDetails.value
      } catch (error) {
        console.error(error)
      }
    }
    const handleGetJobDetailsById = async (id) => {
      try {
        JobDetailsById.value = await viewJobsDetailsById(id)
        return JobDetailsById.value
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
            questions: postJobsValue.value.questions,
            currency: postJobsValue.value.currency
          }
          try {
            let res = await postJobs(payload)
            return res
          } catch (error) {
            /**/
          }
        }
  const allTalents = async () => {
    try {
      talent.value = await getAllTalents()
      return talent.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleGetApplicants = async (id) => {
    try {
      applicants.value = await getApplicants(id)
      return applicants.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleGetTalentApplication = async (id) => {
    try {
      talentApplication.value = await getTalentApplication(id)
      return talentApplication.value
    } catch (error) {
      console.error(error)
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
    handleMyJobs,
    myJobsApplications,
    handleMyJobApplications,
    JobDetails,
    handleGetJobDetailsBySlug,
    handelDeleteJob,
    handelCloseJob,
    JobDetailsById,
    handleGetJobDetailsById,
    talent,
    allTalents,
    applicants,
    handleGetApplicants,
    talentApplication,
    handleGetTalentApplication,
    handleGetTopPickedJobs,
    topPickedJobs
  }
})
