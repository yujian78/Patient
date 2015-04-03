Controllers

.controller('AppointmentsDetailCtrl', function($scope, $ionicPopup, $ionicHistory, DeleteAppointment, DisplayAppointment) {
  $scope.appChoosen = JSON.parse(window.localStorage.appSelect);

  $scope.editAppoint = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Edit Appointment',
      template: 'Confirm to edit this appointment?'
    });

    confirmPopup.then(function(res) {
      if(res){
        // $ionicHistory.clearHistory();
        // appID = $scope.appChoosen.ID;
        // userInfo = JSON.parse(window.localStorage.userInfo);
        
        // window.localStorage.category = $scope.appChoosen.Category;
        // window.location = "#/tab/status/category/lad";

        $ionicHistory.clearHistory();
        
        window.localStorage.referralfollowDoctor = $scope.appChoosen["DoctorID"];
        window.location = "#/tab/status/referralfollow";
      } else{
      }
    });
  }

  $scope.deleteAppoint = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Appointment',
      template: 'Are you sure you want to delete this appointment?'
    });

    confirmPopup.then(function(res) {
      if(res){

        appID = $scope.appChoosen.ID;
        userInfo = JSON.parse(window.localStorage.userInfo);
        DeleteAppointment.deleteRequest(appID, function(data){
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
          //Refresh the appointment lists
          DisplayAppointment.appointmentRequest(userInfo.Email, function(data){
            apps = angular.copy(data);
            window.localStorage.userApp = JSON.stringify(apps);
            window.location = "#/tab/appointments";
          });
        });
      } else{

      }
    });
  }

  $scope.makeFollowup = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Followup Appointment',
      template: 'Confirm to make followup appointment?'
    });

    confirmPopup.then(function(res) {
      if(res){
        $ionicHistory.clearHistory();
        
        window.localStorage.referralfollowDoctor = $scope.appChoosen["DoctorID"];
        window.localStorage.isFollowup = true;
        window.localStorage.removeItem("appSelect");
        window.location = "#/tab/status/referralfollow";
      } else{
      }
    });
  }
  
});