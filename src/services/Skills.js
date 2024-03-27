import axios from '../axios'
import { catchAxiosError } from './Response'

export const getAllSkills = async () => {
  try {
    let res = await axios.get(`v1/skills`)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getJobTitle = async () => {
  try {
    let res = await axios.get(`v1/job-title`)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
