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
  this.city = "San Diego, US";
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

}]);

// weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService',
//  function($scope, $resource, cityService) {
//
//   $scope.city = cityService.city;
//   $scope.weatherResult = {};
//   var url= "https://api.openweathermap.org/data/2.5/weather";
//   var myKey = config.MY_KEY;
//
// $scope.weatherAPI = $resource(url, {
//   callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});
//
// var example = $scope.weatherAPI.get({ q:$scope.city, appid: myKey}).$promise.then(function(result){
//   console.log(result);
//   $scope.weatherResult = result;
//   console.log("first")
// });
//   console.log("second")
//   console.log($scope.weatherResult);
//   console.log("example", example);
//   console.log(typeof example);
//
//
//
// }]);
