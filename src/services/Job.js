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
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const applyForJobs = async (id) => {
  const token = await getToken()
  try {
    let res = await axios.post(`job-apply/${id}`, {
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
