Controllers

.controller('PasswordCtrl', function($scope, $ionicPopup, UpdatePassword) {
  userInfo = JSON.parse(window.localStorage.userInfo);
  email = userInfo.Email;
  $scope.updatePassword = function(password) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Change Password',
      template: 'Confirm to change the password?'
    });

    confirmPopup.then(function(res) {
      if(res){
        UpdatePassword.passwordRequest(password, email, function(data){
          // Get the message from server
          errorMessage = angular.copy(data);
          // show alert
          $scope.showAlert = function() {
            //definre alert
            var alertPopup = $ionicPopup.alert({
              title: errorMessage.title,
              template: errorMessage.msg
            });
            //show alert
            alertPopup.then(function(res){
            });
          };
          $scope.showAlert();

          if(password != null){
            userInfo.Password = password; 
          }
          
          window.localStorage.userInfo = JSON.stringify(userInfo);
          window.location = "#/tab/account";
          //$state.go($state.current, $stateParams, {reload: true});
        });
      } else{

      }
    });
  }
});