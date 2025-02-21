const router = require("express").Router();
const favoriteRoutes = require("../routes/favorite.routes");
const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse");
const tagsRoutes = require('../routes/tag.routes')

router.use("/auth", authRoutes);
router.use("/favorites", favoriteRoutes);
<<<<<<< Updated upstream
=======
router.use("/search", searchRoutes);
router.use('/tags', tagsRoutes)
>>>>>>> Stashed changes

router.use("*", (req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});

module.exports = router;
