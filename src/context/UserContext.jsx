import React, { createContext, useState } from 'react'

const credentials = {
  sapId: "52006992",
  password: "Sharan@123"
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState('') // No localStorage

  const value = {
    credentials,
    id,
    setId
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;