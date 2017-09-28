app.controller('navbarCtrl', function($scope,authFactory){
  authFactory.isLoggedIn()
  .then(function(response){
    if (response.data.loggedIn === true){
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    }
  }, function(error){
    $scope.loggedIn = false;
  });

  $scope.logout = function(){
    authFactory.logout();
  }
})
