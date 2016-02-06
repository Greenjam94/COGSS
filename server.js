var port = 7777;
var express    = require('express');
var bodyParser = require("body-parser");
var mysql      = require('mysql');
//ToDo:Do we need lodah?
var _ = require('lodash');

var app = express();

var connection = mysql.createConnection({
    host     : '104.131.28.32',
    user     : 'james',
    password : 'SPARTAN1216sql',
    database : 'cogss'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
    }else {
        console.log('mysql connection established ' + connection.threadId);
    }
});

app.use(express.static(__dirname));
app.use(bodyParser.json());

//Simple heartbeat api to test the server is live
app.get("/heartbeat", function (req, res) {
    res.status(200).send({heartbeat: 'Still alive'});
});

//API
app.get("/meets", function (req, res) {
    connection.query(
        'SELECT * FROM meets',
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        });
});

app.get("/meets/:meetID", function (req, res) {
    connection.query(
        'SELECT * FROM meets WHERE meetID = '+connection.escape(req.params.meetID),
        function(err,rows) {
            var mymeet = {info:[], womensTeams:[], mensTeams:[]};
            if (err) throw err;
            mymeet.info = rows;

            connection.query(
                'SELECT * FROM teams WHERE meetID = '+connection.escape(req.params.meetID)+' AND gender = 0',
                function(err,rows) {
                    if (err) throw err;
                    mymeet.womensTeams = rows;

                    connection.query(
                        'SELECT * FROM teams WHERE meetID = '+connection.escape(req.params.meetID)+' AND gender = 1',
                        function(err,rows) {
                            if (err) throw err;
                            mymeet.mensTeams = rows;
                            res.status(200).send(mymeet);
                        });
                });
        });
});

app.get("/teams/:teamID", function (req, res) {
    connection.query(
        'SELECT * FROM  gymnasts WHERE teamID = ' + connection.escape(req.params.teamID),
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        });
});


app.get("/gymnasts/:meetID/women", function (req, res) {
    connection.query(
        'SELECT * FROM  gymnasts WHERE meetID = ' + connection.escape(req.params.meetID) + ' AND gender = 0',
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        });
});

app.get("/gymnasts/:meetID/men", function (req, res) {
    connection.query(
        'SELECT * FROM gymnasts WHERE meetID = ' + connection.escape(req.params.meetID) + ' AND gender = 1',
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        });
});

app.get("/users/:meetID", function (req, res) {
    connection.query(
        'SELECT users FROM meets WHERE meetID = '+connection.escape(req.params.meetID),
        function(err, rows) {
            if (err) throw err;
            var ids = rows[0]['users'];
            connection.query(
                'SELECT first, last, email FROM users WHERE userID in ('+ids+')',
                function(err,rows) {
                    if (err) throw err;
                    res.status(200).send(rows);
                });
        });
});

app.listen(port);
console.log('Listening on port: ' + port);