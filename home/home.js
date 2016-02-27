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

cogss.controller("addMeetModalCtrl", ["$scope", "$uibModal", "$http", function ($scope, $uibModal, $http) {
    "use strict";
    var main = this;

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

cogss.controller('addMeetModalInstanceCtrl', function ($scope, $uibModalInstance, $http) {

    $scope.host = "";
    $scope.name = "";
    $scope.location = "";
    $scope.date = "";
    $scope.public = "";
    $scope.createdBy = 0;
    $scope.createdOn = new Date().toISOString().slice(0, 19).replace('T', ' ');

    $scope.ok = function () {

        //ToDo: Validation
        //if (!$scope.name.match(/^[a-zA-Z0-9]+$/)) {
        //    alert('Bad name: '+ $scope.name);
        //    return;
        //}
        //if (!$scope.host.match(/^[a-zA-Z\s]+$/)) {
        //    alert('Bad Name');
        //    return;
        //}
        //if (!$scope.location.match(/^[a-zA-Z\s,.]+$/)) {
        //    alert('Bad location');
        //    return;
        //}
        //if (!$scope.date.match(/^[0-9/]+$/)) {
        //    alert('Bad date');
        //    return;
        //}
        //if (!$scope.public.match(/^[01]+$/)) {
        //    alert('Bad public');
        //    return;
        //}

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
});