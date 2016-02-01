/**
 * Created by james on 1/29/16.
 */
cogss.controller("MeetCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var meet = this;

    meet.name = "Michigan Madness";

    meet.logout = function(){
        $http.post("/logout").then(function(res){
            if (res.status === 200) {
                window.location.href  = "#/login";
            } else {
                console.log("Error on logout", res);
            }
        });
    };
}]);