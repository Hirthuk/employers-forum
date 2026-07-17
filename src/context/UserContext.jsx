import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import ProfileService from '../services/ProfileService';
import AdminService from '../services/AdminService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigator = useNavigate();
  const[token, setToken] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  
  const pages = [
    { id: "happenings", name: "View Happenings" },
    { id: "appreciate", name: "Appreciate" },
    { id: "profile", name: "Profile" },
    { id: "about", name: "About" }
  ];

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      console.log('Checking authentication status...');
      const authenticated = AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        setUser({
          sapId: AuthService.getSapId(),
          role: AuthService.getUserRole(),
          token: AuthService.getToken()
        });
        console.log('User authenticated:', {
          sapId: AuthService.getSapId(),
          role: AuthService.getUserRole()
        });
      }
      
      setLoading(false);
      setToken(AuthService.getToken());
    };

    checkAuth();
  }, [])
  // Login function
  const login = async (sapid, password) => {
    console.log('Login function called with SAP ID:', sapid);
    const response = await AuthService.login(sapid, password);
    // console.log(response);
    setUser({
      sapId: response.sapid || sapid,
      role: response.role,
      token: response.token
    });
    setIsAuthenticated(true);
    return response;
  };
  // Check whether the user is admin with token
const AdminCheck = async (token) => {
  const isAdmin = await AuthService.isAdmin(token);
  if(isAdmin){
    setAdmin(true);
  }
  else{
    setAdmin(false);
  }
}

  // Logout function
  const logout = async () => {
    console.log('Logout function called');
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigator('/login');
  };

  // Get user details function

  const getUserDetails = async() => {
    if(isAdmin) {
      const response = await AdminService.getUserDetails();
      console.log("usercontext", response);
      setUserDetails(response);
      return true;
    }
    return false;
  }

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
    navigator,
    ProfileService,
    userProfile,
    setUserProfile,
    AdminCheck,
    isAdmin,
    getUserDetails,
    userDetails,
    token
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;