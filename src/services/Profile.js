import axios from "../axios";
import { catchAxiosError,catchAxiosSuccess }  from "./Response"
import { getToken } from "./Auth";



export const handleTalentWorkDetails = async (payload) => {

    const token = await getToken()
    try {
        let res = await axios.post(`talent-work-details`,payload,{ 
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
        catchAxiosSuccess(res)   
        return res.data;

    } catch (error) {
        catchAxiosError(error)   
        throw error;
    }

}
