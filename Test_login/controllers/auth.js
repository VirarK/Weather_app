const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;
    // Ligne en dessous fait la meme que au dessus
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
            const test = db.query('SELECT email FROM users WHERE username = ?', [name], async(error2, results2) => {
                if (error) {
                    console.log(error);
                }
                if (error2) {
                    console.log(error2);
                }
                if (results2.length > 0) {
                    return res.render('register', {
                        message: 'This username is already in use'
                    })
                } else if (results.length > 0) {
                    return res.render('register', {
                        message: 'This email is already in use'
                    })
                } else if (password !== passwordConfirm) {
                    return res.render('register', {
                        message: 'Passwords do not match'
                    });
                }
                let hashedPassword = await bcrypt.hash(password, 8);

                db.query('INSERT INTO users SET ?', { username: name, email: email, password: hashedPassword }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        return res.render('register', {
                            message2: 'User registered'
                        });
                    }
                })
            })
        })
        // res.send("Form submitted");
}