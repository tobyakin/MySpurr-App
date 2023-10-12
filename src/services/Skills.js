import axios from '../axios'
import { catchAxiosError } from './Response'

export const getAllSkills = async () => {
  try {
    let res = await axios.get(`skills`)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
