import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'

export const getAllSkills = async () => {
  try {
    let res = await axios.get(`skills`)
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
