const { Favorite } = require("../db/models");

class FavoriteService {
  static async addFav({ userId, newsId }) {
    const existingFav = await Favorite.findOne({ where: { userId, newsId } });
    if (existingFav) {
      throw new Error("новость уже добавлена в избранное");
    }
    return await Favorite.create({ userId, newsId });
  }
  static async deleteFav(userId, newsId) {
    const favorite = await Favorite.findOne({ where: { userId, newsId } });
    if (favorite) {
      await favorite.destroy();
      return favorite;
    }
    throw new Error("новость не найдена в избранном");
  }
  static async getFav(userId) {
    return await Favorite.findAll({ where: { userId } });
  }
}

module.exports = FavoriteService;
