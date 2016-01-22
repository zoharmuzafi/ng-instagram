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
app.controller('SearchCtrl', ['$scope', function ($scope) {
	$scope.test = "test";

}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
 
}]);