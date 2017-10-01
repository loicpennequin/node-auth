app.controller('securedViewCtrl', function($scope, $location, $http, $q, authFactory, httpFactory){
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
});
