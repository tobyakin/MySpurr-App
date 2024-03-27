import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'

export const getAllTalents = async () => {
  try {
    let res = await axios.get(`v1/talents`)
    catchAxiosSuccess(res.data)
    return res.data;
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getSingleTalent = async (uuid) => {
  try {
    let res = await axios.get(`v1/talent/${uuid}`)
    catchAxiosSuccess(res.data)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getSingleTalentPortfolio = async (id) => {
  try {
    let res = await axios.get(`v1/talent/portfolio/single/${id}`)
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
