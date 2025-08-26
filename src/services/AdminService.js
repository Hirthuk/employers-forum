import { axiosApiClient, API_CONFIG } from "../config/config";
import AuthService from "./AuthService";

class AdminService {
    // Get User Details (non-admin users)
    async getUserDetails() {
        const token =  AuthService.getToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        try {
            const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETUSERROLEUSERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            throw error;
        }
    }

    // Get Admin Details
    async getAdminDetails() {
        const token = AuthService.getToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        try {
            const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETADMINDETAILS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching admin details:", error);
            throw error;
        }
    }

    // Get pending request details
    async getPendingRequestDetails() {
        const token = AuthService.getToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        try {
            const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETUSERREQUESTDETAILS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            throw error;
        }
    }
}

export default new AdminService();