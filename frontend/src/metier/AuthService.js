import axios from "axios";
import { VARIABLE_ENVIRONEMENT } from "../consts/Consts";
import jwt_decode from "jwt-decode";

export const customPostPromiseRegistration = (data) => new Promise((resolve, reject) => {
    axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/auth/register",data,{

        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => resolve(true))
        .catch(() => reject(false))
})
export const customPostPromiseLogin = (data) => new Promise((resolve, reject) => {
    axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/auth/login",data,{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => {
            resolve(res.data)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
            return true;
        })
        .catch(() => reject("ERROR"))


    // Localstorage:

})

export const customPostPromiseRefreshToken = () => new Promise((resolve, reject) => {
    axios.post(VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/auth/refresh_token",null,{
        headers: {
            'refresh-token': localStorage.getItem('refresh_token')
        },
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
        .then(res => {
            resolve(res.data)
            localStorage.setItem('token', res.data.token)
            return true;
        })
        .catch(() => reject("ERROR"))


    // Localstorage:

})


export const forwardRole = () => {
    let token = localStorage.getItem("token");
    let decoded= jwt_decode(token);
    console.log(decoded)
    let role = decoded.role
    return role;
}
export const getExpFromToken = () => {
    let token = localStorage.getItem("token");
    let decoded= jwt_decode(token);
    return decoded.exp;
}
export const getPrincipal = () => {
    let token = localStorage.getItem("token");
    let decoded= jwt_decode(token);
    return decoded.name;
}
export const getPrincipalId = () => {
    let token = localStorage.getItem("token");
    let decoded= jwt_decode(token);
    return decoded.id;
}
export const getRoleFromToken = () => {
    let token = localStorage.getItem("refresh_token");
    let decoded= jwt_decode(token);
    return decoded.role;
}

export const getRoleFromPhoto = () => {
    let token = localStorage.getItem("refresh_token");
    let decoded= jwt_decode(token);
    return decoded.photo;
}

export const verifyIfTokenExists = () => {
    let token = localStorage.getItem('refresh_token');
    let exist = false;
    // console.log(token)
    if(token !==null) {
        if(token.length!=="") return true
        return false
    }
    return exist;
}


export const checkTokenExpiration = () => {
    var dateNow = new Date();
    if(getExpFromToken() < dateNow.getTime()){
        console.log("expired")
        return true;
    }
    console.log("not expired")
    return false;
}
