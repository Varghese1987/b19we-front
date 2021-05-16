import axios from 'axios';

const serverUrl = 'http://localhost:5050';
const productionUrl="https://b19we-server.herokuapp.com"

export const getUser=()=>{
    return axios.get(`${serverUrl}/users/get-users`).then((res)=>res.data)
}

export const addUser=(name)=>{
    return axios.post(`${serverUrl}/user-create`,{name}).then((res)=>res.data)
}

export const login=(email,password)=>{
    return axios.post(`${serverUrl}/users/login`,{email,password}).then((res)=>res.data)
}

export const getCurentUser=(token)=>{
    return axios.get(`${serverUrl}/users/getUser`,{
        headers:{
            authorization:token
        }
    }).then((res)=>res.data)
} 