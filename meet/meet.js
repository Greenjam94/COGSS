/**
 * Created by james on 1/29/16.
 */
cogss.controller("MeetCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var meet = this;

    //ToDo: Get from page, shouldn't be hardcoded.
    var meetID = "1";
    var teamID = "3";

    meet.info = {};
    meet.selectedTeam = {};
    meet.women = {};
    meet.men = {};
    meet.users = {};

    $http.get("/meets/"+meetID).then(function(res) {
        meet.info = res.data;
    });

    $http.get("/teams/"+teamID).then(function(res) {
        meet.selectedTeam = res.data;
    });

    $http.get("/gymnasts/"+meetID+"/women/").then(function(res) {
        meet.women = res.data;
    });

    $http.get("/gymnasts/"+meetID+"/men/").then(function(res) {
        meet.men = res.data;
    });

    $http.get("/users/"+meetID).then(function(res) {
        meet.users = res.data;
        console.log(meet.users);
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