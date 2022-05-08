const express = require("express");
const authController = require('../controllers/auth');
const weatherController = require('../controllers/weather');

const router = express.Router();

router.get("/:city/:country_code/:lat/:lon", authController.isLoggedIn, weatherController.is_favourite, weatherController.get_weather);

module.exports = router;