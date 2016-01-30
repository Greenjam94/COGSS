var port = 6969;
var express = require('express');
var bodyParser = require("body-parser");
var _ = require('lodash');

var app = express();
var teams = require('./routers/teams.js');
var login = require('./routers/login.js');

var users = [
    {
        username: "emu",
        password: "eagles",
        name: "Admin",
    }
];
var authenticatedUser;

/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
*/

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use('/teams', teams);
app.use('/login', login); app.use('/logout', login);

app.get("/heartbeat", function (req, res) {
    res.status(200).send({heartbeat: 'Still alive'});
});

app.get("/users/current", function (req, res) {
    if (authenticatedUser) {
        res.status(200).send(authenticatedUser);
    } else {
        res.status(404).send();
    }
});

app.post("/users/current/games", function (req, res) {
    var game = req.body;

    if (!game || !game.title) {
        res.status(422).send();
    } else if (authenticatedUser) {
        authenticatedUser.games.push(game);
        res.status(200).send();
    } else {
        res.status(401).send();
    }
});

app.listen(port);
console.log('Listening on port: ' + port);