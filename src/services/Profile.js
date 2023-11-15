import axios from "../axios";
import { catchAxiosError,catchAxiosSuccess }  from "./Response"
import { getToken } from "./Auth";



export const getUserProfile= async () => {

    const token = await getToken()
    try {
        let res = await axios.get(`profile`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        catchAxiosSuccess(res) 
        return res.data;

    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }

}
export const updateProfilePhoto = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`update-photo`, payload, {
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
    let res = await axios.patch(`update-bio`, payload, {
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
    let res = await axios.patch(`update-overview`, payload, {
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
    let res = await axios.post(`add-work-details`, payload, {
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
    let res = await axios.post(`add-skills`, payload, {
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
    let res = await axios.post(`add-education`, payload, {
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
    let res = await axios.patch(`update-education/${id}`, payload, {
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
    let res = await axios.patch(`update-employment/${id}`, payload, {
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
    let res = await axios.post(`add-certificate`, payload, {
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
    let res = await axios.patch(`update-certificate/${id}`, payload, {
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
