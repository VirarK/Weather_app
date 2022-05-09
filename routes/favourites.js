const express = require("express");
const favController = require('../controllers/favourites');
const authController = require('../controllers/auth');

const router = express.Router();

router.get("/new/:city/:country_code/:lat/:lon", authController.isLoggedIn, favController.add_favourite);
router.get("/del/:city/:country_code/:lat/:lon", authController.isLoggedIn, favController.del_favourite);

module.exports = router;