define([], function() {
	return ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	  $scope.test = "dasdasd";
	  $scope.login = function() {
	  	console.log('login called');
	    $http.post('/api/login', {
	      nickname: $scope.user.nickname,
	      password: $scope.user.password,
	    })
	    .success(function(user) {
	      // No error: authentication OK
	      $rootScope.message = 'Ok!';
	      $location.url('/admin');
	    })
	    .error(function() {
	      // Error: authentication failed
	      $rootScope.message = 'Invalid credentials.';
	      $location.url('/login');
	    });
	  };
	}];
});