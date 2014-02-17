'use strict';

/* Controllers */

var testControllers = angular.module('testControllers', []);

testControllers.controller('TestsController', ['$scope',
  function($scope) {
    $scope.test_message = 'Hello World.';
  }]);

testControllers.controller('OtherTestsController', ['$scope',
  function($scope) {

  }]);
