'use strict';

angular.module('olympics').controller('MainCtrl', ['$scope', '$http',
  function($scope, $http, version, $location) {
    
    $scope.competitors = [];
    $scope.comparison = {};

    $http({
      method: 'GET',
      url: "app/data/results.json"
    }).
    success(function(data, status, headers, config) {
      $scope.competitors = [];
      // we want a list of all competitors 
      _.each(data, function(competitors, name) {
        if (name === "Kevinus Doweus Wardicus, commander of the Irish, Proprietor of the Shops of thrift and loyal servant of America.  Member of a cheated team, drinker of an underrated beer and I will have my victory in this olympics of the next.") {
          name = "Kevinus Doweus Wardicus";
        }
          $scope.competitors.push(name);
        //  console.log('{"id":'+name+',"group":1},');
          var c = [];
          _.each(competitors, function(competitor) {
            if (competitor[0] !== 100) {
              var p = {};
              p.sim = Math.round(competitor[0]) + "%";
              p.name = competitor[1];
              if (p.name === "Kevinus Doweus Wardicus, commander of the Irish, Proprietor of the Shops of thrift and loyal servant of America.  Member of a cheated team, drinker of an underrated beer and I will have my victory in this olympics of the next.") {
                p.name = "Kevinus Doweus Wardicus";
              }
              c.push(p);
            }
          });
          $scope.comparison[name] = c;
      });
    }).
    error(function(data, status, headers, config) {
      console.log("Error loading data!" + status);
    });

    $scope.selectChip = function(chip) {
      // show the similar competitors
      $scope.comparisonDisplay = $scope.comparison[chip];

    }

  }
]);