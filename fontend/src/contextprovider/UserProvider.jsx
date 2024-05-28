import React, { createContext, useState } from 'react'
export const User = createContext();
const UserProvider = ({children}) => {
    const [token,setToken] = useState(JSON.parse(localStorage.getItem("token")));
    const [userDetails,setUserDetails]= useState({

    })
    console.log(token)
  return (
    <User.Provider value={{userDetails,token,setToken}}>
      {children}
    </User.Provider>
  )
}

export default UserProvider
