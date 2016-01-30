cogss.controller("MeetsCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var meets = this;

    meets.logout = function(){
        $http.post("/logout").then(function(res){
            if (res.status === 200) {
                window.location.href  = "#/login";
            } else {
                console.log("Error on logout", res);
            }
        });
    };
}]);