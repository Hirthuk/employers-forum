import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const credentials = {
  sapId: "52006992",
  password: "Sharan@123"
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState('') // No localStorage

   const [currentPage, setCurrentPage] = useState("home"); // Default to home page
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigator = useNavigate();
  const pages = [
    { id: "happenings", name: "View Happenings" },
    { id: "appreciate", name: "Appreciate" },
    { id: "profile", name: "Profile" },
      { id: "/", name: "Insight Hub" }
  ];

  const value = {
    credentials,
    id,
    setId,
    currentPage,
    setCurrentPage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    pages,
    navigator
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;