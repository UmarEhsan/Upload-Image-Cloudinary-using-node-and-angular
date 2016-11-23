/**
 * Created by LAPTECH on 10/21/2016.
 */
(function() {

  angular
    .module('AdminApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope', '$state', 'userService','$stateParams'];
  function profileCtrl($scope, $state, userService, $stateParams) {
    var vm = this;
    if($stateParams.obj !== null){
      $scope.editDoctor = $stateParams.obj;
    }

    $scope.user = {};
    getUserData();
    function getUserData(){
      userService.getProfile(function(user){
        if(user.data){
          $scope.user = user.data;
          return
        }


      })
      $state.go("home")

    }


  }

})();
