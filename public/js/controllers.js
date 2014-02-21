define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */

	return angular.module('myApp.controllers', [])
		.controller('adminController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/admin_controller'], function(admin_controller) {
				$injector.invoke(admin_controller, this, { '$scope': $scope });
			});
		}])
		.controller('loginController', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/login_controller'], function(login_controller) {
				$injector.invoke(login_controller, this, { '$scope': $scope });
			});
		}]);
});