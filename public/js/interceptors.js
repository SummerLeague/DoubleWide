define(['angular', 'app'], function(angular, app) {
	'use strict';

  /* Controllers */

	return app.config(['$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.responseInterceptors.push(function($q, $location) {
      // Checks stats of any intercepted HTTP response and redirectes to login if 401 or 403.
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          },
          // Error: Check the error status to get only the 401 or 403 responses.
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