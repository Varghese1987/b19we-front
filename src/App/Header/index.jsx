import React, { useContext } from "react";
import { WrapContext } from "../index";

export const Header=({logout})=>{
    const {user} =useContext(WrapContext)
    return (
        <React.Fragment>
            {user.role?(<nav>
                <button onClick={logout}>Logout</button>
            </nav>):(<></>)}
        </React.Fragment>
    )
}