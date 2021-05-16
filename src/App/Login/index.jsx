import React, { useState } from 'react';

import {login} from '../module'

export const Login=({handlelogin, history})=>{

    const [user, setUser]=useState({email:"",password:""})

    const handleLogin=()=>{
        const {email,password} =user;
        console.log(user)
        login(email,password)
        .then(data=>{
            const {user,token} = data
            // console.log(data.token)
            localStorage.setItem("auth_token",token)
            handlelogin(token,user)
            if(user.role == 1){
                history.push("/admin/users")
            }else if(user.role ==2){
                history.push("/user/products")
            }
        })
    }

    return (
        <div className="container">
            <input 
            type="email"
            name="email"
            value={user.email}
            onChange={(e)=>{
                setUser((usr)=>({...usr, email:e.target.value}))
            }}
            placeholder="Enter Email"
             />
             <input 
            type="password"
            name="password"
            value={user.password}
            onChange={(e)=>{
                setUser((usr)=>({...usr, password:e.target.value}))
            }}
            placeholder="Enter your password"
             />
             <button onClick={handleLogin}>Login</button>
        </div>
    )
}