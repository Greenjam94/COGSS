/**
 * Created by james on 1/29/16.
 */
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

    //$http.get("/teams/"+teamID).then(function(res) {
    //    $scope.selectedTeam = res.data;
    //});

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
        //console.log('attempt to get team '+tid);
        $http.get("/teams/"+tid).then(function(res) {
            $scope.selectedTeam = res.data;
            //console.log('Select team', res.data);
        });
    };

    $scope.isWomen = function() {
        return ($scope.selectedTeam) ? ($scope.selectedTeam[0].gender == 0 ) : false;
    };

    $scope.isMen = function() {
        return ($scope.selectedTeam) ? ($scope.selectedTeam[0].gender == 1 ) : false;

    };



    $scope.updateGymnast = function (id, en, es) {
        //console.log('Attempt to update gymnast', id, en, es);
        var data = {
            id: id,
            eventName: en,
            eventScore: es
        };
        $http.put('/gymnasts', JSON.stringify(data)).then(function(res){
            //console.log('updated AA score: ', res.data);
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

        $http.put("/meets/"+meetID, JSON.stringify(meetInfo)).then(function (res) {
            //Refresh page
            console.log(res);
        });
    };

    $scope.deleteUserFromMeet = function (id) {
        console.log("Delete user with id: "+id+", eventually");
    };

    /*
    meet.logout = function(){
        $http.post("/logout").then(function(res){
            if (res.status === 200) {
                window.location.href  = "#/";
            } else {
                console.log("Error on logout", res);
            }
        });
    };
    */
}]);

cogss.controller("MeetModalCtrl", ["$scope", "$uibModal", "$http", function ($scope, $uibModal, $http) {
    "use strict";
    var main = this;

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
}]);

cogss.controller('AddTeamModalInstanceCtrl', ["$scope", "$uibModalInstance", "$http", "$routeParams", function ($scope, $uibModalInstance, $http, $routeParams) {

    $scope.newTeam = {
        name: '',
        email: '',
        gender: 0,
        gymnasts: []
    };

    $scope.addWoman = function () {
        if ($scope.newTeam.gymnasts.length <= 8) {
            $scope.newTeam.gymnasts.push({teamID:0, meetID:$routeParams.meetId, firstname: '', lastname: '', gender:0})
        } else {
            alert('8 member max');
        }
    };

    $scope.addMan = function () {
        if ($scope.newTeam.gymnasts.length <= 8) {
            $scope.newTeam.gymnasts.push({teamID:0, meetID:$routeParams.meetId, firstname: '', lastname: '', gender:1})
        } else {
            alert('8 member max');
        }
    };

    $scope.ok = function (gender) {
        //meetID, team name, email, gender=0
        var team = {
            meetID: $routeParams.meetId,
            name: $scope.newTeam.name,
            email: $scope.newTeam.email,
            gender: gender
        };

        $http.post("/teams", JSON.stringify(team)).then(function(res){
            for (var i=0; i < $scope.newTeam.gymnasts.length; i++) {
                $scope.newTeam.gymnasts[i].teamID = res.data[0].teamID;
                //console.log($scope.newTeam.gymnasts[i]);
                $http.post("/gymnasts", JSON.stringify($scope.newTeam.gymnasts[i]));
            }
        });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);