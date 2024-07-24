import axios from "../axios";
import { catchAxiosError, catchAxiosSuccess } from "./Response"
import { getToken } from "./Auth";



export const handleTalentWorkDetails = async (payload) => {

  const token = await getToken()
  try {
    let res = await axios.post(`v1/talent-work-details`, payload, {
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
export const handleTalentPortfolio = async (payload) => {

  const token = await getToken()
  try {
    let res = await axios.post(`v1/talent-portfolio`, payload, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Transfer-Encoding': 'chunked',
        'Content-Type': 'application/json'
      }
    })
    catchAxiosSuccess(res)
    return res.data;

  } catch (error) {
    catchAxiosError(error)
    throw error;
  }

}
export const handleBusinessDetails = async (payload) => {

  const token = await getToken()
  try {
    let res = await axios.post(`v1/business-details`, payload, {
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
export const handleBusinessPortfolio = async (payload) => {

  const token = await getToken()
  try {
    let res = await axios.post(`v1/business-portfolio`, payload, {
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
export const verifyIdentity = async (payload) => {
  const token = await getToken()
  try {
    let res = await axios.post(`v1/upload-identity`, payload, {
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


