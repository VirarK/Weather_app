const express = require("express");
const authController = require('../controllers/auth');
const weatherController = require('../controllers/weather');
const favController = require('../controllers/favourites');

const router = express.Router();

router.get("/:city/:country_code/:lat/:lon", authController.isLoggedIn, favController.is_favourite, weatherController.get_weather);

module.exports = router;