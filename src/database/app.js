const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'thkr',
    password: 'password',
    database: 'nodemysql'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connected...");
});

const app = express();

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL)';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});

app.get('/adduser', (req, res) => {
    let user = { username: 'VirarK', email: 'virark@virark.com', password: 'amogus' }

    try {
        let sql = 'INSERT INTO users SET ?';
        db.query(sql, user);
    } catch (error) {
        if (error.parent.code === 'ER_DUP_ENTRY') {
            console.log("chozure");
        } else {
            console.log(result);
            res.send('User added...');
        }
    }

    // db.query(sql, user, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     res.send('User added...');
    // });
});


app.listen('3000', () => {
    console.log("Server started on port 3000");
});