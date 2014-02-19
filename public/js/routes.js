define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/main.html'
    });
    $routeProvider.when('/admin', {
      templateUrl: 'partials/test/index.html',
      controller: 'TestsController'
    });
    $routeProvider.when('/login', {
      templateUrl: 'partials/test/index.html',
      controller: 'TestTwoController'
    });
    $routeProvider.otherwise({
      templateUrl: '/404.html'
    });
	}]);
});