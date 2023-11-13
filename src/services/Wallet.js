import axios from '../axios'
import { catchAxiosError } from './Response'
import { getToken } from './Auth'

export const getBankList = async () => {
      const token = await getToken()

  try {
    let res = await axios.get(`bank-list`, {
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
export const verifyPin = async () => {
        const token = await getToken()

  try {
    let res = await axios.post(`verify-pin`, {
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
export const addBankAccount = async () => {
        const token = await getToken()

  try {
    let res = await axios.post(`add-bank-account`, {
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
export const setWithdrawalPin = async () => {
        const token = await getToken()

  try {
    let res = await axios.post(`withdrawal-pin`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
