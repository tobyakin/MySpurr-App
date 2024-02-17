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
// export const getTopPickedJobs = async () => {
//   const token = await getToken()
//   try {
//     let res = await axios.get(`job/picks`, {
//       headers: {
//         Authorization: 'Bearer ' + token
//       }
//     })
//     return res.data
//   } catch (error) {
//     catchAxiosError(error)
//     throw error
//   }
// }
export const deleteJob = async (slug) => {
  const token = await getToken()
  try {
    let res = await axios.delete(`job/delete`, slug, {
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
export const closeJob = async (slug) => {
  const token = await getToken()
  try {
    let res = await axios.delete(`job/${slug}/close`, {
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
export const viewJobsDetailsById = async (id) => {
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
export const getAllTalents = async () => {
  try {
    let res = await axios.get(`talents`)
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
    let res = await axios.get(`job/${id}/applicants`, {
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

export const getTalentApplication = async (id) => {
      const token = await getToken()

  try {
    let res = await axios.get(`application/${id}`, {
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
