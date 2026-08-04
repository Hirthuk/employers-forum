import apiClient from "./apiClient";

class AuthService {
  setAuthData(authData) {
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
    localStorage.setItem("sapid", authData.sapid);
    localStorage.setItem("isAuthenticated", "true");
  }

  clearAuthData() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("sapid");
    localStorage.removeItem("isAuthenticated");
  }

  isAuthenticated() {
    return Boolean(localStorage.getItem("isAuthenticated") && localStorage.getItem("authToken"));
  }

  async login(sapid, password) {
    const response = await apiClient.post("/api/auth/login", {
      sapid: Number(sapid),
      password,
    });

    this.setAuthData(response);
    return response;
  }

  async logout() {
    try {
      await apiClient.post("/api/auth/logout", undefined, { auth: true });
    } catch {
      // JWTs are stateless — the server call is a formality; always clear the local session.
    } finally {
      this.clearAuthData();
    }
  }

  async isAdmin() {
    try {
      return await apiClient.post("/api/auth/isAdmin", undefined, { auth: true });
    } catch {
      return false;
    }
  }

  hasRole(role) {
    return this.getUserRole() === role;
  }

  isUser() {
    return this.hasRole("USER");
  }

  getSapId() {
    return localStorage.getItem("sapid");
  }

  getUserRole() {
    return localStorage.getItem("userRole");
  }

  getToken() {
    return localStorage.getItem("authToken");
  }
}

export default new AuthService();
