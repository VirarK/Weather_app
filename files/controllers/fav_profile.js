const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.get_fav = async(req, res) => {
	var user = req.user
    try {
      sql_get_favs = `SELECT c.name, c.country_code, c.lat, c.lon FROM cities c, users u, favories f WHERE u.email = '${user.email}' AND f.email = u.email AND f.city_id = c.city_id`
      db.query(sql_get_favs, (err, result) => {
        if (err) throw err
		else {
			res.render("profile", {user:user, favs:result})
		}
      })
      
    } catch (error) {
      console.log(error)
    }
}