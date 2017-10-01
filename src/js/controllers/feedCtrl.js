app.controller('feedCtrl', function($scope, $timeout){
  $scope.appName = "NodeAuth";
  $scope.feed = []
  $scope.preload = true;
  // $scope.commentError = false;
  // $scope.showComments = false;

  $timeout(()=>{$scope.preload = false}, 1500)
  $scope.getFeed = function(){
    $scope.httpRequest('get', '/api/feed').then(function(response){
      $scope.feed = response;
      $scope.feed.forEach(function(feed){
        if (feed.comments === null){
          delete feed.comments
        }else{
          feed.comments = JSON.parse("[" + feed.comments + "]");
          feed.comments.forEach(function(comment){
            comment.body = decodeURI(comment.body);
            comment.created_at = new Date(comment.created_at.replace(/-/g, '/'))
          })
        }
      })

    }, function(error){
      console.log(error);
    })
  };

  $scope.postComment = function(model, status){
    if (!this.newComment){
      model.commentError = true;
    }else{
      $scope.httpRequest('post', '/api/comments', {
        user_id: $scope.user.id,
        status_id: status.id,
        body: this.newComment
      }).then(function(response){
        model.newComment = "";
        status.comments = response[0].comments;
        status.comments = JSON.parse("[" + status.comments + "]");
        status.comments.forEach(function(comment){
          comment.body = decodeURI(comment.body);
          comment.created_at = new Date(comment.created_at)
        })
        model.commentError = false;
        model.$parent.showComments = true;
      }, function(error){
        console.log(error);
      })
    }
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
