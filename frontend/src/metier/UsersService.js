import axios from "axios";
import { VARIABLE_ENVIRONEMENT } from "../consts/Consts";
import {checkTokenExpiration, customPostPromiseRefreshToken} from "./AuthService";

export const customGetAllPromiseUsers = () => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users",{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetOnePromiseUsers= (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users/"+id,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetOnePromiseUsersCommandes= (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users/"+id+"/commandes",{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPostPromiseUsers = (data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users",data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPutPromiseUsers = (id, data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.put(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users/"+id, data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customPutPromiseUsersPhoto = (id, data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.put(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users/"+id+"/photo", data,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customDeletePromiseUsers = (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.delete(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/users/"+id,{
        headers: {
            'auth-token': localStorage.getItem('token')
        },})
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
