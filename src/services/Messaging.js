import axios from '../axios'
import { catchAxiosError, catchAxiosSuccess } from './Response'
import { getToken } from './Auth'

export const getMessage = async (receiverId) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/${receiverId}`, {
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

export const getTalentSentMessages = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/sent/talent`, {
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

export const getSentTalentMessageDetail = async () => {
    try {
        let res = await axios.get(`v1/message/detail/talent/1`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getTalentRecievedMessages = async () =>{
    try {
        let res = await axios.get(`v1/message/received/talent`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getTalentRecievedMessageDetail = async () =>{
    try {
        let res = await axios.get(`v1/message/detail/received/talent/4`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

export const getSentBusinessMessages = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/sent/business`, {
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

export const getBusinessRecievedMessageDetail = async () =>{
    try {
        let res = await axios.get(`v1/message/detail/business/1`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        catchAxiosError(error)
        throw error
    }
}

