import { mockDB } from "../data/mockDatabase";
import AuthService from "./AuthService";

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

class ProfileService {
  async getProfileDetails() {
    await delay();
    const sapid = AuthService.getSapId();
    const profile = mockDB.findBySapId(sapid);
    return { data: profile };
  }
}

export default new ProfileService();
