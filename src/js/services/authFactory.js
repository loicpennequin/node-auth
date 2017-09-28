app.factory('authFactory', function($http, $q, $location){
  return {
    register : function(data){
      let deferred = $q.defer();
      $http.post('/auth/register', data)
      .then(function(response){
        deferred.resolve(response)
      }, function(error){
        deferred.reject(error)
      })
      return deferred.promise;
    },
    signIn : function(data){
      let deferred = $q.defer();
      $http.post('/auth/signin', data)
      .then(function(response){
        deferred.resolve(response)
      }, function(error){
        deferred.reject(error)
      })
      return deferred.promise;
    },
    isLoggedIn : function(data){
      let deferred = $q.defer();
      $http.get('/auth/loggedin')
      .then(function(response){
        deferred.resolve(response)
      }, function(error){
        deferred.reject(error)
      })
      return deferred.promise;
    },
    logout : function(){
      $http.get('/auth/logout')
      .then(function(response){
        $location.path('/');
      }, function(error){
        console.log(error);
      })
    }
  }
})
