import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

export const getJobs = async () => {
  const token = await getToken()
  try {
    let res = await axios.get(`get-jobs`, {
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
    let res = await axios.get(`job`, {
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
export const deleteJob = async (slug) => {
  const token = await getToken()
  try {
    let res = await axios.delete(`job/delete`,slug, {
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
    let res = await axios.get(`job/${id}`, {
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
    let res = await axios.get(`job/details/${slug}`, {
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
export const applyForJobs = async (id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`job-apply/${id}`, payload, {
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
    let res = await axios.post(`job`, payload, {
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
export const myApplications = async () => {
  const token = await getToken()
  try {
    let res = await axios.get(`applications`, {
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
