angular.module('help').controller('LoginController', function(User, $scope, $routeParams) {
  $scope.mensagem = {texto:''};

  $scope.user = new User();

  if($routeParams) {
    console.log($routeParams);
  }

  $scope.logar = function() {
    $scope.user.$save()
      .then(function(){
        $scope.user = new User();
      })
  }

})
