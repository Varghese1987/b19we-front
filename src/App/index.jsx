import React, { useEffect, useState } from 'react'
import { addUser, getUser } from './module'

export const App=()=>{

    const [users, setUsers] = useState([])
    const [user,setUser]=useState({name:""})
    const [isAddOpen,toggleAddOpen]=useState(false)

    const handleUsers=()=>{
        getUser().then((data)=>{
            setUsers(data)
        })
    }

    const handleAddClose=()=>{
        setUser({name:""})
        toggleAddOpen(!isAddOpen)
    }

    const handleCreate=()=>{
        const {name}=user
        addUser(name).then(()=>{
            handleUsers();
            handleAddClose();
        })
    }

    useEffect(()=>{
        handleUsers();
    },[]);

    if(isAddOpen)
    return(
        <div className="container">
            <input 
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={user.name}
            onChange={(e)=>{
                setUser((usr)=>({...usr,name:e.target.value}))
            }}
            />
            <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
            >
                Submit
            </button>
            <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddClose}
            >
                cancel
            </button>

        </div>
    )

    return(
        <div className="container">
            <div className="row">
                <h1>Users List</h1>
            </div>
            <div className="row">
                <button
                type="button"
                className="btn btn-primary"
                onClick={()=>{
                    toggleAddOpen(!isAddOpen)
                }}
                >
                    + Add
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}