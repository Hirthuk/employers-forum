import { Children, createContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";

// Create the Context
export const AdminContext = createContext();

// Create the Context provider
export const AdminProvider = ({children}) => {
    const [userRoleDetails, setUserRoleDetails] = useState(null);
    const [adminRoleDetails, setAdminRoleDetails] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize as true

    useEffect(() => {
       const fetchData = async () => {
          try {
            setLoading(true);
            await fetchUserRoleDetails();
            await fetchAdminRoleDetails();
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false); // Always set loading to false when done
          }
        }
        fetchData();
    }, [])

    // Get UserRole details
    const fetchUserRoleDetails = async () => {
        const userDetails = await AdminService.getUserDetails();
        setUserRoleDetails(userDetails);
    }

    const fetchAdminRoleDetails = async () => {
        const admindetails = await AdminService.getAdminDetails();
        setAdminRoleDetails(admindetails);
    }

    const values = {
        userRoleDetails,
        adminRoleDetails,
        loading
    }

    return (
       <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    )
}