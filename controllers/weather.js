exports.get_weather = async(req, res) => {
	if (req.user) {
		res.render(
			"weather", 
			{
				user:req.user,
				is_favourite: req.is_favourite,
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
};

