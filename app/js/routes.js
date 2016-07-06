angular.module('olympics')
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'app/views/overview.html',
        controller: 'MainCtrl'
      })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);