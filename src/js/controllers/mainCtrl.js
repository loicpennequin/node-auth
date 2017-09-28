app.controller('mainCtrl', function($scope, $timeout, $location, authFactory){
  $scope.appName = "NodeAuth";

  //////////////Registration//////////
  $scope.newUser = {};
  $scope.registrationErrors = [];

  $scope.register = function(){
    authFactory.register($scope.newUser)
    .then(function(response){
      $scope.registrationSuccess = true;
      $scope.newUser = {};
      $scope.registerForm.$setPristine();
      $timeout(()=>{
        $scope.registrationSuccess = false;
      }, 8000);
    }, function(error){
      if(error.status === 422){
        $scope.registrationErrors = Object.values(error.data.errors)
        $scope.registrationHasErrors = true;
        $timeout(()=>{
          $scope.registrationHasErrors = false;
        }, 8000);
      }
    })
  }


  //////Authentication//////////
  $scope.auth = {};

  $scope.signIn = function(){
    authFactory.signIn($scope.auth)
    .then(function(response){
      console.log(response);
      $location.path('/profile')
    }, function(error){
      $scope.loginHasErrors = true;
    })
  }

});
