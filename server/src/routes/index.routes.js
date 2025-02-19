const router = require("express").Router(); //* получаем экземпляр роутинга из библиотеки

const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse"); //* подтягиваем утилиту для унификации ответа по 404

router.use("/auth", authRoutes);

//! Обработка всех запросов на несуществующие маршруты (меняем стандартный ответ от express)
router.use("*", (req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});

module.exports = router;
