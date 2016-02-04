cogss.controller("HomeCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var home = this;

    home.meets = [
        {name:"Michigan Madness", host:"EMU", loco:"Ypsi, MI", date:"March" },
        {name:"Miami Meet", host:"MU", loco:"Miami, OH", date:"Feb 17" },
        {name:"OSU Opps", host:"OSU", loco:"Columbus, OH", date:"Feb 5" }
    ];

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