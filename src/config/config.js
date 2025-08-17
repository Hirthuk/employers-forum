import axios from 'axios'

// Setting the API Configuration to make use of while establishing connection to backend
export const API_CONFIG = {
    BaseURL : import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    EndPoints: {
      USER_DETAILS :  "/api/users",
      PROFILE :  "api/users/profile",
      MAIL : "api/email",
      LOGIN: "api/auth/login",
      LOGOUT: "api/auth/logout",
      EMAIL: "api/email",
      ISADMIN:"api/auth/isAdmin",
      GETUSERDETAILS:"api/users"
    }
}

export const axiosApiClient = axios.create({
    baseURL: API_CONFIG.BaseURL,
    timeout: 20000,
     headers: {
        "Content-Type": "application/json"
     }
})

// Creating interceptors to run this before every requests comes to axios to send the 
// correct config object back which contains the details required to the  axios.. 
// base URL, Endpoint.. Authorization like that

axiosApiClient.interceptors.request.use(
    // Success response
    (config) => {
        const token = localStorage.getItem("authToken");

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log(`Making request to +  ${config.url}`)
        return config;
    },
    (error) => {
        console.error(`Request error + ${error}`)
        // Make the aysnc  Promist to fail
        return Promise.reject(error);
    }
    // Failure response if config build fails
)

// Response interceptors
axiosApiClient.interceptors.response.use(
    (response) => {
        console.log("Response received" + response.status);
        return response;
    },
    (error) => {
        console.error("Internal error");
        if(error.response?.status === 401){
            localStorage.removeItem("authToken");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("Role");
            localStorage.removeItem("sapid");
        }

        if(window.location.pathname !== "/login"){
            window.location.href === '/login';
        }
        return Promise.reject(error);
    }
)

