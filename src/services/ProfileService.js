import { axiosApiClient, API_CONFIG } from "../config/config";

class ProfileService {

    async getProfileDetails(){
        try{
        const profileDetails = axiosApiClient.get(API_CONFIG.EndPoints.PROFILE, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return profileDetails;
        }
        catch(error){
            return error;
        }
    }
}

export default new ProfileService();