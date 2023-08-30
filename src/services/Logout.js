import axios from "../axios";
import { catchAxiosError,catchAxiosSuccess }  from "./Response"
import { getToken } from "./Auth";



export const handleLogout = async () => {

    const token = await getToken()
    try {
        let res = await axios.post(`logout`,{ 
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
