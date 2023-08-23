import axios from "../axios";
import { catchAxiosError }  from "./Response"
import { encrypt,decrypt } from "./Encryption"

export const login = async (email, password) => {

    let data = {
        email,
        password,
    }

    try {
        let res = await axios.post('login',data)
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}

export const registerBusiness = async (payload) => {

    try {
        let res = await axios.post('business-register',payload)
        let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
export const registerTalent = async (payload) => {

    try {
        let res = await axios.post('talent-register',payload)
        let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}

export const getToken = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user  = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)
        return user.token;
    }

    return null;
}

export const getUser = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user  = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)
        return user;
    }

    return null;
}


