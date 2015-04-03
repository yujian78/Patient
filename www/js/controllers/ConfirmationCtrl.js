Controllers

.controller('ConfirmationCtrl', function($scope, $ionicPopup, $ionicHistory, DisplayConfirmation, ConfirmAppointment, DisplayAppointment, DeleteAppointment) {
  $scope.doctor = JSON.parse(window.localStorage.doctor);
  $scope.date = window.localStorage.date;
  $scope.time = window.localStorage.time;
  DisplayConfirmation.clinicRequest($scope.doctor.ID, function(data) {
    $scope.clinic = angular.copy(data);
  });

  userInfo = JSON.parse(window.localStorage.userInfo);
  userEmail = userInfo.Email;

  isReferral = window.localStorage.isReferral;
  isFollowup = window.localStorage.isFollowup;

  // console.log(isReferral);
  // console.log(isFollowup);

  // console.log($scope.doctor.Category);
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirm Appointment',
      template: 'Confirm this appointment?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        ConfirmAppointment.makeAppointment($scope.doctor.Category, userEmail, $scope.date, 
          $scope.time, $scope.doctor.ID, isReferral, isFollowup, function(data) {
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

            // Check if from editAppointment
            if(window.localStorage.getItem("appSelect") !== null){
              isEdit = JSON.parse(window.localStorage.appSelect);
              // Delete the original appointment
              DeleteAppointment.deleteRequest(isEdit.ID, function(data){
                // Get the message from server
                errorMessage = angular.copy(data);
              });
            } else{
              
            }
            //$scope.hahahahah = "everything is okay";

            // Refresh the appointment lists
            DisplayAppointment.appointmentRequest(userEmail, function(data){
              apps = angular.copy(data);
              //window.localStorage.removeItem("userApp");
              window.localStorage.userApp = JSON.stringify(apps);

              // Remove unnecessaty items
              window.localStorage.removeItem("category");
              window.localStorage.removeItem("clinic");
              window.localStorage.removeItem("date");
              window.localStorage.removeItem("doctor");
              window.localStorage.removeItem("time");
              window.localStorage.removeItem("appSelect");
              window.localStorage.removeItem("referralfollowDoctor");
              window.localStorage.removeItem("isReferral");
              window.localStorage.removeItem("isFollowup");
                            
              $ionicHistory.nextViewOptions({
                disableBack: true
              });

              window.location = "#/tab/status";
            });
          });
      } else{

      }
    });

  };
});