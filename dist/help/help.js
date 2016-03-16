cogss.controller("HelpCtrl", ["$scope", function ($scope) {
    "use strict";
    $scope.subject = "";
    $scope.message = "";

    $scope.sendEmail = function() {
        window.location.href = "mailto:greenjam94@gmail.com"
            + "?subject=COGSS:%20" + escape($scope.subject)
            + "&body=" + escape($scope.message);
    };

    $scope.resetForm = function() {
        $scope.subject = "";
        $scope.message = "";
    };
}]);