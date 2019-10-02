var express = require('express');
var app = express();


var config = require("./config");
var router = express.Router();

var sql = require('mysql');
var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'nodejsWithSQL'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

router.get("/users", function (req, res) {
    console.log("Hi this is user get router");

    con.query('SELECT * from users', function (err, users) {
        con.end();
        if (err) {
            res.json({
                status: false,
                error: err
            })
        }
        else {
            res.json({
                status: true,
                users: users
            })
        }
    });
})


app.use("/api", router);
app.listen(config.port, function () {
    console.log("Hello test connect", config.port);
})