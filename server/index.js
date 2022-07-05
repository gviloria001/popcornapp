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
    multipleStatements: true,
});


const whichTheater = (theaterName) => {
    switch (theaterName) {
        case 'All':
            return ``;
        case 'Del Amo':
            return `where theaterName = 'Del Amo'`
        case 'South Bay Pavilion':
            return `where theaterName = 'South Bay Pavilion'`
        case 'Rolling Hills':
            return `where theaterName = 'Rolling Hills'`
        case 'South Bay Galleria':
            return `where theaterName = 'South Bay Galleria'`
        default:
            return ``;
    };
}


app.get(':theaterName/locationList', (req, res) => {
    var theaterName = req.params.theaterName;
    console.log('SUCCESS');
    const query = "SELECT locationName " +
        "FROM location " +
        "JOIN theater " +
        "USING (theaterID) " +
        "WHERE theaterName = " + theaterName;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

})

app.get('http://localhost:3001/inventory/Product=:productName/Location=:locationName/Theater=:theaterName', (req, res) => {
    var productName = req.params.productName;
    var locationName = req.params.locationName;
    var theaterName = req.params.theaterName;
    const query = "SELECT locationName, productName,  quantity, theaterName " +
        "FROM product " +
        "JOIN productlocation " +
        "USING (productID) " +
        "JOIN location " +
        "USING (locationID) " +
        "JOIN theater " +
        "USING (theaterID) " +
        whichTheater(theaterName);


    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.get('/inventory/:theaterName', (req, res) => {
    var theaterName = req.params.theaterName;


    const query = "SELECT productName, totalQuantity, theaterName " +
        "FROM productlist " +
        "JOIN product " +
        "USING (productid) " +
        "join theater " +
        "USING (theaterID) " + whichTheater(theaterName)
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});

app.post("/addUser", (req, res) => {
    const userFirstName = req.body.userFirstName;
    const userLastName = req.body.userLastName;
    const userEmail = req.body.userEmail;
    const userPhoneNumber = req.body.userPhoneNumber;
    const userAccountName = req.body.userAccountName;
    const userAccountPassword = req.body.userAccountPassword;
    const theaterID = req.body.theaterID;
    const isManager = req.body.isManager;
    const isAdmin = req.body.isAdmin;

    db.query(
        "INSERT INTO user (userFirstName, userLastName, userEmail, userPhoneNumber, userAccountName, userAccountPassword ) VALUES (?,?,?,?,?,?); " +
        " INSERT INTO userbelongsto (userID, theaterID, isAdmin, isManager) VALUES (LAST_INSERT_ID(), ?, ?, ?)",
        [userFirstName, userLastName, userEmail, userPhoneNumber, userAccountName, userAccountPassword, theaterID, isAdmin, isManager],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.post('/accountinfo', (req, res) => {
    const userAccountName = req.body.tempAccountName;
    const userAccountPassword = req.body.tempAccountPassword;
    db.query("SELECT userAccountName, userAccountPassword FROM user  WHERE userAccountName = ? && userAccountPassword = ?", [userAccountName, userAccountPassword], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

app.get('/users', (req, res) => {
    db.query("SELECT userFirstName, userLastName, theaterName, userEmail, userPhoneNumber, userID " +
        "from user " +
        "join userbelongsto " +
        "using (userID )" +
        "join theater " +
        "using (theaterID) " +
        "ORDER BY userLastName, " +
        "userID", (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        });
});

app.delete("/delete/:userID", (req, res) => {
    const userID = req.params.userID;
    db.query("DELETE FROM userbelongsto WHERE userID = ?; " +
        "DELETE FROM user WHERE userID = ?", [userID, userID], (err, result) => {
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