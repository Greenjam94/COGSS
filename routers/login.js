/**
 * Created by james on 1/23/16.
 */
var express = require('express');
var router = express.Router();

var users = [
    {
        username: "emu",
        password: "eagles",
        name: "Admin"
    }
];
var authenticatedUser;

router.post("/login", function (req, res) {
    var user = req.body;

    if (!user || !user.username || !user.password) { //insecure
        res.status(422).send();
    }

    var usernameMatch = _.find(users, function (u) {
        return u.username === user.username;
    });

    if (!usernameMatch || usernameMatch.password !== user.password) {
        res.status(401).send();
    } else {
        authenticatedUser = _.omit(usernameMatch, 'password');
        res.status(200).send(authenticatedUser);

    }
});

router.post("/logout", function (req, res) {
    authenticatedUser = null;
    res.status(200).send();
});

module.exports = router;