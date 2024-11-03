import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

export const getJobs = async (page) => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/get-jobs?page=${page}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getMyJobs = async () => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/job`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getTopPickedJobs = async () => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/job/picks`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const deleteJob = async (id) => {
  const token = await getToken()
  try {
    let res = await axios.delete(`v1/jobs/delete/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const closeJob = async (slug, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/job/${slug}/close`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const getJobsDetails = async (id) => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/job/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const viewJobsDetailsBySlug = async (slug) => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/job/details/${slug}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const viewJobsDetailsById = async (id) => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/job/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const applyForJobs = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/job-apply`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const postJobs = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/job`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const jobPayment = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`payment/pay`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const verifyPayment = async (id, reference)=>{
  const token = await getToken()
  try {
    let res = await axios.get(`v1/verify/payment/${id}/${reference}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    // catchAxiosError(error)
    throw error
  }
}

export const myApplications = async () => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/applications`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getAllTalents = async () => {
  try {
    let res = await axios.get(`v1/talents`)
    catchAxiosSuccess(res.data)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const getApplicants = async (id) => {
    const token = await getToken()

  try {
    let res = await axios.get(`v1/job/${id}/applicants`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res.data)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const getApplicantsSlug = async (slug) => {
  const token = await getToken()

  try {
    let res = await axios.get(`v1/get/job/${slug}/applicants`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res.data)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const getTalentApplication = async (job_id, talent_id) => {
  const token = await getToken()

  try {
    let res = await axios.get(`v1/application/${talent_id}/${job_id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res.data)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const getTalentApplicationSlug = async (slug, talent_id) => {
  const token = await getToken()

  try {
    let res = await axios.get(`v1/get/application/${talent_id}/${slug}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res.data)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

export const editJob = async (id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/job/${id}`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const addRating = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/ratings`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getRatings = async (job_id, talent_id) => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/ratings/${job_id}/${talent_id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}