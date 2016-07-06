var app = angular.module('olympics', [
  'ngRoute',
  'ngMaterial',
  'olympics.controllers',
  'olympics.services',
  'olympics.directives'
]);

/*var app = angular.module('olympics', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMaterial',
  'ui.router',
  'ui.bootstrap',
  'angularSpinners'
 // 'ngAnimate'
]);*/

app.config(function($routeProvider, $mdThemingProvider) {

    $routeProvider.when('/', {
        templateUrl: 'app/views/overview.html',
        controller: 'MainCtrl'
      })
        .otherwise({
          redirectTo: '/'
        });

  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('pink');

});