Controllers

.controller('AccountContactCtrl', function($scope, $ionicPopup, UpdateUserInfo) {
  userInfo = JSON.parse(window.localStorage.userInfo);
  $scope.phone = userInfo.Phone;
  $scope.username = userInfo.Name;

  $scope.update = function(phoneNo, name) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Update Information',
      template: 'Confirm to update your information?'
    });

    confirmPopup.then(function(res) {
      if(res){
        UpdateUserInfo.userInfoRequest(phoneNo, name, userInfo.Email, function(data){
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

          if(phoneNo != null){
            userInfo.Phone = phoneNo; 
          }
          if(name != null){
            userInfo.Name = name; 
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