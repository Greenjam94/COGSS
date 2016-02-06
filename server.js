var port = 6969;
var express = require('express');
var bodyParser = require("body-parser");
//ToDo:Do we need lodah?
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

var meets = [
    {id:"1", name:"Michigan Madness", host:"EMU", loco:"Ypsi, MI", date:"March" },
    {id:"2", name:"Miami Meet", host:"MU", loco:"Miami, OH", date:"Feb 17" },
    {id:"3", name:"OSU Opps", host:"OSU", loco:"Columbus, OH", date:"Feb 5" }
];

var meet = {
    id:"1",
    name:"Michigan Madness",
    host:"EMU",
    loco:"Ypsi, MI",
    date:"March, 2016",
    creator:"James",
    public:"True",
    womensTeams:[
        {id:"1", name:"EMU Eagles A", score:"9.8" },
        {id:"2", name:"MSU Spartans A", score:"9.79"}
    ],
    mensTeams:[
        {id:"3", name:"Arkansas Avengers", score:"13"},
        {id:"4", name:"deadpool", score:"16"}
    ],
    users:[
        {name:"Owner", email:"greenjam94@gmail.com"},
        {name:"James", email:"greenjam94@gmail.com"},
        {name:"Jane Doe", email:"jdoe@fake.email"},
        {name:"Deadpool", email:"deadpool@fake.email"}
    ]
};

var team = [
    {rank:"1", name:"Rachel White", aa:9.9, v:9.7, b:9.9, ub:10, f:10 },
    {rank:"2", name:"Jane Doe", aa:8.7, v:9, b:9.9, ub:8, f:8.6 },
    {rank:"3", name:"Sally CeShore", aa:8.6, v:7.7, b:7.9, ub:8.5, f:9 },
    {rank:"4", name:"Randy Reynolds", aa:7.9, v:7.7, b:8.9, ub:9, f:7 },
    {rank:"5", name:"Deadpool", aa:10, v:10, b:10, ub:10, f:10 }
];

var women = [
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10},
    {name:"Harley Quinn", aa:10, v:10, b:10, ub:10, f:10}
];

var men = [
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10},
    {name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10}
];

//noinspection JSUnresolvedVariable
app.use(express.static(__dirname));
app.use(bodyParser.json());

//Simple heartbeat api to test the server is live
app.get("/heartbeat", function (req, res) {
    res.status(200).send({heartbeat: 'Still alive'});
});

//API
app.get("/meets", function (req, res) {
    res.status(200).send(meets);
    //SELECT * FROM meets
});

app.get("/meets/:meetID", function (req, res) {
    res.status(200).send(meet);
    //SELECT * FROM meets INNER JOIN teams on meets.meetID = teams.meetID WHERE meets.meetID = :meetID;
});

app.get("/teams/:teamID", function (req, res) {
    res.status(200).send(team);
    //SELECT * FROM teams INNER JOIN gymnasts on teams.teamID = gymnasts.teamID WHERE teams.teamID = :teamID;
});


app.get("/gymnasts/:meetID/women", function (req, res) {
    res.status(200).send(women);
    //SELECT * FROM gymnasts where meetID = :meetID;
});

app.get("/gymnasts/:meetID/men", function (req, res) {
    res.status(200).send(men);
    //SELECT * FROM gymnasts where meetID = :meetID;
});

app.listen(port);
console.log('Listening on port: ' + port);