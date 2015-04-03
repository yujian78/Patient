Controllers

.controller('DashCtrl', function($scope, $interval, $ionicPopup, ReferralFollow) {

  // Fetech userInfo
  userInfo = JSON.parse(window.localStorage.userInfo);
  userEmail = userInfo.Email;

  // Define default button color and text
  $scope.buttonText = "Check Referral and Followup";
  $scope.isreferral = false;
  $scope.isfollowup = false;

  // Define referral/followup data
  var referralDoc, followupDoc;

  // Function to check button color when referral available
  $scope.isReferral = function() {
      return $scope.isreferral;
  };

  // Function to check button color when followup available
  $scope.isFollowup = function() {
      return $scope.isfollowup;
  };

  // Function for get the number of available appointments
  function size(obj) { 
    var size = 0, key; 

    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++; 
    } 
    return size; 
  };

  // Get the number of appointments
  if(window.localStorage.userApp){
    Appoint = JSON.parse(window.localStorage.userApp);
    $scope.noAppoint = size(Appoint);
  }
  
 	// Function for stopping the timer
 	function myStopFunction() {
    $interval.cancel(myVar);
  }

  // Function for checking referral and follow-up
  function checkRF() {

    ReferralFollow.checkRequest(userEmail, function(data){
      if(data["Referral"]) {
        myStopFunction();
        referralDoc = data["Referral"];

        $scope.isreferral = true;
        $scope.buttonText = "New Referral Appointment Available";

      }
      if(data["Followup"]) {
        myStopFunction();
        followupDoc = data["Followup"];

        $scope.isfollowup = true;
        $scope.buttonText = "New Followup Appointment Available";
      }
    });
  }

  // Set timer
  myVar = $interval(checkRF, 5000);

  // Button event for creating new appointment
  $scope.new_appointment = function() {
    myStopFunction();
    window.location = "#/tab/status/category";
  }

  // Button event for checking referral appointment
  $scope.referral_appointment = function() {
    
    // Condition when referral appointment available
    if($scope.isreferral){
      window.localStorage.referralfollowDoctor = referralDoc;
      window.localStorage.isReferral = true;
      window.location = "#/tab/status/referralfollow";
    }

    // Condition when followup appointment available
    else if($scope.isfollowup){
      window.localStorage.referralfollowDoctor = followupDoc;
      window.localStorage.isFollowup = true;
      window.location = "#/tab/status/referralfollow";
    }

    // Condition when both appointments not available
    else{
      ReferralFollow.checkRequest(userEmail, function(data){

        // Condition referral appointment is available
        if(data["Referral"]) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'New Referral Appointment Available',
            template: 'Make this appointment now?'
          });

          confirmPopup.then(function(res) {
            if(res) {
              // Patient should make referral appointment
              window.localStorage.referralfollowDoctor = data["Referral"];
              window.localStorage.isReferral = true;
              window.location = "#/tab/status/referralfollow";
            }
          });
        }
        // Condition follow up appointment is available
        else if(data["Followup"]) {
            var confirmPopup = $ionicPopup.confirm({
              title: 'New Follow-up Appointment Available',
              template: 'Make this appointment now?'
            });

            confirmPopup.then(function(res) {
              if(res){
                //Patient should make follow-up appointment
                window.localStorage.referralfollowDoctor = data["Followup"];
                window.localStorage.isFollowup = true;
                window.location = "#/tab/status/referralfollow";
              }
            });
        }
        // Condition no appointment is available
        else{
          $scope.showAlert = function() {
              var alertPopup = $ionicPopup.alert({
                title: 'No referral/follow-up Appointments',
                template: 'Please check with your doctor again for more information.'
              });
              alertPopup.then(function(res) {
              });
            };

            $scope.showAlert();
        }
      });
    } 
  }
});