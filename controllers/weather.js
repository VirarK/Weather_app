const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.is_favourite = async(req, res, next) => {
	if (req.user) {
		var user = req.user
		let sql_already_fav = `SELECT * FROM users u, favourites f, cities c WHERE u.email = '${user.email}' AND u.email = f.email AND f.city_id = c.city_id AND c.name = '${req.params.city}' AND c.country_code = '${req.params.country_code}'`;
		db.query(sql_already_fav, (err, result) => {
			if (err) throw err;
			if (result[0] != undefined) {
				req.is_favourite = true;
				return next();
			} else {
				req.is_favourite = false;
				return next();
			}
		})
	}
};

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

