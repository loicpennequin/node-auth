app.factory('httpFactory', function($http, $q){
  return{
    request : function(type, path, data){
      let deferred = $q.defer();
        $http[type](path, data)
        .then(function(response){
          deferred.resolve(response.data)
        }, function(error){
          deferred.reject(error)
        });
      return deferred.promise;
    }
  }
});
