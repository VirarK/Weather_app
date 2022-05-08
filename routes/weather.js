const express = require("express");
const authController = require("../controllers/auth");

let router = express.Router();

router.get(
	"/:city/:country_code/:lat/:lon",
	authController.isLoggedIn,
	(req, res) => {
		if (req.user) {
			res.render(
				"weather", 
				{
					user:req.user,
					city:req.params.city, 
					country_code:req.params.country_code,
					lat:req.params.lat,
					lon:req.params.lon
				}
			)
		} else {
			res.render(
				"weather", 
				{
					city:req.params.city, 
					country_code:req.params.country_code,
					lat:req.params.lat,
					lon:req.params.lon
				}
			)
		}
	}
);

module.exports = router;