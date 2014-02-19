define(['angular'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('myApp.controllers', [])
		.controller('TestsController', ['$scope', function($scope) {
    	$scope.test_message = 'Hello World.';
  	}])
		// More involved example where controller is required from an external file
		.controller('TestTwoController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/test_two_controller'], function(test_two_controller) {
				$injector.invoke(test_two_controller, this, {'$scope': $scope});
			});
		}]);
});