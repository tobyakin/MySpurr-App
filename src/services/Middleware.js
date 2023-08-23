import { encrypt, decrypt } from './Encrypt'
// import { useRouter } from 'vue-router';
// const router = useRouter()

const redirectLogin = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)

        if(user.token){
            return ;
        }
        
        return { name: 'login' }

    }

    return { name: 'login' }
}
    
const redirectDashboard = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user = encrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)

        if(user.token){
            return { name: 'dashboard' }
        }
        
    }
    
}

const deleteSession = () => {

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