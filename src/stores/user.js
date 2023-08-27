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

    const registeredUser = ref({});

    const getRegisterUser = computed(() => {

        let encryptedData  = localStorage.getItem("_register_data");
        if(encryptedData){
            registeredUser.value  = decrypt(encryptedData,import.meta.env.VITE_ENCRYPT_KEY)
            return  registeredUser.value;
        }

        return null;

    })

    const updateRegisteruser = (key,data) => {
        registeredUser.value[key] = data;
        let ciphertext = encrypt(JSON.stringify(registeredUser.value),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_register_data', ciphertext);
    }

    const saveUser = (userData) => {
        user.value = userData
        let ciphertext = encrypt(JSON.stringify(user.value),import.meta.env.VITE_ENCRYPT_KEY)
        localStorage.setItem('_user_data', ciphertext);
    }

    const deleteUser = () => {
        user.value = {
            token:""
        }
        localStorage.removeItem('_user_data');
    }

    const features = computed(()=>{
        let account = getUser.value.details.account_type

        let allFeature = ['']
         
        if(account.toLowerCase() == "talent"   || account.toLowerCase() === "business"){
            
            return allFeature = ['']
        }
        return allFeature
    })
  
    return { 
        user,
        getUser,
        getRegisterUser ,
        saveUser,
        deleteUser,
        updateRegisteruser,
        token,
        pageTitle,
        features


    }
})