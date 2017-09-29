app.controller('feedCtrl', function($scope, $timeout){
  $scope.appName = "NodeAuth";
  $scope.feed = []
  $scope.preload = true;

  $timeout(()=>{$scope.preload = false}, 1500)
  $scope.getFeed = function(){
    $scope.httpRequest('get', '/api/feed').then(function(response){
      $scope.feed = response;
      console.log($scope.Feed.comments);
      $scope.feed.forEach(function(feed){
        if (feed.comments === null){
          delete feed.comments
        }else{
          feed.comments = JSON.parse("[" + feed.comments + "]");
          feed.comments.forEach(function(comment){
            comment.created_at = new Date(comment.created_at)
          })
        }
      })

    }, function(error){
      console.log(error);
    })
  };

  $scope.postComment = function(status){
    $scope.httpRequest('post', '/api/comments', {
      user_id: $scope.user.id,
      status_id: status.id,
      body: this.newComment
    }).then(function(){
      this.newComment = "";
      $scope.getFeed();
    }, function(error){
      console.log(error);
    })
  };

  $scope.deleteComment = function(id){
    $scope.httpRequest('delete', '/api/comments/' + id).then(function(response){
      $scope.getFeed();
    }, function(error){
      console.log();
    })
  };

  $scope.$on('newStatusRecieved', (event, status)=>{
    $scope.feed.push(status)
  });

  $scope.getFeed();
});
