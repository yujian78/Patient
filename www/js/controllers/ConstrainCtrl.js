Controllers

.controller('ConstrainCtrl', function($scope, ConstrainInfo) {
  doctorID = window.localStorage.referralfollowDoctor;

  ConstrainInfo.checkConstrain(doctorID, function(data) {
    doctorSpecialist = angular.copy(data);
    $scope.constrain = doctorSpecialist.PreTest;
  })

  $scope.agreeTest = function() {
    window.location = "#/tab/status/referralfollow";
  }

});