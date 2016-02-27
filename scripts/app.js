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

cogss.controller("MainCtrl", ["$scope", "$uibModal", "$http", function ($scope, $uibModal, $http) {
    "use strict";
    var main = this;

    $scope.animationsEnabled = true;

    $scope.openLoginModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'LoginModalContent.html',
            controller: 'LoginModalInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    };
}]);

cogss.controller('LoginModalInstanceCtrl', function ($scope, $uibModalInstance, $http) {

    $scope.email = "";
    $scope.password = "";

    $scope.ok = function () {
        if ($scope.email == undefined) {
            alert("Bad email");
            return;
        }
        //console.log($scope.email, $scope.password);
        var user = {email:$scope.email, password: $scope.password};
        $http.post("/login", JSON.stringify(user)).then(function (res) {
            if (200 == res.status) {
                $scope.auth = "true";
            } else {
                $scope.auth = "false";
            }
        });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//ToDo: Broken search...
cogss.controller('searchController', ['$scope', function ($scope) {
    $scope.keywords = 'Search';
}]);