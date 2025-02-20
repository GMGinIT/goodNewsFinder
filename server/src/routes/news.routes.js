const router = require("express").Router();
const NewsController = require("../controllers/newsController");

router.get("/", NewsController.fetchNews);

module.exports = router;
