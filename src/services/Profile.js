import axios from "../axios";
import { catchAxiosError,catchAxiosSuccess }  from "./Response"
import { getToken } from "./Auth";



export const getUserProfile = async () => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/profile`, {
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
export const updateBusinessDeatils = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/business-edit-profile`, payload, {
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

export const updateProfilePhoto = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-photo`, payload, {
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
export const updateBio = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-bio`, payload, {
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
export const updateOverview = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-overview`, payload, {
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
export const addWorkDetails = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/add-work-details`, payload, {
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
export const addSkills = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/add-skills`, payload, {
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
export const addEducation = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/add-education`, payload, {
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
export const updateEducation = async (id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-education/${id}`, payload, {
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
export const updateEmployment = async (id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-employment/${id}`, payload, {
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
export const addCertificate = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/add-certificate`, payload, {
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
export const updateCertificate = async (id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-certificate/${id}`, payload, {
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
export const updatePortfolio = async (id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/update-portfolio/${id}`, payload, {
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
export const getSinglePortfolio = async (id) => {
  const token = await getToken()
  try {
    let res = await axios.get(`v1/portfolio/single/${id}`, {
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
