import React, { createContext } from 'react'

export const dataContext = createContext()


function AuthContext({children}) {

    const serverUrl = "https://backend-airbnb-seven.vercel.app";
    const value = {
        serverUrl
    }

  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default AuthContext
