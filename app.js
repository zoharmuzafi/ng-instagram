var app = angular.module('instagramSearchApp', ['ngRoute']);

//routes config
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })
    .when('/favorites', {
      templateUrl: 'templates/favorites.html',
      controller: 'FavoritesCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

//controllers
app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.search = function(){
		var tag = $scope.searchTag.tag;
		$scope.searchTag = {};
		var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
		$http.jsonp(url)
      .then(function (response) {
        $scope.photos = response.data.data;
        console.log(response);
     	 }
      );
	};
}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
 
}]);