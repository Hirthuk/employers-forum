import { Children, createContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";


// Create the Context
export const AdminContext = createContext();

// Create the Context provider
export const AdminProvider = ({children}) => {
    const [userRoleDetails, setUserRoleDetails] = useState(null);
    const [adminRoleDetails, setAdminRoleDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       const fetchData =  async () => {
          await  fetchUserRoleDetails();
          await fetchAdminRoleDetails();
          setLoading(true);
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
        console.log(adminRoleDetails);
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
