Controllers

.controller('LoginCtrl', function($scope, Login, $ionicPopup, $timeout, DisplayAppointment, DisplayCat) {
  $scope.signin = function(username, password) {
    // window.localStorage.username = username;

    if(username=="" || password=="" || username==undefined || password==undefined) {
      alert("You must type password sb!");
      return;
    }
    Login.login(username, password, function(data) {
      if(data["code"] == 1) {
        // Fetch appointments data first
        DisplayAppointment.appointmentRequest(username, function(data){
          apps = angular.copy(data);
          window.localStorage.userApp = JSON.stringify(apps);
        });
        // Fetch available categories first
        DisplayCat.catRequest(function(data){
          cats = angular.copy(data);
          window.localStorage.totalCats = JSON.stringify(cats);
        });

        window.localStorage.userInfo = JSON.stringify(data["info"]);
        window.location = "#/tab/status";
      } else {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Invalid Password',
            template: 'Please re-enter your account info'
          });
          alertPopup.then(function(res) {
          });
        };
        $scope.showAlert();
      }
    });
  }
});