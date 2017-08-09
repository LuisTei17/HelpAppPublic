angular.module('help').factory('User', function($resource) {

  return $resource('/login/:id');
})
