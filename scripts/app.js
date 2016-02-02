var cogss = angular.module('cogss-ng-app', ['ngRoute']);

cogss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            //ToDo: Complete routing for views inside views
            .when("/", {
                templateUrl: "/home/home.html",
                controller: "HomeCtrl"
            })

            .when("/help", {
                templateUrl: "/help/help.html",
                controller: "HelpCtrl"
            })

            .when("/:meetId", {
                templateUrl: "/meet/meet.html",
                controller: "MeetCtrl"
            })

            .when("/:meetId/settings", {
                templateUrl: "/meet/settings.html",
                controller: "MeetCtrl"
            });
    }
]);

cogss.controller("MainCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    var main = this;
}]);