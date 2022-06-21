const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'pcdb',
});



app.post("/addUser", (req, res) => {
    const userFirstName = req.body.userFirstName;
    const userLastName = req.body.userLastName;
    const userEmail = req.body.userEmail;
    const userPhoneNumber = req.body.userPhoneNumber;

    db.query(
        "INSERT INTO user (userFirstName, userLastName, userEmail, userPhoneNumber) VALUES (?,?,?,?)",
        [userFirstName, userLastName, userEmail, userPhoneNumber],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get('/accountinfo', (req, res) => {
    const userAccountName = req.body.userAccountName;
    const userAccountPassword = req.body.userAccountPassword;
    db.query("SELECT userAccountName, userAccountPassword FROM user  WHERE userAccountName = ? && userAccountPassword = ?", [userAccountName, userAccountPassword], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.get('/users', (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.delete("/delete/:userID", (req, res) => {
    const userID = req.params.userID;
    db.query("DELETE FROM user WHERE userID = ?", userID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Success! Port: 3001");
});