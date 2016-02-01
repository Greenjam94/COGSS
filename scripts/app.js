var cogss = angular.module('cogss-ng-app', ['ngRoute']);

cogss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            //ToDo: Complete routing for views inside views
            .when("/", {
                templateUrl: "/home/home.html"
            })

            .when("/help", {
                templateUrl: "/help/help.html"
            })

            .when("/login", {
                templateUrl: "/login/login.html"
            })

            .when("/:mid", {
                templateUrl: "/meet/meet.html"
            })

            .when("/:mid/settings", {
                templateUrl: "/meet/settings.html"
            });
    }
]);

cogss.controller("MainCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    var main = this;
}]);