Controllers

.controller('AccountCtrl', function($scope) {
  $scope.userInfo = JSON.parse(window.localStorage.userInfo);
  $scope.updateInfo = function() {
    window.location = "#/tab/account/contactInfo";
  }
  $scope.resetPassword = function() {
    window.location = "#/tab/account/password";
  }
  $scope.setReminder = function() {
    window.location = "#/tab/account/reminder";
  }
  
});