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

export const getSentTalentMessageDetail = async (message_id) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/detail/talent/${message_id}`, {
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

export const getTalentReceivedMessages = async () =>{
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/received/talent`, {
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

export const getTalentReceivedMessageDetail = async (message_id) =>{
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/detail/received/talent/${message_id}`, {
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

export const getBusinessSentMessages = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/sent/business`, {
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

export const getBusinessSentMessageDetail = async (message_id) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/detail/business/${message_id}`, {
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


export const getBusinessReceivedMessages = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/message/received/business`, {
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



export const getBusinessReceivedMessageDetail = async (message_id) =>{
    try {
        let res = await axios.get(`v1/message/detail/business/${message_id}`, {
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

