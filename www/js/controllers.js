var Controllers = angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	// window.localStorage.appSelect = null;

    $scope.new_appointment = function() {
    	window.location = "#/tab/status/category"
    }
});