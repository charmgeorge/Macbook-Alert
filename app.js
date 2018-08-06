//MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller:'homeController'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller:'forecastController'
  })
  .otherwise({redirectTo:'/'});
});

//SERVICES
weatherApp.service('cityService', function() {
  this.city = "San Diego, CA";
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService',
 function($scope, $resource, cityService) {

  $scope.city = cityService.city;

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=04feb4b79b1eb18d5094df27d96f1f62&q=London&cnt=2", {
    callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });

    console.log($scope.weatherResult);

}]);
