import axios from '../axios'
import { catchAxiosError } from './Response'

export const getCountries = async () => {
  try {
    let res = await axios.get(`country`)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
