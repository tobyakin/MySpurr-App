import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

export const updateUserSettings = async (talent_id, payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/accounts/${talent_id}`, payload, {
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
export const resetPassword = async ( payload) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/change-password`, payload, {
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
export const deleteAccount = async (talent_id) => {
  const token = await getToken()
  try {
    let res = await axios.patch(`v1/delete-accounts/${talent_id}`, {
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

