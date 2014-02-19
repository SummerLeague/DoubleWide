define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401 || response.status === 403) {
              $location.url('/login');
            }
            return $q.reject(response);
          }
        );
      }
    });
	}]);
});