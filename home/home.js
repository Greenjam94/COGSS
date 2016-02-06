cogss.controller("HomeCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var home = this;

    home.meets = {};

    $http.get("/meets").then(function(res) {
        home.meets = res.data;
    });

    //home.logout = function(){
    //    $http.post("/logout").then(function(res){
    //        if (res.status === 200) {
    //            window.location.href  = "#/login";
    //        } else {
    //            console.log("Error on logout", res);
    //        }
    //    });
    //};

    //home.submit = function(){
    //    console.log("login!");
    //
    //    $http.post("/login", home.user).then(function(res){
    //        window.location.href = "#/";
    //    }, function(){
    //        alert("login failed");
    //    });
    //}
}]);