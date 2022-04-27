const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

let router = express.Router()

router
.route("/new")
.get((req, res) => {
    try {
        console.log("nouveau fav")
        // TODO : vérifier si l'utilisateur est connecté
        if(true) {
            console.log("utilisateur connecté")
            // looking if city is already in favories
            // TODO : ajouter email utilisateur connecté dans requête and nom ville
            let sql_already_fav = `SELECT * FROM users u, favories f, cities c WHERE u.email = 'user1@email.com' AND u.email = f.email AND f.city_id = c.city_id AND c.name = 'Versailles'`;
            db.query(sql_already_fav, (err, result) => {
                if(err) throw err;

                if(result) {
                    console.log("Ville déjà en favoris")
                    return
                }

                // looking if city already existe in the database
                // TODO : mettre nom ville demandé
                let sql_already_existe = `SELECT * FROM cities WHERE name = 'Versailles'`
                db.query(sql_already_existe, (err, result) => {
                    if(err) throw err;

                    // city isn't in the database
                    if(!result) {
                        console.log("Ville n'est pas dans la base de données")
                        let sql_insert_new_city = `INSERT INTO cities (name, country_code, lat, lon) VALUES ("Versailles", "FR", 2, 2)`
                        db.query(sql_insert_new_city, (err, result) => {
                            if(err) throw err;
                        })
                    }

                    // TODO : remplacer par le nom de la ville
                    let sql_add_city_fav = `INSERT INTO favories (city_id) SELECT city_id FROM cities WHERE name = 'Versailles'`
                    db.query(sql_add_city_fav, (err, result) => {
                        if(err) throw err
                        console.log("Insert ville dans fav")
                        // TODO : remplacer par le mail de l'utilisateur
                        let sql_add_user_fav = `UPDATE favories SET email = 'user1@email.com' WHERE ISNULL(email)`
                        db.query(sql_add_user_fav, (err, result) => {
                            if(err) throw err
                            console.log("Insert user dans fav")
                        })
                    })
                });
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