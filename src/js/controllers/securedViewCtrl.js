app.controller('securedViewCtrl', function($scope, $location, authFactory){
  authFactory.isLoggedIn()
  .then(function(response){
    if (response.data.loggedIn === true){
      $scope.loggedIn = true;
      $scope.user = response.data.data[0];
      console.log($scope.user);
    } else {
      $location.path('/login')
    }
  }, function(error){
    $scope.loggedIn = false;
  })
});
