import axios from "../axios";
import { catchAxiosError, catchAxiosSuccess }  from "./Response"
import { encrypt,decrypt } from "./Encrypt"
// import { auth }  from '../firebase';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const login = async (email, password) => {

    let data = {
        email,
        password,
    }
    try {
        let res = await axios.post('v1/login', data)
        catchAxiosSuccess(res)   
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
export const verifyLogin = async (code) => {
  let data = {
    code
  }
  try {
    let res = await axios.post('v1/login-verify', data)
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const RsendVerifyCode = async (email) => {
  let data = {
    email
  }
  try {
    let res = await axios.post('v1/resend-code', data)
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}


// login with Google
// export const loginWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider()
//       const userCredential = await signInWithPopup(auth, provider);
//       const user = userCredential.user;
//         let res = await axios.post('login', {
//           password: user.uid,
//           email_address: user.email,
//         });
//         catchAxiosSuccess(res)   
//         return res;
//     } catch (error) {
//         catchAxiosError(error)   
//         throw error;
//     }
  
// }
export const registerBusiness = async (payload) => {

    try {
        let res = await axios.post('business-register',payload)
        let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);       
         catchAxiosSuccess(res)   
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
export const authWithGoogle = async () => {

  try {
    const res = 'https://myspurr.azurewebsites.net/api/v1/auth/talent/google'
    window.location.href = res
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const registerTalent = async (payload) => {
    try {
        let res = await axios.post('v1/talent-register',payload)
        let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);        
        catchAxiosSuccess(res)   
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
// forgot password
export const forgottenPassword = async (email) => {
  let data = {
    email
  }

  try {
    let res = await axios.post('v1/forgot-password', data)
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
// reset password
export const resetPassword = async (token,email,password, password_confirmation) => {
  let data = {
    token,
    email,
    password,
    password_confirmation
  }

  try {
    let res = await axios.post('v1/reset-password', data)
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
// resend email
export const resendEmail = async (email ) => {
  let data = {
    email
  }

  try {
    let res = await axios.post('v1/resend', data)
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
export const getToken = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user  = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)
        return user.data.token;
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


