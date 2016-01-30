/**
 * Created by james on 1/23/16.
 */
var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the teams page route
router.get('/teams', function(req, res) {
    res.send('teams html page');
});
// define the team route
router.get('/teams/#', function(req, res) {
    res.send('About a team');
});

module.exports = router;