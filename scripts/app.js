var cogss = angular.module('cogss-ng-app', ['ngRoute']);

cogss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/meets/meets.html"
            })

            .when("/help", {
                templateUrl: "/help/help.html"
            })


            .when("/login", {
                templateUrl: "/login/login.html"
            })

            .when("/:mid", {
                templateUrl: "/teams/teams.html"
            })

            .when("/:mid/:tim", {
                templateUrl: "/members/members.html"
            });
    }
]);

cogss.controller("MainCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    var main = this;
}]);