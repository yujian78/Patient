Controllers

.controller('DoctorsSpecificCtrl', function($scope) {
  $scope.doctor = JSON.parse(window.localStorage.doctor);
  $scope.date = window.localStorage.date;

  times = $scope.doctor.Times;
  $scope.timerows = Array(Math.floor((times.length + 2) / 3));
  for(var i=0; i<$scope.timerows.length; i++) {
    $scope.timerows[i] = Array();
  }
  for(var i=0; i < times.length; i++) {
    $scope.timerows[Math.floor(i/3)].push(times[i]); 
  }

  $scope.chooseAppointment = function(time){
    window.localStorage.time = time;
    window.location = "#/tab/status/confirmation";
  }
});