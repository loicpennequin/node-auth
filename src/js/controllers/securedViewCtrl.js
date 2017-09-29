app.controller('securedViewCtrl', function($scope, $location, authFactory){
  authFactory.isLoggedIn()
  .then(function(response){
    if (response.data.loggedIn === true){
      $scope.loggedIn = true;
      $scope.user = response.data.data[0];
    } else {
      $location.path('/login')
    }
  }, function(error){
    $scope.loggedIn = false;
  })
});
