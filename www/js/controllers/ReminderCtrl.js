Controllers

.controller('ReminderCtrl', function($scope, $ionicPopup, SetReminder) {

	userInfo = JSON.parse(window.localStorage.userInfo)
    $scope.SMS = (userInfo.SMSReminder === "true");
    $scope.Email = (userInfo.EmailReminder === "true");
    email = userInfo.Email;

	$scope.smsChange = function(){
		$scope.SMS = !$scope.SMS;
		smsReminder = $scope.SMS.toString();
		emailReminder = $scope.Email.toString();

		SetReminder.reminderRequest(smsReminder, emailReminder, email, function(data){
			userInfo.SMSReminder = smsReminder; 
			window.localStorage.userInfo = JSON.stringify(userInfo);
		});
	}

	$scope.emailChange = function(){
		$scope.Email = !$scope.Email;
		smsReminder = $scope.SMS.toString();
		emailReminder = $scope.Email.toString();

		SetReminder.reminderRequest(smsReminder, emailReminder, email, function(data){
			userInfo.EmailReminder = emailReminder; 
			window.localStorage.userInfo = JSON.stringify(userInfo);
		});
	}	
});