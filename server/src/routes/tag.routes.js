const router = require("express").Router();
const AuthController = require('../controllers/Auth.controller')

router.post('/addGoodTag', AuthController.addGoodTag)
router.post('/addBadTag', AuthController.addBadTag)

module.exports = router;
