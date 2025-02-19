const router = require("express").Router();
const favoriteRoutes = require("../routes/favorite.routes");
const authRoutes = require("./auth.routes");
const searchRoutes = require("./search.routes");
const formatResponse = require("../utils/formatResponse");

router.use("/auth", authRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/search", searchRoutes);

router.use("*", (req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});

module.exports = router;
