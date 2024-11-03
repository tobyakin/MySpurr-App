import { ref } from 'vue'
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
  getApplicantsSlug,
  getTalentApplication,
  getTalentApplicationSlug,
  getTopPickedJobs,
  editJob,
  jobPayment,
  addRating,
  getRatings,
  verifyPayment
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
  const ratings = ref([])
  const ciso = ref('')
  const siso = ref('')
  const verifyStatus = ref('')

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
    currency: '',
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
  const handleGetRatings = async (job_id, talent_id) => {
    try {
      ratings.value = await getRatings(job_id, talent_id)
      return ratings.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleAddRating = async (payload) => {
    try {
      let res = await addRating(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const allJobs = async (page) => {
    try {
      Job.value = await getJobs(page)
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
  const handelDeleteJob = async (id) => {
    try {
      let res = await deleteJob(id)
      return res
    } catch (error) {
      console.error(error)
    }
  }
  const handelCloseJob = async (slug, payload) => {
    try {
      let res = await closeJob(slug, payload)
      console.log(res)
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

  const applyForJob = async (payload) => {
    try {
      let res = await applyForJobs(payload)
      return res
    } catch (error) {
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
      currency: postJobsValue.value.currency,
      type: 'standard'
    };
  
    if (postJobsValue.value.questions.length > 0 && postJobsValue.value.questions.some(q => q.question.trim() !== '')) {
      payload.questions = postJobsValue.value.questions;
    }

    try {
      let res = await postJobs(payload)
      return res
    } catch (error) {
      /**/
    }
  }

  const handlejobPayment = async (
    business_id,
    email,
    payment_redirect_url,
    payment_option,
  ) => {

    let payload = {
      business_id: business_id,
      email: email,
      type: 'premium',
      payment_option: payment_option,
      payment_redirect_url: payment_redirect_url,
     "job": {
        "job_title": postJobsValue.value.job_title,
        "country_id": ciso.value,
        "state_id": siso.value,
        "job_type": postJobsValue.value.job_type,
        "description": postJobsValue.value.description,
        "responsibilities": postJobsValue.value.responsibilities,
        "required_skills": postJobsValue.value.required_skills,
        "benefits": postJobsValue.value.benefits,
        "salaray_type": postJobsValue.value.salaray_type,
        "salary_min": postJobsValue.value.salary_min,
        "salary_max": postJobsValue.value.salary_max,
        "currency": postJobsValue.value.currency,
        "skills": postJobsValue.value.skills,
        "experience": postJobsValue.value.experience,
        "qualification": postJobsValue.value.qualification,
    }
  }

    if (postJobsValue.value.questions.length > 0 && postJobsValue.value.questions.some(q => q.question.trim() !== '')) {
      payload.job.questions = postJobsValue.value.questions;
    } else {
      payload.job.questions = []
    }

    try {
      console.log(payload, typeof postJobsValue.value.salary_min)
      let res = await jobPayment(payload)
      console.log(res)
      return res
    } catch (error) {
      /**/
    }
  }

  const handlePaymentVerification = async (id, reference)=>{
    try {
      verifyStatus.value = await verifyPayment(id, reference)
      return verifyStatus.value
    } catch (error) {
      console.log(error)
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
  const handleGetApplicantsSlug = async (slug) => {
    try {
      applicants.value = await getApplicantsSlug(slug)
      return applicants.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleGetTalentApplication = async (job_id, talent_id) => {
    try {
      talentApplication.value = await getTalentApplication(job_id, talent_id)
      return talentApplication.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleGetTalentApplicationSlug = async (slug, talent_id) => {
    try {
      talentApplication.value = await getTalentApplicationSlug(slug, talent_id)
      return talentApplication.value
    } catch (error) {
      console.error(error)
    }
  }
  const handleEditJob = async (id) => {
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
      let res = await editJob(id, payload)
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
    handleGetApplicantsSlug,
    talentApplication,
    handleGetTalentApplication,
    handleGetTalentApplicationSlug,
    handleGetTopPickedJobs,
    topPickedJobs,
    handleEditJob,
    handlejobPayment,
    handleGetRatings,
    handleAddRating,
    ratings,
    handlePaymentVerification,
    verifyStatus
  }
})
