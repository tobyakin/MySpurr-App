import axios from '../axios'
import { catchAxiosError } from './Response'

export const getCountries = async () => {
  try {
    let res = await axios.get(`v1/country`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getStates = async (ciso) => {
  try {
    let res = await axios.get(`v1/country/${ciso}/states`)
    return res.data
  } catch (error) {
    console.log(error)  }
}

export const getCountryCodes = async () => {
  try {
    let res = await axios.get(`v1/countries`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
