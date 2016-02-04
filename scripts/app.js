var cogss = angular.module('cogss-ng-app', ['ui.bootstrap', 'ngRoute']);

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

            .when("/:meetId/teams", {
                templateUrl: "/meet/teams.html",
                controller: "MeetCtrl"
            })

            .when("/:meetId/individuals", {
                templateUrl: "/meet/indivs.html",
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

    //Test Modal
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}]);