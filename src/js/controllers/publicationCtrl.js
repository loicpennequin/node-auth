app.controller('publicationCtrl', function($scope){
  $scope.newStatus = "";
  $scope.statusError = false;

  $scope.postStatus = function(status){
    if (!$scope.newStatus){
      $scope.statusError = true;
    }else{
      $scope.newStatus = "";
      $scope.httpRequest('post', '/api/publications/status', {
        user_id: $scope.user.id,
        body: $scope.newStatus
      }).then(function(response){
        $scope.statusError = false;
        $scope.newStatus = "";
        $scope.addStatusForm.$setPristine();
        $scope.$emit('newStatusPosted', response[0]);
      }, function(error){
        console.log(error);
      })
    }
  }
})
