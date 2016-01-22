var app = angular.module('instagramSearchApp', ['ngRoute', 'ngResource']);


//parsse
var parseRequestHeaders = {
  'X-Parse-Application-Id': '6c8RuTlGMBRj7whVDiiIYYZ7Lk98hslI5UgUBvjU',
  'X-Parse-REST-API-Key': 'JBtMt49ZQEf8CQhD3t9YXq17M3l2nl1OBxc8ZPOH'
};

//resource
app.factory('Photo', ['$resource', function ($resource) {
  return $resource('https://api.parse.com/1/classes/Photo/:photoId', { photoId: '@photoId' },
    {
      query: {
        method: 'GET',
        isArray: false,
        headers: parseRequestHeaders
      },
      save: {
        method: 'POST',
        headers: parseRequestHeaders
      }
    });
}]);

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
app.controller('SearchCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
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

	$scope.savePhoto = function(photo){
		var photoData={
			url: photo.images.standard_resolution.url,
			username: photo.user.username,
			likes: photo.likes.count
		};
		Photo.save(photoData, function(response){
			console.log(response);
		});
	};
}]);

app.controller('FavoritesCtrl', ['$scope', 'Photo', function ($scope, Photo) {
	$scope.favorites = [];
	Photo.query(function (data) {
	    $scope.favorites = data;
	    $scope.favorites = data.results;
	    console.log($scope.favorites);
	  });
}]);