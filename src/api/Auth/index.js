import {API_URL} from "../../utils/constants";
import { axiosInstance } from "@/components/api/axios-instance";


 class AuthApi {

    async signUp (values) {

        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            image: values.image,
            email: values.email,
            password: values.password
        }

        return new Promise(async (resolve, reject) => {
            try{
                await axiosInstance.post(`${API_URL.SIGN_UP}`, data).then((res) => {
                    if(res.data.success){
                        resolve(res.data.message)
                    }
                    else{
                        reject( new Error(res.data.error))
                    }
                })
            }catch(err){
                reject( new Error(err.message))
            }


        })

    };

    async logIn (values) {

        const data = {
            email: values.email,
            password: values.password
        }

        return new Promise(async (resolve, reject) => {
            try{
                await axiosInstance.post(`${API_URL.LOG_IN}`, data).then((res) => {
                    if(res.data.success){
                        resolve(res.data)
                    }
                    else{
                        reject( new Error(res.data.message))
                    }
                })
            }catch(err){
                reject( new Error(err.message))
            }


        })

    };

 }

 export const Auth = new AuthApi();

