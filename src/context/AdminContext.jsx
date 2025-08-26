import { createContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token] = useState(localStorage.getItem("sapid"));
  const [userRoleDetails, setUserRoleDetails] = useState([]);
  const [adminRoleDetails, setAdminRoleDetails] = useState([]);
  const [pendingRequestDetails, setPendingRequestDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetchers with safe fallback
  const fetchUserRoleDetails = async () => {
    try {
      const userDetails = await AdminService.getUserDetails();
      setUserRoleDetails(userDetails || []);
    } catch (err) {
      console.error("Error fetching user role details:", err);
      setUserRoleDetails([]);
      setError(err);
    }
  };

  const fetchAdminRoleDetails = async () => {
    try {
      const adminDetails = await AdminService.getAdminDetails();
      setAdminRoleDetails(adminDetails || []);
    } catch (err) {
      console.error("Error fetching admin details:", err);
      setAdminRoleDetails([]);
      setError(err);
    }
  };

  const fetchPendingRequestDetails = async () => {
    try {
      const pending = await AdminService.getPendingRequestDetails();
      setPendingRequestDetails(pending || []);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setPendingRequestDetails([]);
      setError(err);
    }
  };

  // ✅ Fetch all data once token is available
  useEffect(() => {
    const getAdminDetails = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await Promise.all([
          fetchUserRoleDetails(),
          fetchAdminRoleDetails(),
          fetchPendingRequestDetails(),
        ]);
      } catch (err) {
        console.error("Error in fetching admin data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAdminDetails();
  }, [token]);

  const values = {
    userRoleDetails,
    adminRoleDetails,
    pendingRequestDetails,
    loading,
    error,
    fetchUserRoleDetails,
    fetchAdminRoleDetails,
    fetchPendingRequestDetails,
  };

  return (
    <AdminContext.Provider value={values}>
      {children}
    </AdminContext.Provider>
  );
};
