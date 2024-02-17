import axios from "../axios";
import { catchAxiosError,catchAxiosSuccess }  from "./Response"
import { getToken } from "./Auth";



export const handleTalentWorkDetails = async (payload) => {

    const token = await getToken()
    try {
        let res = await axios.post(`talent-work-details`,payload,{ 
            headers:{
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
        let res = await axios.post(`talent-portfolio`, payload, {
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
        let res = await axios.post(`business-details`,payload,{ 
            headers:{
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
        let res = await axios.post(`business-portfolio`,payload,{ 
            headers:{
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
    let res = await axios.post(`upload-identity`, payload, {
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


