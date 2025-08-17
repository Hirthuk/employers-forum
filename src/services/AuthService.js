import { API_CONFIG, axiosApiClient } from "../config/config";

class AuthService {
  // setting Authentication information in the localstorage
  setAuthData(authData) {
    console.log("Settin authentication Data");
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
    localStorage.setItem("sapid", authData.sapid);
    localStorage.setItem("isAuthenticated", true);
  }

  // Clearing authentication data
  clearAuthData(){
    console.log("User logging out");
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("sapid");
    localStorage.removeItem("isAuthenticated");
  }
  // Verifying the user is Authenticated
  isAuthenticated() {
    const authenticated = localStorage.getItem("isAuthenticated") && localStorage.getItem("authToken");
    return authenticated;
  }
  // Logon Request
  async login(sapid, password) {
    try {
      const response = await axiosApiClient.post(API_CONFIG.EndPoints.LOGIN, {
        sapid,
        password,
      });

      this.setAuthData(response.data);
      // Config will handle and send response as interceptor
      return response.data;

    } catch (error) {
        console.error("Wrong crendentials")
        return error;
    }
  }

  async logout(){
    console.log("Logging out User");
    const sapid = localStorage.getItem("sapid")
    try{
      const response = await axiosApiClient.get(API_CONFIG.EndPoints.LOGOUT, {
        sapid
      });
      return response.data;
    }
    catch(error){
      return error.message;
    }
    finally{
      console.log("User data cleared");
      this.clearAuthData();
    }
  }

  hasRole(role){
    const userRole = this.getUserRole();
    return userRole === role; 
  }

  async  isAdmin(){
    const token = this.getToken();
    try{
        const isAdmin = await axiosApiClient.post(API_CONFIG.EndPoints.ISADMIN, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if(isAdmin){
          return true;
        }
        else{
          return false;
        }
    }
    catch(error){
      return error.message;
    }
  }

  isUser(){
    return this.hasRole('USER');
  }
// Getter methods
  getSapId(){
    return localStorage.getItem("sapid")
  }

  getUserRole(){
    return localStorage.getItem("userRole");
  }

  getToken(){
    return localStorage.getItem("authToken");
  }

}

// Exporting the object of the class
export default new AuthService();