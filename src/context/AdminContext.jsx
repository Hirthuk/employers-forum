import { createContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [userRoleDetails, setUserRoleDetails] = useState([]);
    const [adminRoleDetails, setAdminRoleDetails] = useState([]);
    const [pendingRequestDetails, setPendingRequestDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initFetch = async () => {
            try {
                setLoading(true);
                setError(null);
                await Promise.all([
                    fetchUserRoleDetails(),
                    fetchAdminRoleDetails()
                ]);
            } catch (err) {
                setError(err.message);
                console.error("Error initializing admin data:", err);
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem('authToken');
        if (token) {
            initFetch();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserRoleDetails = async () => {
        try {
            const userDetails = await AdminService.getUserDetails();
            setUserRoleDetails(Array.isArray(userDetails) ? userDetails : []);
        } catch (error) {
            console.error("Error fetching user role details:", error);
            setUserRoleDetails([]);
            throw error;
        }
    };

    const fetchAdminRoleDetails = async () => {
        try {
            const adminDetails = await AdminService.getAdminDetails();
            setAdminRoleDetails(Array.isArray(adminDetails) ? adminDetails : []);
        } catch (error) {
            console.error("Error fetching admin details:", error);
            setAdminRoleDetails([]);
            throw error;
        }
    };

    const fetchPendingRequestDetails = async () => {
        try {
            const pendingRequests = await AdminService.getPendingRequestDetails();
            setPendingRequestDetails(Array.isArray(pendingRequests) ? pendingRequests : []);
            return pendingRequests;
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            setPendingRequestDetails([]);
            throw error;
        }
    };

    const values = {
        userRoleDetails,
        adminRoleDetails,
        pendingRequestDetails,
        loading,
        error,
        fetchUserRoleDetails,
        fetchAdminRoleDetails,
        fetchPendingRequestDetails
    };

    console.log("AdminContext - UserDetails:", userRoleDetails);
    console.log("AdminContext - AdminDetails:", adminRoleDetails);
    console.log("AdminContext - PendingRequests:", pendingRequestDetails);

    return (
        <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    );
};