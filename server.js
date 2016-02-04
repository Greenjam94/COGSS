var port = 6969;
var express = require('express');
var bodyParser = require("body-parser");
var _ = require('lodash');

var app = express();

/*
//ToDo: Enable MySQL database
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

//Simple heartbeat api to test the server is live
app.get("/heartbeat", function (req, res) {
    res.status(200).send({heartbeat: 'Still alive'});
});

app.listen(port);
console.log('Listening on port: ' + port);