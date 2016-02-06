/**
 * Created by james on 1/29/16.
 */
cogss.controller("MeetCtrl", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    "use strict";

    var meet = this;

    var meetID = $routeParams.meetId;
    var teamID = meetID == 1 ? '3' : '2'; //ToDo: Get from teams page, clickable tables in first row

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
    });

    $scope.gymnast = {
        //ToDo: Set these values from the API so they can be updated
        //ToDo: Multiple gymnasts?...
        wVault:0,
        wBars:0,
        wBeam:0,
        wFloor:0
    };

    $scope.updateGymnast = function () {
        console.log('Attempt to update gymnast');
        //why is it after every keypress? Should be on input leave or return key
        // https://docs.angularjs.org/api/ng/directive/ngChange
    };

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