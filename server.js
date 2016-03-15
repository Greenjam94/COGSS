var port = 7777;
var express    = require('express');
var bodyParser = require("body-parser");
var crypto     = require('crypto');
var mysql      = require('mysql');
//var _ = require('lodash');

var app = express();

var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
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



//--------------------------------------------- API ---------------------------------------------//
//Simple heartbeat api to test the server is live
app.get("/heartbeat", function (req, res) {
    res.status(200).send({heartbeat: 'Still alive'});
});

app.post("/login", function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.send('Email and password are both required');
        return;
    }
    var hash = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest('hex');

    connection.query(
        "SELECT * FROM users WHERE hash = '"+hash+"' AND email = '"+req.body.email+"'",
        function(err,rows) {
            if (err) throw err;
            console.log(hash);
            if (rows[0]) {
                res.status(200);
            } else {
                res.status(401);
            }
        }
    );
});

//Meets
app.get("/meets", function (req, res) {
    connection.query(
        'SELECT * FROM meets', //ToDo: WHERE public = 1 or <Logged in user has access to>
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

app.post("/meets", function (req, res) {
    connection.query(
        'INSERT INTO cogss.meets (`name`, `host`, `location`, `date`, `public`, `createdBy`, `createdOn`) ' +
        "VALUES ('"+req.body.name+"', '"+req.body.host+"', '"+req.body.location +
                "', '"+req.body.date+"', '"+req.body.public+"', '"+req.body.createdBy+"', '"+req.body.createdOn+"')",
        function(err) {
            if (err) throw err;
            res.status(200);
        }
    );
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
                        }
                    );
                }
            );
        }
    );
});

app.put("/meets/:meetID", function (req, res) {
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    //build query
    var meetInfoQuery = 'UPDATE meets SET ';
    if (typeof req.body.name != "undefined") {
        meetInfoQuery += 'name = "'+req.body.name+'", ';
    }
    if (typeof req.body.host != "undefined") {
        meetInfoQuery += 'host = "'+req.body.host+'", ';
    }
    if (typeof req.body.location != "undefined") {
        meetInfoQuery += 'location = "'+req.body.location+'", ';
    }
    if (typeof req.body.date != "undefined") {
        meetInfoQuery += 'date = "'+req.body.date+'", ';
    }
    if (typeof req.body.public != "undefined") {
        meetInfoQuery += 'public = "'+req.body.public+'", ';
    }
    if (typeof req.body.user != "undefined") {
        var user = ','+req.body.user;
        meetInfoQuery += 'users = CONCAT(users, "'+user+'"), ';
    }

    meetInfoQuery += ' updatedBy = 0, ' + //ToDo: Actual user ID
        ' updatedOn = "'+date+'" WHERE meetID = '+req.params.meetID;

    connection.query(
       meetInfoQuery,
       function(err) {
           if (err) throw err;
           res.status(200);
       }
   )
});

