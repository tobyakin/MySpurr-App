import axios from "../axios";
import { catchAxiosError, catchAxiosSuccess }  from "./Response"
import { encrypt,decrypt } from "./Encrypt"
import { auth }  from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const login = async (email, password) => {

    let data = {
        email,
        password,
    }

    try {
        let res = await axios.post('login',data)
        catchAxiosSuccess(res)   
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
// login with Google
export const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
        let res = await axios.post('login', {
          password: user.uid,
          email_address: user.email,
        });
        catchAxiosSuccess(res)   
        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
// register with google
export const registerTalentWithGoogle = async () => {
  const urlToOpen = "https://myspurr.azurewebsites.net/api/auth/talent/google";

    try {
    //   const provider = new GoogleAuthProvider()
    //   const userCredential = await signInWithPopup(auth, provider);
        let res = await axios.get("auth/talent/google")
  window.open(res, "_blank");

    //   const user = userCredential.user;
      console.log(res)
        // let payload = {
        //         type: "business",
        //         first_name: userCredential._tokenResponse.firstName,
        //         last_name: userCredential._tokenResponse.lastName,
        //         email_address: user.email,
        //         password: user.uid,
        //         terms: true,
        // };

        // let res = await axios.post('business-register',payload);
        // let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
        // localStorage.setItem('_register_data', ciphertext);      
        //   catchAxiosSuccess(res.message)   

        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}

// register with google
export const registerBusinessWithGoogle = async () => {

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
        let payload = {
                type: "business",
                first_name: userCredential._tokenResponse.firstName,
                last_name: userCredential._tokenResponse.lastName,
                email_address: user.email,
                password: user.uid,
                terms: true,
        };

        let res = await axios.post('business-register',payload);
        let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);      
          catchAxiosSuccess(res.message)   

        return res;
    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }
  
}
// register with google

// export const registerTalentWithGoogle = async () => {

//     try {
//       const provider = new GoogleAuthProvider()
//       const userCredential = await signInWithPopup(auth, provider);
//       const user = userCredential.user;
//         let payload = {
//                 type: "talent",
//                 first_name: userCredential._tokenResponse.firstName,
//                 last_name: userCredential._tokenResponse.lastName,
//                 email_address: user.email,
//                 password: user.uid,
//                 terms: true,
//         };
//         let res = await axios.post('talent-register',payload);
//         let ciphertext = encrypt(JSON.stringify(payload),import.meta.env.VITE_ENCRYPT_KEY)
//         localStorage.setItem('_register_data', ciphertext);       
//          catchAxiosSuccess(res.message)   

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
         catchAxiosSuccess(res.message)   

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
        catchAxiosSuccess(res.message)   

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
    let res = await axios.post('forgot-password', data)
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
    let res = await axios.post('reset-password', data)
    catchAxiosSuccess(res)
    return res
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
}
// reset password
export const resendEmail = async (email ) => {
  let data = {
    email,
  }

  try {
    let res = await axios.post('resend', data)
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


