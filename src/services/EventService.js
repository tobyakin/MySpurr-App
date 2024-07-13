import axios from '../axios'
import { catchAxiosError } from './Response'
import { getToken } from './Auth'

export const getEvents = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/event/all`, {
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

export const getEventDetails = async (id) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/event/single/${id}`, {
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

export const viewEventDetailsBySlug = async (slug) => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/event/${slug}`, {
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

export const getRelated = async () => {
    const token = await getToken()
    try {
        let res = await axios.get(`v1/event/related`, {
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


