import apiClient from "./apiClient";

class ProfileService {
  async getProfileDetails() {
    const profile = await apiClient.get("/api/users/profile", { auth: true });
    return { data: profile };
  }
}

export default new ProfileService();
