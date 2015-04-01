Controllers

.controller('appotCategoryCtrl', function($scope) {
  $scope.cats = JSON.parse(window.localStorage.totalCats);
  $scope.chooseCat = function(catChoosen) {
    window.localStorage.category = catChoosen.Category;
    window.location = "#/tab/status/category/lad";
  }
});