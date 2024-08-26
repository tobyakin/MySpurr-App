import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { io } from 'socket.io-client'
import { getToken } from './Auth'

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

export const getMessages = async (userId) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/${userId}`, {
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

export const sendMessage = async (payload) => {
    const token = await getToken()
    try {
        let res = await axios.post(`v1/message`, payload, {
            headers: {
                'Content-Type': 'application/json',
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

export const replyMessage = async (payload) => {
    const token = await getToken()
    try {
        let res = await axios.post(`/v1/message/reply`, payload, {
            headers: {
                'Content-Type': 'application/json',
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

export const getSentMessages = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/sent/message`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getMessageDetail = async (message_id) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/detail/${message_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getMail = async (mail_input) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/getuser?search=${mail_input}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const editMessage = async (message_id, payload) => {
    const token = await getToken()
    try {
        let res = await axios.patch(`v1/message/edit/${message_id}`, payload, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        catchAxiosSuccess(res)
        return res.data
    } catch (error) {
        catchAxiosError(error)
        console.log(error)
    }
}




