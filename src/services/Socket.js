import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'
import { io } from 'socket.io-client'
import axios from '../axios'

export const connect = async (receiverId) => {
  const token = await getToken()
  const api = import.meta.env.VITE_BACKEND_BASEURL;

  try {
    const res = io(api + `message/${receiverId}`, {
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
export const sendMessage = async (receiverId, payload) => {
  const token = await getToken()
  try {
    const res = await axios.post(`message/${receiverId}`, payload, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    // socket.emit('message', payload)
    catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}

