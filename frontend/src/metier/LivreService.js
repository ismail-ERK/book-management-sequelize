import axios from "axios";
import { VARIABLE_ENVIRONEMENT } from "../consts/Consts";
import {checkTokenExpiration, customPostPromiseRefreshToken} from "./AuthService";

export const customGetAllPromise = () => new Promise( (resolve, reject) => {
  axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/livres")
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetOnePromise = (id) => new Promise((resolve, reject) => {
   axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/livres/"+id,{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPostPromise = (data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/livres",data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPostPromiseEditionToBook = (id,data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/livres/add_to_book/"+id,data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPutPromise = (id, data) => new Promise(async (resolve, reject) => {
    axios.put(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/livres/"+id, data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customDeletePromise = (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.delete(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/livres/"+id,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
