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

  var url= "https://api.openweathermap.org/data/2.5/weather";
  var myKey = config.MY_KEY;

  $scope.weatherAPI = $resource(url, {
    callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});


    $scope.weatherResult = $scope.weatherAPI.get({ q:"London,uk", cnt:2, appid: myKey}).$promise.then(function(result){
    console.log(result);
  });

    console.log($scope.weatherResult);

}]);
