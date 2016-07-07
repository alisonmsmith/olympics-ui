/*var app = angular.module('olympics', [
  'ngRoute',
  'ngMaterial',
  'olympics.controllers',
  'olympics.services',
  'olympics.directives'
]);*/

var app = angular.module('olympics', [
  'ngRoute',
  'ngMaterial',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  console.log('configuring the app');

    $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/overview.html',
      controller: 'MainCtrl'
    })
    .state('draft', {
      url: '/draft',
      templateUrl: 'app/views/draft.html',
      controller: 'DraftCtrl'
    });


  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('pink');

});