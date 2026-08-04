import apiClient from "./apiClient";

class PostsService {
  async getPosts() {
    return apiClient.get("/api/appreciate");
  }

  async addPost(post) {
    const result = await apiClient.post("/api/appreciate", {
      from_sapid: Number(post.from_sapid),
      to_sapid: Number(post.to_sapid),
      appreciation_header: post.appreciation_header,
      appreciation_message: post.appreciation_message,
    });
    // The backend responds 200 with a plain message even when the recipient
    // doesn't exist, instead of an error status — check the message itself.
    if (typeof result === "string" && result.includes("is not Present")) {
      throw new Error("Recipient SAP ID not found.");
    }
    return result;
  }

  async likePost(id) {
    return apiClient.post(`/api/appreciate/like/${id}`);
  }

  async countSentThisMonth(sapid, ref = new Date()) {
    const posts = await this.getPosts();
    return (posts || []).filter((p) => {
      if (String(p.from_sapid) !== String(sapid)) return false;
      const d = new Date(p.creation_date);
      return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
    }).length;
  }
}

export default new PostsService();
