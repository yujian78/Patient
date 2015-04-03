Controllers

.controller('ConstrainCtrl', function($scope, $ionicHistory, ConstrainInfo) {
  doctorID = window.localStorage.referralfollowDoctor;

  ConstrainInfo.checkConstrain(doctorID, function(data) {
    doctorSpecialist = angular.copy(data);
    $scope.constrain = doctorSpecialist.PreTest;
    window.localStorage.Specialist = doctorSpecialist.Specialist;
  })

  $scope.agreeTest = function() {
    window.location = "#/tab/status/referralfollow";
  }

  $scope.cancel = function() {
  	
  	$ionicHistory.nextViewOptions({
	    disableBack: true
	});
    window.location = "#/tab/status";
  }

});