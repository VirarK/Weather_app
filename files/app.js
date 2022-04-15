const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config.env' })

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Récup les données encodées par l'URL (HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (api clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("MYSQL Connected...")
    }
})

// On définit les routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
})