import { useContext } from "react";
import { axiosApiClient, API_CONFIG } from "../config/config";
import { UserContext } from "../context/UserContext";
import AuthService from "./AuthService";
class AdminService{


    // Get User Details
    async getUserDetails()  {
        const token = AuthService.getToken();
        const isAdmin = await AuthService.isAdmin(token);
        if(!isAdmin){
            return "Not Authorized to perform this activity"
        }
        try{
            const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETUSERDETAILS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
        }
        catch(error){
            return error.message;
        }
        
    }

    async getAdminDetails() {
       const token = AuthService.getToken();
        const isAdmin = await AuthService.isAdmin(token);
        if(!isAdmin){
            return "Not Authorized to perform this activity"
        }
        try{
            const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETADMINDETAILS, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
        }

        catch(error){
            return error.message;
        }
        
    }

    // Get user details based on role USER
    async getUserDetailsRoleuser(){
        const token = AuthService.getToken;
        const isAdmin = await AuthService.isAdmin();
        if(!isAdmin){
            return "Not Authorized Activity"
        }

        try{
            const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETUSERROLEUSERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        }

        catch(error){
            return error.message;
        }
    }
}

export default new AdminService();