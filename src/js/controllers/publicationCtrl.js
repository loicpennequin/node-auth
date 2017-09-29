app.controller('publicationCtrl', function($scope){
  $scope.newStatus = "";
  $scope.postStatus = function(status){
    $scope.httpRequest('post', '/api/publications/status', {
      user_id: $scope.user.id,
      body: $scope.newStatus
    }).then(function(response){
      $scope.newStatus = "";
      $scope.addStatusForm.$setPristine();
      $scope.$emit('newStatusPosted', response[0]);
    }, function(error){
      console.log(error);
    })
  }
})
