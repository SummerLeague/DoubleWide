define([
  'angular',
  'controllers',
  'angularRoute',
  ], function (angular, controllers) {
    'use strict';

    var myApp = angular.module('myApp', [
      'ngRoute',
      'myApp.controllers'
    ]);

    myApp.config(function($routeProvider, $locationProvider, $httpProvider) {
      //================================================
      // Check if the user is connected
      //================================================
      var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
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
      };
      //================================================

    }) // end of config()
    .run(function($rootScope, $http){
      $rootScope.message = '';

      // Logout function is available in any pages
      $rootScope.logout = function(){
        $rootScope.message = 'Logged out.';
        $http.post('/api/logout');
      };
    });
  return myApp;
});
