const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.add_favourite = async(req, res) => {
  if (req.user) {
    user = req.user;

    // looking if city is already in favourites
    let sql_already_fav = `SELECT * FROM users u, favourites f, cities c WHERE u.email = '${user.email}' AND u.email = f.email AND f.city_id = c.city_id AND c.name = '${req.params.city}' AND c.country_code = '${req.params.country_code}'`;
    db.query(sql_already_fav, (err, result) => {
      if (err) throw err;

      if (result[0] == undefined) {
        // looking if city already existe in the database
        let sql_already_existe = `SELECT * FROM cities WHERE name = '${req.params.city}' AND country_code = '${req.params.country_code}'`;
        db.query(sql_already_existe, (err, result) => {
          if (err) throw err;

          // city isn't in the database
          if (result[0] == undefined) {
            let sql_insert_new_city = `INSERT INTO cities (name, country_code, lat, lon) VALUES ('${req.params.city}', '${req.params.country_code}', ${req.params.lat}, ${req.params.lon})`;
            db.query(sql_insert_new_city, (err, result) => {
              if (err) throw err;
            });
          } else {
            console.log("Ville déjà dans la base de données");
          }

          let sql_add_city_fav = `INSERT INTO favourites (city_id, email) SELECT city_id, email FROM cities c, users u WHERE c.name = '${req.params.city}'  AND country_code = '${req.params.country_code}' AND u.email = '${user.email}'`;
          db.query(sql_add_city_fav, (err, result) => {
            if (err) throw err;
          });
        });
      } else {
        console.log("Ville déjà en favoris");
      }
    });
  }

  res.status(200).redirect(`/weather/${req.params.city}/${req.params.country_code}/${req.params.lat}/${req.params.lon}`);
};

exports.get_favourite = async(req, res) => {
  if (req.user) {
    try {
      sql_get_favs = `SELECT c.name, c.country_code, c.lat, c.lon FROM cities c, users u, favourites f WHERE u.email = '${req.user.email}' AND f.email = u.email AND f.city_id = c.city_id`
      db.query(sql_get_favs, (err, result) => {
        if (err) throw err
        else {
          res.render("profile", {user:req.user, favs:result})
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
};

exports.del_favourite = async(req, res) => {
 if (req.user) {
  var user = req.user
  let sql_already_fav = `SELECT * FROM users u, favourites f, cities c WHERE u.email = '${user.email}' AND u.email = f.email AND f.city_id = c.city_id AND c.name = '${req.params.city}' AND c.country_code = '${req.params.country_code}'`;
    db.query(sql_already_fav, (err, result) => {
      if (err) throw err;
      
      if (result[0] != undefined) {  
        let sql_found_city_id = `SELECT city_id FROM cities WHERE name = '${req.params.city}' AND country_code = '${req.params.country_code}'`
        db.query(sql_found_city_id, (err, result) => {
          if (err) throw err;

          if (result[0] != undefined) {
            let sql_del_fav = `DELETE FROM favourites WHERE city_id = ${result[0].city_id}`
            db.query(sql_del_fav, (err, result) => {
              if (err) throw err;
              else {
                res.status(200).redirect(`/weather/${req.params.city}/${req.params.country_code}/${req.params.lat}/${req.params.lon}`);
              }
            })
          }
        })
      }
    })
  }
};

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
	} else {
    next();
  }
};
