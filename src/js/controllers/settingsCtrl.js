app.controller('settingsCtrl', function($scope, $timeout, $window){
  $scope.httpRequest('get', '/api/avatars').then(function(response){
    $scope.avatars = response
  }, function(error){
    console.log(error);
  });

  $scope.setAvatar = function(avatar){
    $scope.user.avatar = avatar.name;
    $scope.newAvatar = avatar;
  };

  $scope.saveAvatar = function(){
    $scope.httpRequest('put', `/api/users/${$scope.user.id}`, {avatar_id : $scope.newAvatar.id})
    .then(function(response){
      $scope.changeSuccess = true;
      $window.scrollTo(0, 0);
      $timeout(()=>{
        $scope.changeSuccess = false;
      }, 5000);    }, function(error){
      console.log(error);
    })
  }
});
