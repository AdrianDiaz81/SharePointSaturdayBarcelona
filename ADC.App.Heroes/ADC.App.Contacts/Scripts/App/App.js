(function () {
    angular.module('app', [
      'ngRoute',
       'speakersServices'
    ])
      .config(config);

    // Configure the routes.
    function config($routeProvider, $httpProvider) {
        $routeProvider
			.when('/', {
			    templateUrl: '../scripts/App/views/list.html',
			    controller: 'MainController'
			  
			})
           .when('/speaker/add', {
               templateUrl: '../scripts/App//Views/add.html',
               controller: 'newController'
           })
            .when('/speaker/edit/:id', {
                templateUrl: '../scripts/App//Views/edit.html',
                controller: 'editController'
            })
            .when('/speaker/delete/:id', {
                templateUrl: '../scripts/App//Views/delete.html',
                controller: 'deleteController'
            })
			.otherwise({
			    redirectTo: '/'
			});      

    };
})();