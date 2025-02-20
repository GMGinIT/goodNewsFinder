const router = require("express").Router();
const FavoriteController = require("../controllers/Favorite.controller");
// const verifyAccessToken = require("../middleware/verifyAccessToken");

router.post("/:userId", FavoriteController.addFavorite);
router.delete("/:userId/:newsId", FavoriteController.deleteFromFav);
router.get("/:userId", FavoriteController.getFavorites);

module.exports = router;
