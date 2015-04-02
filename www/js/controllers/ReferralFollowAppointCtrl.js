Controllers

.controller('ReferralFollowAppointCtrl', function($scope, DisplayReferralDoc) {

  userInfo = JSON.parse(window.localStorage.userInfo);
  referralDoctor = JSON.parse(window.localStorage.referralfollowDoctor);

  DisplayReferralDoc.referralDocRequest(referralDoctor, userInfo.Email, function(data){
    referralAppointment = angular.copy(data);
    dates = referralAppointment.Dates;
    $scope.doctor = referralAppointment.Info;

    $scope.dates = [];

    dates.forEach(function(date) {
      specificElement = {};

      specificElement["Date"] = Object.keys(date)[0];

      times = date[Object.keys(date)];
      //console.log(times);
      timerows = Array(Math.floor((times.length + 2) / 3));
      for(var i=0; i<timerows.length; i++) {
        timerows[i] = Array();
      }
      for(var i=0; i < times.length; i++) {
        timerows[Math.floor(i/3)].push(times[i]); 
      }
      //console.log(timerows);

      specificElement["Time"] = timerows;
      $scope.dates.push(specificElement);

    });
    //console.log($scope.dates);

  });

  $scope.chooseAppointment = function(time, date){
    window.localStorage.time = time;
    window.localStorage.date = date;
    window.localStorage.doctor = JSON.stringify($scope.doctor);

    // window.localStorage.time = time;
    window.location = "#/tab/status/confirmation";
  };

});