app.controller('profileCtrl', function($scope){
  $scope.httpRequest('get', '/api/avatars').then(function(response){
    $scope.avatars = response
    console.log($scope.avatars);
  }, function(error){
    console.log(error);
  })
});
