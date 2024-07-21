import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

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
        let res = await axios.get(`v1/getuser?email=${mail_input}`, {
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




