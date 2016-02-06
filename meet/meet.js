/**
 * Created by james on 1/29/16.
 */
cogss.controller("MeetCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var meet = this;

    var meetID = "1";
    var teamID = "1";

    meet.info = {};
    meet.selectedTeam = {};
    meet.women = {};
    meet.men = {};

    $http.get("/meets/"+meetID).then(function(res) {
        meet.info = res.data;
    });

    $http.get("/teams/"+teamID).then(function(res) {
        meet.selectedTeam = res.data;
    });

    $http.get("/gymnasts/"+meetID+"/women/").then(function(res) {
        meet.women = res.data;
    });

    $http.get("/gymnasts/"+teamID+"/men/").then(function(res) {
        meet.men = res.data;
    });

    /*
    meet.logout = function(){
        $http.post("/logout").then(function(res){
            if (res.status === 200) {
                window.location.href  = "#/";
            } else {
                console.log("Error on logout", res);
            }
        });
    };
    */
}]);