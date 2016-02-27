cogss.controller("HomeCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var home = this;

    home.meets = {};

    $http.get("/meets").then(function(res) {
        home.meets = res.data;
    });

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

        $scope.email = "";
        $scope.password = "";

        $scope.ok = function () {

            console.log("Clicked add meet");
            //var user = {email:$scope.email, password: $scope.password};
            //$http.post("/login", JSON.stringify(user)).then(function (res) {
            //    if (200 == res.status) {
            //        $scope.auth = "true";
            //    } else {
            //        $scope.auth = "false";
            //    }
            //});
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
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