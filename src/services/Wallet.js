import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

export const getBankList = async () => {
      const token = await getToken()

  try {
    let res = await axios.get(`v1/bank-list`, {
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
    let res = await axios.post(`v1/verify-pin`, {
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
export const addBankAccount = async (payload) => {
  const token = await getToken()

  try {
    let res = await axios.post(`v1/add-bank-account`, payload, {
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
export const setWithdrawalPin = async () => {
        const token = await getToken()

  try {
    let res = await axios.post(`v1/withdrawal-pin`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    catchAxiosSuccess(res)   
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const walletBalance = async () => {
  const token = await getToken()

  try {
    let res = await axios.get(`v1/wallet`, {
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
