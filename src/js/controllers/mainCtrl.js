app.controller('mainCtrl', function($scope, $q, $timeout, $location, authFactory, httpFactory){
  $scope.appName = "NodeAuth";

  //////////////Login check////////////////////
  authFactory.isLoggedIn()
  .then(function(response){
    if (response.data.loggedIn === true){
      $scope.loggedIn = true;
      $scope.user = response.data.data[0];
    }
  }, function(error){
    $scope.loggedIn = false;
  })

  /////////////Http Request for child controllers///////
  $scope.httpRequest = function(type, path, data){
    let deferred = $q.defer()
    httpFactory.request(type, path, data)
    .then(function(response){
      deferred.resolve(response)
    }, function(error){
      deferred.reject(error)
    })
    return deferred.promise
  };

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
      $location.path('/')
    }, function(error){
      $scope.loginHasErrors = true;
    })
  }


  ////////Event Broadcasting///////
  $scope.$on('newStatusPosted', (event, status)=>{
    $scope.$broadcast('newStatusRecieved', status);
  });


});
