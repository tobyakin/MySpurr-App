import axios from '../axios'
import { catchAxiosError } from './Response'
import { getToken } from './Auth'

export const getStatistics = async () => {
      const token = await getToken()

  try {
    let res = await axios.get(`v1/statistics?filter=week`, {
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
