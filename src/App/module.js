import axios from 'axios';

const serverUrl = 'http://localhost:5000';
const productionUrl="https://b19we-server.herokuapp.com"

export const getUser=()=>{
    return axios.get(`${serverUrl}/get-users`).then((res)=>res.data)
}

export const addUser=(name)=>{
    return axios.post(`${serverUrl}/user-create`,{name}).then((res)=>res.data)
}