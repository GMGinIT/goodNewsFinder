const FavoriteService = require("../services/Favorite.service");
const formatResponse = require("../utils/formatResponse");

class FavoriteController {
  static async addFavorite(req, res) {
    const { userId, newsId } = req.params;
    console.log(userId, newsId, "222222222222222222");

    try {
      const newFav = await FavoriteService.addFav({ userId, newsId });
      res.status(201).json(formatResponse(201, "success", newFav));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteFromFav(req, res) {
    const { userId, newsId } = req.params;
    try {
      const deletedFav = await FavoriteService.deleteFav(userId, newsId);
      res.status(200).json(formatResponse(200, "success", deletedFav));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async getFavorites(req, res) {
    const { userId } = req.params;
    try {
      const favorites = await FavoriteService.getFav(userId);
      res.status(200).json(formatResponse(200, "success", favorites));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = FavoriteController;
