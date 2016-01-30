var cogss = angular.module('skill-up-ng-app', ['ngRoute']);

cogss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/meets/meets.html"
            })

            .when("/help", {
                templateUrl: "/help/help.html"
            })

            .when("/meets", {
                templateUrl: "/meets/meets.html"
            })

            .when("/members", {
                templateUrl: "/members/members.html"
            })

            .when("/login", {
                templateUrl: "/login/login.html"
            })

            .when("/teams", {
                templateUrl: "/teams/teams.html"
            });
    }
]);

cogss.controller("MainCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    var main = this;
}]);