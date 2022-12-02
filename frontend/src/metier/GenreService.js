import axios from "axios";
import { VARIABLE_ENVIRONEMENT } from "../consts/Consts";
import {checkTokenExpiration, customPostPromiseRefreshToken} from "./AuthService";

export const customGetAllPromiseGenre = () => new Promise((resolve, reject) => {
    axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/genres")
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetOnePromiseGenre = (id) => new Promise((resolve, reject) => {
    axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/genres/"+id,{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPostPromiseGenre = (data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/genres",data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPutPromiseGenre = (id, data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.put(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/genres/"+id, data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customDeletePromiseGenre = (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.delete(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/genres/"+id,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
