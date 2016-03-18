var cogss = angular.module('cogss-ng-app', ['ui.bootstrap', 'ngRoute']);

cogss.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: "HomeCtrl"
            })

            .when("/help", {
                templateUrl: "help.html",
                controller: "HelpCtrl"
            })

            .when("/:meetId/teams", {
                templateUrl: "teams.html",
                controller: "MeetCtrl"
            })

            .when("/:meetId/individuals", {
                templateUrl: "indivs.html",
                controller: "MeetCtrl"
            })

            .when("/:meetId/settings", {
                templateUrl: "settings.html",
                controller: "MeetCtrl"
            });
    }
]);

cogss.controller("MainCtrl", ["$scope", "$uibModal", function ($scope, $uibModal) {
    "use strict";
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

    $scope.openRegisterModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'RegisterModalContent.html',
            controller: 'RegisterModalInstanceCtrl',
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

cogss.controller('RegisterModalInstanceCtrl', function ($scope, $uibModalInstance, $http) {

    $scope.firstname = "";
    $scope.lastname = "";
    $scope.email = "";
    $scope.password = "";

    $scope.ok = function () {
        //Validation?

        var user = {first: $scope.firstname, last: $scope.lastname, email: $scope.email, password: $scope.password};
        $http.post("/users", JSON.stringify(user));
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

cogss.controller('searchController', ['$scope', function ($scope) {
    $scope.keywords = 'Search';
}]);