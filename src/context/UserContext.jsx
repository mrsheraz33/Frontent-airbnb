import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { dataContext } from './AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const userDataContext = createContext()


const UserContext = ({children}) => {
    const navigate = useNavigate()
    const {serverUrl} = useContext(dataContext)
    const [userData, setUserdata] = useState("")

    const getCurrentUser = async ()=>{
        try {
            let result = await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
            console.log(result.data);
            setUserdata(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
getCurrentUser()
    },[])



    const value = {
        userData,
        setUserdata,
        getCurrentUser
    }

  return (
<userDataContext.Provider value={value}>
    {children}
</userDataContext.Provider>
  )
}

export default UserContext