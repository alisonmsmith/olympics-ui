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

    $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/overview.html',
      controller: 'MainCtrl'
    })
    .state('badges', {
      url: '/',
      templateUrl: 'app/views/badges.html',
      controller: 'BadgeCtrl'
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
