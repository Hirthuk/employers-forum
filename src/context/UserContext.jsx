import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigator = useNavigate();
  
  const pages = [
    { id: "happenings", name: "View Happenings" },
    { id: "appreciate", name: "Appreciate" },
    { id: "profile", name: "Profile" },
    { id: "/", name: "About" }
  ];

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      console.log('Checking authentication status...');
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        setUser({
          sapId: authService.getUserSapId(),
          role: authService.getUserRole(),
          token: authService.getToken()
        });
        console.log('User authenticated:', {
          sapId: authService.getUserSapId(),
          role: authService.getUserRole()
        });
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (sapid, password) => {
    console.log('Login function called with SAP ID:', sapid);
    const response = await authService.login(sapid, password);
    setUser({
      sapId: response.sapid || sapid,
      role: response.role,
      token: response.token
    });
    setIsAuthenticated(true);
    return response;
  };

  // Logout function
  const logout = async () => {
    console.log('Logout function called');
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigator('/login');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
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