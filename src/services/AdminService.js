import apiClient from "./apiClient";

class AdminService {
  async getUserDetails() {
    return apiClient.get("/api/users/userroleusers", { auth: true });
  }

  async getAdminDetails() {
    return apiClient.get("/api/users/adminusers", { auth: true });
  }

  async getPendingRequestDetails() {
    return apiClient.get("/api/requestUser/details", { auth: true });
  }

  async approveRequest(sapid) {
    return apiClient.post(`/api/requestUser/approve/${Number(sapid)}`, undefined, { auth: true });
  }

  async rejectRequest(sapid) {
    await apiClient.post("/api/requestUser/delete", Number(sapid), { auth: true });
    return true;
  }
}

export default new AdminService();
