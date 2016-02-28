cogss.controller("HomeCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var home = this;
    home.meets = {};

    $http.get("/meets").then(function(res) {
        home.meets = res.data;
    });
}]);

cogss.controller("addMeetModalCtrl", ["$scope", "$uibModal", function ($scope, $uibModal) {
    "use strict";

    $scope.animationsEnabled = true;

    $scope.openAddMeetModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addMeetModalContent.html',
            controller: 'addMeetModalInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    };
}]);

cogss.controller('addMeetModalInstanceCtrl', ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {

    $scope.host = "";
    $scope.name = "";
    $scope.location = "";
    $scope.date = "";
    $scope.public = "";
    $scope.createdBy = 0;
    $scope.createdOn = new Date().toISOString().slice(0, 19).replace('T', ' ');

    $scope.ok = function () {

        //Validation?

        var meet = {
            host: $scope.host,
            name: $scope.name,
            location: $scope.location,
            date: $scope.date,
            public: $scope.public,
            createdBy: $scope.createdBy,
            createdOn: $scope.createdOn
        };

        $http.post('/meets', JSON.stringify(meet)).then(function(res){
            console.log(res);
        });

        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);