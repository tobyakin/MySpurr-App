import { decrypt } from '@/services/Encrypt'

const redirectLogin = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)

        if(user.data.token){
            return ;
        }
        
        return { name: 'login' }

    }

    return { name: 'login' }
}
    
const redirectDashboard = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        let user = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)
        console.log(user.data.token)
        if(user.data.token){

            return { name: 'dashboard' }
        }
        
    }
    
}
const deleteSession = () => {

    let encryptedData  = localStorage.getItem("_user_data");
    if(encryptedData){
        localStorage.removeItem("_user_data");
        return { name: 'login' }
    }
    
}

export default{
    redirectLogin,
    redirectDashboard,
    deleteSession
}