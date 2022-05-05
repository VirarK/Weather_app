const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.get_favorites = async(req, res) => {
    user = req.user
    try {
        fav_list = document.getElementById("fav-list");
        fav_list.innerHTML = "";

        sql_get_favs = `SELECT c.name, c.country_code, c.lat, c.lon FROM cities c, users u, favorites f WHERE u.email = ${user.email} AND f.email = u.email AND f.city_id = c.city_id`
        db.query(sql_get_favs, (err, result) => {
            if (err) throw err

        })
        return res.status(200).render('profile');
    } catch (error) {

    }
}