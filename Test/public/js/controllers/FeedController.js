angular.module('help').controller('FeedController',
  function($scope, $http) {
    $http.get('/in').success(function(data) {
      $scope.user = data;
    })
    console.log($routeParams);
  });
//$window.location.href = '/signin';
