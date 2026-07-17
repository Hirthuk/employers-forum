import { mockDB } from "../data/mockDatabase";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

class AdminService {
  async getUserDetails() {
    await delay();
    return mockDB.getUsers();
  }

  async getAdminDetails() {
    await delay();
    return mockDB.getAdmins();
  }

  async getPendingRequestDetails() {
    await delay();
    return mockDB.getPendingRequests();
  }

  async approveRequest(sapid) {
    await delay(400);
    const user = mockDB.approveRequest(sapid);
    if (!user) throw new Error("Request not found");
    return user;
  }

  async rejectRequest(sapid) {
    await delay(250);
    mockDB.rejectRequest(sapid);
    return true;
  }
}

export default new AdminService();
