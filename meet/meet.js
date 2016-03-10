cogss.controller("MeetCtrl", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    "use strict";

    var meet = this;
    var meetID = $routeParams.meetId;

    meet.info = {};
    meet.women = {};
    meet.men = {};
    meet.users = {};

    $http.get("/meets/"+meetID).then(function(res) {
        meet.info = res.data;
    });

    $http.get("/gymnasts/"+meetID+"/women/").then(function(res) {
        meet.women = res.data;
    });

    $http.get("/gymnasts/"+meetID+"/men/").then(function(res) {
        meet.men = res.data;
    });

    $http.get("/users/"+meetID).then(function(res) {
        meet.users = res.data;
    });

    $scope.meetID = meetID;
    $scope.public = 0;

    $scope.pickTeam = function(tid) {
        $http.get("/teams/"+tid).then(function(res) {
            $scope.selectedTeam = res.data;
        });
    };

    $scope.isWomen = function() {
        return ($scope.selectedTeam) ? ($scope.selectedTeam[0].gender == 0 ) : false;
    };

    $scope.isMen = function() {
        return ($scope.selectedTeam) ? ($scope.selectedTeam[0].gender == 1 ) : false;
    };



    $scope.updateGymnast = function (id, en, es) {
        var data = {id: id, eventName: en, eventScore: es};
        $http.put('/gymnasts', JSON.stringify(data)).then(function(res){
            if ($scope.selectedTeam) {
                for (var i = 0; i < $scope.selectedTeam.length; i++) {
                    if ($scope.selectedTeam[i].gymnastID == id) {
                        $scope.selectedTeam[i].score = res.data;
                    }
                }
            }

            for(var j=0; j < meet.women.length; j++ ) {
                if (meet.women[j].gymnastID == id) {
                    meet.women[j].score = res.data;
                }
            }

            for(var k=0; k < meet.men.length; k++ ) {
                if (meet.men[k].gymnastID == id) {
                    meet.men[k].score = res.data;
                }
            }
        });
    };

    $scope.updateMeetInfo = function () {
        var meetInfo = {
            name: meet.info.info[0].name,
            host: meet.info.info[0].host,
            location: meet.info.info[0].location,
            date: meet.info.info[0].date,
            public: $scope.public
        };

        $http.put("/meets/"+meetID, JSON.stringify(meetInfo));
    };

    $scope.deleteUserFromMeet = function (id) {

    };
}]);

cogss.controller("MeetModalCtrl", ["$scope", "$uibModal", function ($scope, $uibModal) {
    "use strict";

    $scope.animationsEnabled = true;

    $scope.openAddWomensTeamModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addWomensTeamModalContent.html',
            controller: 'AddTeamModalInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    };

    $scope.openAddMensTeamModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addMensTeamModalContent.html',
            controller: 'AddTeamModalInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    };

    $scope.addUserToMeetModal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'AddUserToMeetModalContent.html',
            controller: 'AddUserToMeetModalInstanceCtrl',
            size: size
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    };
}]);

cogss.controller('AddTeamModalInstanceCtrl', ["$scope", "$uibModalInstance", "$http", "$routeParams",
    function ($scope, $uibModalInstance, $http, $routeParams) {
    $scope.newTeam = {
        name: '',
        email: '',
        gender: 0,
        gymnasts: []
    };

    $scope.addWoman = function () {
        $scope.newTeam.gymnasts.push({teamID:0, meetID:$routeParams.meetId, firstname: '', lastname: '', gender: 0});
    };

    $scope.addMan = function () {
        $scope.newTeam.gymnasts.push({teamID:0, meetID:$routeParams.meetId, firstname: '', lastname: '', gender: 1});
    };

    $scope.ok = function (gender) {
        var team = {
            meetID: $routeParams.meetId,
            name: $scope.newTeam.name,
            email: $scope.newTeam.email,
            gender: gender
        };

        $http.post("/teams", JSON.stringify(team)).then(function(res){
            for (var i=0; i < $scope.newTeam.gymnasts.length; i++) {
                $scope.newTeam.gymnasts[i].teamID = res.data[0].teamID;
                $http.post("/gymnasts", JSON.stringify($scope.newTeam.gymnasts[i]));
            }
        });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

cogss.controller('AddUserToMeetModalInstanceCtrl', ["$scope", "$uibModalInstance", "$http", "$routeParams",
    function ($scope, $uibModalInstance, $http, $routeParams) {
        $scope.data = {
            user: "",
            users: []
        };

        $http.get("/users").then(function(res){
            $scope.data.users = res.data;
        });


        $scope.ok = function () {
            console.log('ok');
            var newUser = {user: $scope.data.user};

            $http.put("/meets/"+$routeParams.meetId, newUser).then(function(){
                alert("New user added to meet");
            });
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);