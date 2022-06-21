const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '123',
    database: 'pcdb',
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.listen(3001, ()=> {
    console.log("Success! Port: 3001");
});