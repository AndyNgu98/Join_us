var express             = require('express');
var mysql               = require('mysql');
var bodyParser          = require("body-parser");
var app                 = express();
 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DogSensei101!",
    database: "join_us"
  });

app.get("/", function(req, res){
    //FOIND COUNT OF USERS IN DB
    var q ="SELECT COUNT (*) AS count FROM users";
    con.query(q, function(err,results){
        if(err) throw err;
        var count = results[0].count;
        // res.send("we have " + count + " users in the DB");
        res.render("home", {count: count});
    });
});

app.post("/register", function(req,res){
    var person = {
        email: req.body.email
    };

    con.query('INSERT INTO users SET ?', person, function(err, result){
        if (err) throw err;
        res.redirect("/");
   }); 
}); 




//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

app.listen(8080, function () {
    console.log('App listening on port 8080!');
   });