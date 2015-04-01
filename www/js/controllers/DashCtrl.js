Controllers

.controller('DashCtrl', function($scope, $interval, $ionicPopup, ReferralFollow) {
  userInfo = JSON.parse(window.localStorage.userInfo);
  userEmail = userInfo.Email;

 	myVar = $interval(myTimer, 5000);

  function size(obj) { 
    var size = 0, key; 

    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++; 
    } 
      return size; 
  };

  if(window.localStorage.userApp){
    Appoint = JSON.parse(window.localStorage.userApp);
    $scope.noAppoint = size(Appoint);
  }
  
 	// Check referral and follow-up appointment
 	function myStopFunction() {
    $interval.cancel(myVar);
  }

    //$interval(myTimer, 5000);
  function myTimer() {
      //console.log("hahaha");
      ReferralFollow.checkRequest(userEmail, function(data){
        
        if(data) {
          if(data["Referral"]) {
            // Patient should make referral appointment
            window.localStorage.referralfollowDoctor = data["Referral"];
            myStopFunction();
            window.location = "#/tab/status/referralfollow";
          }
          if(data["Followup"]) {
            //Patient should make follow-up appointment
            window.localStorage.referralfollowDoctor = data["Followup"];
            myStopFunction();
            window.location = "#/tab/status/referralfollow";
          }
        }
      });
  }

  // Create new appointment
  $scope.new_appointment = function() {
    myStopFunction();
    window.location = "#/tab/status/category";
  }


  // Check referral appointment
  $scope.referral_appointment = function() {
    myStopFunction();
    ReferralFollow.checkRequest(userEmail, function(data){
      if(data["Referral"]) {
        window.localStorage.referralfollowDoctor = data["Referral"];
        window.location = "#/tab/status/referralfollow";
      } else if(data["Followup"]) {
        window.localStorage.referralfollowDoctor = data["Followup"];
        window.location = "#/tab/status/referralfollow";
      } else{
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
});