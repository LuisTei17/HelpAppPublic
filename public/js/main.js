

angular.module('help',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })

    $routeProvider.when('/registro', {
      templateUrl: 'partials/registro.html',
      controller: 'RegistroController'
    })

    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'partials/HomeController'
    })

    $routeProvider.when('/in', {
        templateUrl: 'partials/feed.html',
        controller: 'partials/FeedController'
    })

    $routeProvider.otherwise({redirectTo: '/home'});


});
