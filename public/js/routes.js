define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/admin.html',
      controller: 'adminController',
      resolve: {
        loggedin: function(appServices) {
          return appServices.checkLoggedin();
        }
      }
    });
    $routeProvider.when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'adminController',
      resolve: {
        loggedin: function(appServices) {
          return appServices.checkLoggedin();
        }
      }
    });
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    });
    $routeProvider.otherwise({
      templateUrl: '/404.html'
    });
	}]);
});