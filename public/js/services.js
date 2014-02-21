define(['angular'], function (angular) {
	'use strict';

  /* Services */

	angular.module('myApp.services', [])
		.factory('appServices', ['$q', '$timeout', '$http', '$location', '$rootScope', function($q, $timeout, $http, $location, $rootScope) {
			var appServices = {
				checkLoggedin: function(){
	        // Initialize a new promise
	        var deferred = $q.defer();

	        // Make an AJAX call to check if the user is logged in
	        $http.get('/api/loggedin').success(function(user){
	          // Authenticated
	          if (user !== '0') {
	            $timeout(deferred.resolve, 0);
	          }
	          else {
	            $rootScope.message = 'You need to log in.';
	            $timeout(function(){ deferred.reject(); }, 0);
	            $location.url('/login');
	          }
	        });

	        return deferred.promise;
	      }
	    }

      return appServices;
		}]);
});
