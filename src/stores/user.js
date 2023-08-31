import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { encrypt,decrypt } from "../services/Encrypt"

export const useStore = defineStore('user', () => {
    const token = ref({});

    const pageTitle = ref({});
    const user = ref({})



    const getUser = computed(() => {
        
        let encryptedData  = localStorage.getItem("_user_data");
        if(encryptedData){
            user.value  = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)
            console.log(user.value.data.user.first_name);
            return user.value.data;
        }
            return user;
    })


    const saveUser = (userData) => {
        user.value = userData
        let ciphertext = encrypt(JSON.stringify(user.value),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_user_data', ciphertext);
    }


    const features = computed(()=>{
        let account = getUser.value.user.type

        let allFeature = ['JOBS','MY_APPLICATIONS','GO_PRO','COURSES','JOBS','MESSAGES']
         
        if(account.toLowerCase() === "business"){
            
            return allFeature = ['JOB_LISTING','MY_SCHEDULE','ALL_APPLICATIONS']
        }
        return allFeature
    })
  
    return { 
        user,
        getUser,
        saveUser,
        token,
        pageTitle,
        features


    }
})