const router = require("express").Router();
const FavoriteController = require("../controllers/Favorite.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.post("/", verifyAccessToken, FavoriteController.addFavorite);
router.delete("/:id", verifyAccessToken, FavoriteController.deleteFromFav);
router.get("/:id", verifyAccessToken, FavoriteController.getFavorites);

module.exports = router;
