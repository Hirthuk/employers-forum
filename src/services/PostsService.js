import { mockDB } from "../data/mockDatabase";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

class PostsService {
  async getPosts() {
    await delay();
    return mockDB.getPosts();
  }

  async addPost(post) {
    await delay(400);
    return mockDB.addPost(post);
  }

  async likePost(id) {
    await delay(150);
    return mockDB.likePost(id);
  }

  countSentThisMonth(sapid) {
    return mockDB.countSentThisMonth(sapid);
  }
}

export default new PostsService();
