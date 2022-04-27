const express = require("express");
const mysql = require("mysql");
const authController = require('../controllers/auth');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

let router = express.Router()

router.get("/new", authController.isLoggedIn, (req, res) => {
    try {
        if(req.user) {
            user = req.user

            // looking if city is already in favories
            let sql_already_fav = `SELECT * FROM users u, favories f, cities c WHERE u.email = ${user.email} AND u.email = f.email AND f.city_id = c.city_id AND c.name = ${city_found.name}`;
            db.query(sql_already_fav, (err, result) => {
                if(err) throw err;

                if(!result) {
                    // looking if city already existe in the database
                    let sql_already_existe = `SELECT * FROM cities WHERE name = ${city_found.name}`
                    db.query(sql_already_existe, (err, result) => {
                        if(err) throw err;

                        // city isn't in the database
                        if(!result) {
                            let sql_insert_new_city = `INSERT INTO cities (name, country_code, lat, lon) VALUES (${city_found.name}, ${city_found.country_code}, ${city_found.lat}, ${city_found.lon})`
                            db.query(sql_insert_new_city, (err, result) => {
                                if(err) throw err;
                            })
                        }

                        let sql_add_city_fav = `INSERT INTO favories (city_id) SELECT city_id FROM cities WHERE name = ${city_found.name}`
                        db.query(sql_add_city_fav, (err, result) => {
                            if(err) throw err
                            
                            let sql_add_user_fav = `UPDATE favories SET email = ${user.email} WHERE ISNULL(email)`
                            db.query(sql_add_user_fav, (err, result) => {
                                if(err) throw err
                            })
                        })
                    });
                }

                
            });
        }
        else {
            // TODO : ajouter message utilisateur non connecté
            console.log("Utilisateur non connecté")
        }
    }
    catch (error) {
        console.log(error)
    }

    res.status(200).redirect("/");
});


module.exports = router;