// const regex_email =
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const regex_email2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: "Veuillez fournir une adresse mail et un mot de passe"
            })
        } else {
            db.query('SELECT * FROM users WHERE email = ?', [email], async(error, results) => {
                //console.log(results);

                if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
                    res.status(401).render('login', {
                        message: "L'adresse mail ou le mot de passe est incorrect"
                    })
                } else {
                    const email = results[0].email;
                    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    //console.log("The token is: " + token);
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("/");
                }
            })

        }


    } catch (error) {
        console.log(error);
    }
}

exports.register = (req, res) => {
    //console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        const test = db.query('SELECT username FROM users WHERE username = ?', [name], async(error2, results2) => {
            if (error) {
                console.log(error);
            }
            if (error2) {
                console.log(error2);
            }
            if (results2.length > 0) {
                return res.render('register', {
                    message: "Ce nom d'utilisateur existe déjà"
                })
            } else if (results.length > 0) {
                return res.render('register', {
                    message: "Cette adresse mail existe déjà"
                })
            } else if (password !== passwordConfirm) {
                return res.render('register', {
                    message: "Les mots de passe ne correspondent pas"
                })
            } else if (password == '') {
                return res.render('register', {
                    message: "Le mot de passe ne peut pas être vide"
                });
            }

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    db.query('INSERT INTO users SET ?', { username: name, email: email, password: hash }, (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.status(200).redirect("/login");
                            // return res.render('register', {
                            //     message2: "Utilisateur enregistré"
                            // });
                        }
                    })
                });
            });
        })
    })
}


exports.isLoggedIn = async(req, res, next) => {
    // console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //1) verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET
            );

            //console.log(decoded);

            //2) Check if the user still exists
            db.query('SELECT * FROM users WHERE email = ?', [decoded.email], (error, result) => {
                //console.log(result);

                if (!result) {
                    return next();
                }

                req.user = result[0];
                //console.log("user is")
                //console.log(req.user);
                return next();

            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
}

exports.logout = async(req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}