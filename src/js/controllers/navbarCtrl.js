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

  $scope.dropdown = false;
  $scope.toggleDropdown = function(){
    $scope.dropdown = !$scope.dropdown;
  }

  $scope.showDropdown = function(){
    if ($scope.dropdown === true) {
      return {
        display: "block",
        position : "absolute",
        backgroundColor: '#222',
        top: '100%',
        width: '100%'
      }
    }else{
      return {
        display: "none"
      }
    }
  }
})
