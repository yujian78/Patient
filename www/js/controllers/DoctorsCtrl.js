Controllers

.controller('DoctorsCtrl', function($scope, DisplayDoc) {
  DisplayDoc.docRequest(window.localStorage.date, window.localStorage.clinic, window.localStorage.category, function(data) {
    $scope.doctors = angular.copy(data);
  });

  $scope.goto = function(doctor) {
    window.localStorage.doctor = JSON.stringify(doctor);
    window.location = "#/tab/status/category/lad/doctors/specific";
  }
});