//Teams
app.get("/teams/:teamID", function (req, res) {
    connection.query(
        'SELECT * FROM  gymnasts WHERE teamID = ' + connection.escape(req.params.teamID),
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

app.post("/teams", function (req, res) {
    connection.query(
       "INSERT INTO `cogss`.`teams` (`meetID`, `name`, `email`, `gender`)" +
       " VALUES ('"+req.body.meetID+"', '"+req.body.name+"', '"+req.body.email+"', '"+req.body.gender+"')",
       function(err) {
           if (err) throw err;
           connection.query(
               "SELECT teamID FROM teams WHERE name = '"+req.body.name+"' AND email = '"+req.body.email+"'",
               function(err,rows) {
                   if (err) throw err;
                   res.status(200).send(rows);
               }
           )
       }
   );
});

//Gymnasts
app.get("/gymnasts/:meetID/women", function (req, res) {
    connection.query(
        'SELECT * FROM  gymnasts WHERE meetID = ' + connection.escape(req.params.meetID) + ' AND gender = 0',
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

app.get("/gymnasts/:meetID/men", function (req, res) {
    connection.query(
        'SELECT * FROM gymnasts WHERE meetID = ' + connection.escape(req.params.meetID) + ' AND gender = 1',
        function(err,rows) {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

app.post("/gymnasts", function (req, res) {
    connection.query(
        "INSERT INTO `cogss`.`gymnasts` (`teamID`, `meetID`, `first`, `last`, `gender`) " +
        "VALUES ('"+req.body.teamID+"', '"+req.body.meetID+"', '"+req.body.firstname+"'," +
                " '"+req.body.lastname+"', '"+req.body.gender+"')",
        function(err) {
            if (err) throw err;
            res.status(200)
        }
    );
});

app.put("/gymnasts", function (req, res) {

    //validate
    if (req.body.eventName == undefined || req.body.id == undefined || req.body.eventScore == undefined) {
        res.status(401).send("Poor request, a field was undefined");
        return;
    } else if (isNaN(req.body.eventScore) && !isFinite(req.body.eventScore)) {
        res.status(401).send("Poor request, invalid score");
        return;
    }

    //send
    connection.query(
        'UPDATE gymnasts SET '+req.body.eventName+'='+req.body.eventScore+' WHERE gymnastID = '+req.body.id,
        function(err) {
            if (err) throw err;
            connection.query(
                'SELECT teamID, meetID, gender, wVault, wBars, wBeam, wFloor, mFloor, mPommel, mRings, mVault, mParallel, mHigh' +
                ' FROM gymnasts' +
                ' WHERE gymnastID = '+req.body.id,
                function(err,rows) {
                    if (err) throw err;
                    var allAround = rows[0].wVault +
                                    rows[0].wBars +
                                    rows[0].wBeam +
                                    rows[0].wFloor +
                                    rows[0].mFloor +
                                    rows[0].mPommel +
                                    rows[0].mRings +
                                    rows[0].mVault +
                                    rows[0].mParallel +
                                    rows[0].mHigh;
                    var teamID = rows[0].teamID;
                    var meetID = rows[0].meetID;
                    var gender = rows[0].gender;
                    connection.query(
                        'UPDATE gymnasts SET score = '+allAround+' WHERE gymnastID = '+req.body.id,
                        function(err) {
                            if (err) throw err;
                            if (gender == 0) {
                                connection.query(
                                    'UPDATE teams ' +
                                    '   SET Score = ' +
                                    'SELECT SUM(wVault)+SUM(wBars)+SUM(wBeam)+SUM(wFloor) ' +
                                    '  FROM gymnasts ' +
                                    ' WHERE meetID = ' + meetID +
                                    '   AND teamID = ' + teamID +
                                    ' LIMIT 4)' +
                                    ' WHERE teamID =' + teamID,
                                    function (err) {
                                        if (err) throw err;
                                        res.status(200).send(JSON.stringify(allAround));
                                    }
                                );
                            } else if (gender == 1) {
                                connection.query(
                                    'UPDATE teams ' +
                                    '   SET Score = ' +
                                    'SELECT SUM(mFloor)+SUM(mPommel)+SUM(mRings)+SUM(mVault)+SUM(mParallel)+SUM(mHigh) ' +
                                    '  FROM gymnasts ' +
                                    ' WHERE meetID = ' + meetID +
                                    '   AND teamID = ' + teamID +
                                    ' LIMIT 3)' +
                                    ' WHERE teamID =' + teamID,
                                    function (err) {
                                        if (err) throw err;
                                        res.status(200).send(JSON.stringify(allAround));
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }
    );
});

//Users
app.get("/users", function (req, res) {
    connection.query(
        'SELECT userID, email FROM users',
        function(err, rows) {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

app.get("/users/:meetID", function (req, res) {
    connection.query(
        'SELECT users FROM meets WHERE meetID = '+connection.escape(req.params.meetID),
        function(err, rows) {
            if (err) throw err;
            var ids = rows[0]['users'];
            connection.query(
                'SELECT userID, first, last, email FROM users WHERE userID in ('+ids+')',
                function(err,rows) {
                    if (err) throw err;
                    res.status(200).send(rows);
                }
            );
        }
    );
});

app.post("/users", function (req, res) {
    var hash = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest('hex');

    connection.query(
       "INSERT INTO `cogss`.`users` (`first`, `last`, `email`, `hash`) " +
       "VALUES ('"+req.body.first+"', '"+req.body.last+"', '"+req.body.email+"', '"+hash+"')",
        function(err) {
            if (err) throw err;
            res.status(200)
        }
    );
});

app.listen(port);
console.log('Listening on port: ' + port);