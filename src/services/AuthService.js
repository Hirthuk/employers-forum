import { mockDB } from "../data/mockDatabase";

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Builds a JWT-shaped (but entirely fake) token so the rest of the app's
// token-parsing logic keeps working without talking to any real server.
function createMockToken(sapid, role) {
  const header = btoa(JSON.stringify({ alg: "mock", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sapid,
      role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
    })
  );
  return `${header}.${payload}.mock-signature`;
}

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
    await delay();

    const user = mockDB.findBySapId(sapid);
    if (!user || user.password !== password) {
      throw new Error("Invalid SAP ID or password. Try the demo credentials shown below.");
    }

    const token = createMockToken(user.sapid, user.role);
    const authData = { token, role: user.role, sapid: user.sapid, name: user.name };
    this.setAuthData(authData);
    return authData;
  }

  async logout() {
    await delay(150);
    this.clearAuthData();
  }

  hasRole(role) {
    return this.getUserRole() === role;
  }

  isAdmin() {
    return this.getUserRole() === "ADMIN";
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
