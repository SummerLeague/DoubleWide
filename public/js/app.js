'use strict';

/* App Module */

var doubleWideApp = angular.module('doubleWideApp', [
  'ngRoute',
  'testControllers'
]);

doubleWideApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/test', {
        templateUrl: 'partials/test/index.html',
        controller: 'TestsController'
      }).
      otherwise({ templateUrl:'/404.html' });
  }]);
