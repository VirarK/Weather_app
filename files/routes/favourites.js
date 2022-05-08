const express = require("express");
const favController = require('../controllers/favourites');
const authController = require('../controllers/auth');

const router = express.Router();

router.get("/:city/:country_code/:lat/:lon", authController.isLoggedIn, favController.add_favourite);

module.exports = router;