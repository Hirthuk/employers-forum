import { createContext, useContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { UserContext } from "./UserContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { isAdmin } = useContext(UserContext);
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

  // Fetch all data whenever auth state becomes true (covers login happening
  // after this provider already mounted, not just the initial page load).
  useEffect(() => {
    const getAdminDetails = async () => {
      if (!isAdmin) {
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
  }, [isAdmin]);

  const approveRequest = async (request) => {
    const created = await AdminService.approveRequest(request.sapid);
    await Promise.all([
      fetchPendingRequestDetails(),
      fetchUserRoleDetails(),
      fetchAdminRoleDetails(),
    ]);
    return created;
  };

  const rejectRequest = async (request) => {
    await AdminService.rejectRequest(request.sapid);
    await fetchPendingRequestDetails();
  };

  const values = {
    userRoleDetails,
    adminRoleDetails,
    pendingRequestDetails,
    loading,
    error,
    fetchUserRoleDetails,
    fetchAdminRoleDetails,
    fetchPendingRequestDetails,
    approveRequest,
    rejectRequest,
  };

  return (
    <AdminContext.Provider value={values}>
      {children}
    </AdminContext.Provider>
  );
};
