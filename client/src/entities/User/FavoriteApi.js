import { axiosInstance } from "../../shared/lib/axiosInstance";

export default class FavoriteApi {
  static async addFav({ userId, newsId }) {
    const { data } = await axiosInstance.post(`/favorites/${userId}`, {
      newsId,
    });
    return data;
  }
  static async deleteFav({ userId, newsId }) {
    const { data } = await axiosInstance.delete(
      `/favorites/${userId}/${newsId}`
    );
    return data;
  }
  static async getFav(userId) {
    const { data } = await axiosInstance.get(`/favorites/${userId}`);
    return data;
  }
}
