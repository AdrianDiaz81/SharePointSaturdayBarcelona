(function () {
    angular
      .module('app')
      .controller('MainController', function ( $scope,Speaker) {   
          $scope.speakers =[] ;
          Speaker.getSpeaker().then(function (data) {
              $scope.speakers = data;
              $scope.$apply()
          })
          
      })
    .controller('editController', function ($scope, Speaker, $routeParams) {
        $scope.Id = $routeParams.id;
        Speaker.getSpeakerById($scope.Id).then(function (data) {
            $scope.speaker = data;
            $scope.$apply();
        });

        $scope.editSpeaker = function (titulo,apellido) {
            var dataSpeaker = { Id: $scope.Id, Titulo: titulo, Apellidos: apellido }
            Speaker.editSpeaker(dataSpeaker).then(function (data) {

            });
        }
    })
     .controller('newController', function ($scope, Speaker) {
         $scope.speakers = [];
       
         $scope.addSpeaker = function (titulo, apellido) {
           
             var dataSpeaker={Titulo:titulo,Apellidos:apellido}
             Speaker.addSpeaker(dataSpeaker).then(function (data) {
                 alert("Speaker Insertado");
             });
         };
     })
    .controller('deleteController', function ($scope, Speaker, $routeParams) {
        $scope.Id = $routeParams.id;
        Speaker.getSpeakerById($scope.Id).then(function (data) {
            $scope.speaker = data;
            $scope.$apply();
        });

        $scope.remove = function () {
          
            Speaker.deleteSpeaker($scope.Id).then(function (data) {

            });
        }
    })
    
   
   
})();