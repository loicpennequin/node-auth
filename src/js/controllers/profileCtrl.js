app.controller('securedViewCtrl', function($scope,httpFactory){
  httpFactory.httpRequest('get', '/api/avatars').then(function(response){
    $scope.avatars = response
  }, function(error){
    console.log(error);
  })
});
