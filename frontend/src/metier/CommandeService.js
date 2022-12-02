import axios from "axios";
import { VARIABLE_ENVIRONEMENT } from "../consts/Consts";
import {checkTokenExpiration, customPostPromiseRefreshToken} from "./AuthService";


export const customPostPromiseCommande = (data) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.post(VARIABLE_ENVIRONEMENT.HOST + ":" + VARIABLE_ENVIRONEMENT.PORT + "/commandes/add_commande", data, {
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customGetPromiseCommande = () => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/commandes",{
        headers: {
          'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})
export const customDeletePromiseCommande = (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.delete(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/commandes/"+id,{
        headers: {
          'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(true))
        .catch(() => resolve(false))
})
export const customGetOnePromiseCommande = (id) => new Promise(async (resolve, reject) => {
    if (checkTokenExpiration()) {
        await customPostPromiseRefreshToken()
    }
    await axios.get(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/commandes/"+id,{
        headers: {
          'auth-token': localStorage.getItem('token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(res.data))
        .catch(() => reject("ERROR"))
})