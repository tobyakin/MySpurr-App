import { encrypt, decrypt } from './Encrypt'
// import { useRouter } from 'vue-router';
// const router = useRouter()

const redirectLogin = (to) => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)

        if(user.token){
            return ;
        }
        
        return { name: 'Login' }

    }

    return { name: 'Login' }
}
    
const redirectDashboard = (to) => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user = encrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)

        if(user.token){
            return { name: 'Dashboard' }
        }
        
    }
    
}

const deleteSession = (to) => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData.user){
        localStorage.removeItem("_user_data");
        // router.push({ name: 'login'});
    }
    
}

export default{
    redirectLogin,
    redirectDashboard,
    deleteSession
}