'use strict';

angular.module('olympics.controllers')
.controller('MainCtrl', ['$scope', '$http',
  function($scope, $http, version, $location) {
    // Load data
    $http({
      method: 'GET',
      url: "app/data/results.json"
    }).
    success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log("Error loading data!" + status);
    });

  }
])