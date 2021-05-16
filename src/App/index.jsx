import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Header } from './Header';
import { Login } from './Login';
import { getCurentUser } from './module';
import { UserProducts } from './Products/usersAccess';
import { Users } from './Users';

export const WrapContext = React.createContext({
    user:null,
    isloggedIn:false,
    logout:()=>{}
})

const WrapperRoute = ({render, ...restprops})=>{
    const {isloggedIn,user}=useContext(WrapContext)
    return(
        <Route
        {...restprops}
        render={(props)=>{
            if(isloggedIn){
                if(user.role ===1){
                    return <Redirect to={"/admin/users"} />
                }else{
                    return <Redirect to={"/user/products"} />
                }
            }else{
                return render(props)
            }
        }}
         />
    )
}

const ProdutectRoute = ({component:Component, ...restprops})=>{
    const {isloggedIn,logout,user} = useContext(WrapContext)
    return(
        <Route
        {...restprops}
        exact
        render={(props)=>{
            if(!isloggedIn){
                return <Redirect to= "/login" />
            }return(
                <>
                <Header logout={logout} user={user}/>

                <Component {...props} user={user}/>
                </>
            )
        }}
         />
    )
}

export const App=()=>{
 const [user, setUser] = useState(null);
 const [isloggedIn, setIsLoggedIn]=useState(false)
    
const handlelogin=(token,user)=>{
    setUser(user);
    setIsLoggedIn(true);
}

useEffect(()=>{
    const token = localStorage.getItem("auth_token")
    if(token){
        getCurentUser(token)
        .then((data)=>{
            setUser(data);
            setIsLoggedIn(true);
        })
        .catch(()=>{
            logout()
        })
    }else{
        logout();
    }
})

const logout = ()=>{
    localStorage.removeItem("auth_token");
    setUser(null);
    setIsLoggedIn(false)
}
    

    return (
        <Router>
            <WrapContext.Provider
            value={{
                user,
                isloggedIn,
                logout
            }}
            >

            <Switch>
                <Route exact path="/" render={()=><Redirect to="/login"/>} />
                <WrapperRoute exact path="/login"
                render={(props)=><Login {...props} handlelogin={handlelogin}/>}
                />
                <ProdutectRoute exact path="/admin/users"
                component={Users}
                />
                <ProdutectRoute exact path="/user/products"
                component={UserProducts}
                />
            </Switch>
            </WrapContext.Provider>
        </Router>
    )
}