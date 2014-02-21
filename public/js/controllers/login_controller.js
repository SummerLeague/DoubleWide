define([], function() {
	return ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	  $scope.user = {};
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

	  // because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
	  $scope.$apply();
	}];
});