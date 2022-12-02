import axios from "axios";
import { VARIABLE_ENVIRONEMENT } from "../consts/Consts";
import {checkTokenExpiration, customPostPromiseRefreshToken} from "./AuthService";

export const customGetAllPromiseEdition = () => new Promise((resolve, reject) => {
    axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/editions")
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetAllPromiseEditionByLivre = (id) => new Promise((resolve, reject) => {
    axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/editions/livre/"+id)
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetOnePromiseEdition = (id) => new Promise((resolve, reject) => {
    axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/editions/"+id,{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPostPromiseEdition = (data) => new Promise((resolve, reject) => {
    axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/editions",data,{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPutPromiseEdition = (id, data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.put(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/editions/"+id, data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customDeletePromiseEdition = (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.delete(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/editions/"+id,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
