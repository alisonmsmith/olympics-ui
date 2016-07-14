'use strict';

angular.module('olympics').controller('DraftCtrl', ['$scope', '$http',
  function($scope, $http, version, $location) {
    $scope.competitors = [];
    $scope.captain_similarities = {};

    $scope.captains = [
      'Ali',
      'Stove',
      'Dan',
      'Jessica Vermeire',
      'Andrew Mulrean',
      "Kevinus Doweus Wardicus, commander of the Irish, Proprietor of the Shops of thrift and loyal servant of America.  Member of a cheated team, drinker of an underrated beer and I will have my victory in this olympics of the next."
    ];

    $scope.selectedTeams = {};
    $scope.teams = {};
    _.each($scope.captains, function(captain) {
      $scope.teams[captain] = [];
    })

    $http({
      method: 'GET',
      url: "app/data/results.json"
    }).
    success(function(data, status, headers, config) {

      // we only care about the similarity information for our captains
      _.each(data, function(competitors, name) {
        if (_.indexOf($scope.captains, name) !== -1) {
          var temp = [];
          _.each(competitors, function (competitor) {
            if (_.indexOf($scope.captains, competitor[1]) == -1) {
              temp.push(competitor);
            }
          });
          $scope.captain_similarities[name] = temp;
        }
      });

      console.log($scope.captain_similarities);
      // we want a list of all competitors but not captains
      _.each(data, function(competitors, name) {
        if (_.indexOf($scope.captains, name) == -1) {
          $scope.competitors.push(name);
        }
        
      });
    }).
    error(function(data, status, headers, config) {
      console.log("Error loading data!" + status);
    });


    $scope.selectCompetitor = function(chip) {
      $scope.selectedCompetitor = chip;
    };

    $scope.selectTeam = function (team) {
      $scope.selectedTeam = team;

      _.each($scope.captains, function(captain) {
        $scope.selectedTeams[captain] = false;
      });
      $scope.selectedTeams[team] = true;
    };

    $scope.draft = function () {
      if (!$scope.selectedTeam) {
        alert("oops, you forgot to select a team");
        return;
      }
      if (!$scope.selectedCompetitor) {
        alert("oops, you forgot to select a competitor");
        return;
      }
      draft($scope.selectedTeam, $scope.selectedCompetitor);
    }

    $scope.undo = function () {
      // remove the previous competitor from the previous team
      $scope.teams[$scope.prevTeam] = _.without($scope.teams[$scope.prevTeam],$scope.prevCompetitor);

      // add the competitor back to the list
      $scope.competitors.push($scope.prevCompetitor);

      $scope.prevCompetitor = null;
      $scope.prevTeam = null;
    }


    function draft(team, c) {

      // add the competitor to the team
      $scope.teams[team].push(c);

      // remove the competitor from the competitors list
      $scope.competitors = _.without($scope.competitors, c);

      $scope.prevTeam = $scope.selectedTeam;
      $scope.prevCompetitor = $scope.selectedCompetitor;

      $scope.selectedTeams[$scope.selectedTeam] = false;
      $scope.selectedTeam = null;
      $scope.selectedCompetitor = null;

      // remove the competitor from the similarity list
      _.each($scope.captain_similarities, function(competitors, captain, arr) {
        arr[captain] = _.reject(competitors, function(competitor) {
          return competitor[1] === c;
        });
      });

     // console.log($scope.captain_similarities);

    };

    $scope.computeScraps = function() {
     // var scraps = ['Delaney', 'Alonzo', 'Joe Niewola ', 'Patrick Manion', 'Kevin Solari', 'Steve Crist'];

      var scraps = $scope.competitors;

      console.log("computing scraps")
      console.log(scraps);
     // console.log($scope.captain_similarities);
      var best_score = 0;
      var best_combo = [];

      var similarities = {};
      // determine pairwise similarities
      _.each($scope.captains, function (captain) {
        similarities[captain] = {};
        _.each(scraps, function (scrap) {
          var score = _.find($scope.captain_similarities[captain], function(arr) {
            return arr[1] == scrap;
          });
          similarities[captain][scrap] = score[0];
        });
      })

      $scope.similarities = similarities;
      console.log($scope.similarities);

      _.each($scope.captains, function(c1) {
        // let the each captain choose a scrap 
        _.each(scraps, function(s1) {
            // captain chooses scrap
            _.each($scope.captains, function(c2) {
                if (c2 !== c1) {
                  _.each(scraps, function(s2) {
                      if (s2 !== s1) {
                        _.each($scope.captains, function(c3) {
                          if (c3 != c2 && c3 != c1) {
                            _.each(scraps, function(s3) {
                              if (s3 != s2 && s3 != s1) {
                                _.each($scope.captains, function(c4) {
                                  if (c4 !== c3 && c4 != c2 && c4 != c1) {
                                    _.each(scraps, function(s4) {
                                      if (s4 != s3 && s4 !== s2 && s4 != s1) {
                                      _.each($scope.captains, function(c5) {
                                        if (c5 != c4 && c5 != c3 && c5!= c2 && c5 != c1) {
                                        _.each(scraps, function(s5) {
                                          if (s5 != s4 && s5 != s3 && s5!= s2 && s5 != s1) {
                                          _.each($scope.captains, function(c6) {
                                            if (c6 !== c5 && c6 !== c4 && c6 !== c3 && c6 !== c2 && c6 !== c1) {
                                            _.each(scraps, function(s6) {
                                              if (s6 !== s5 && s6 !== s4 && s6 !== s3 && s6 !== s2 && s6 !== s1) {
                                                // COMPUTE SCORE
                                                var total_score = similarities[c1][s1] +
                                                  similarities[c2][s2] +
                                                  similarities[c3][s3] +
                                                  similarities[c4][s4] +
                                                  similarities[c5][s5] +
                                                  similarities[c6][s6];

                                                if (total_score > best_score) {
                                                  best_score = total_score;
                                                  best_combo = [
                                                    {"captain":c1, "scrap":s1, "score":similarities[c1][s1]},
                                                    {"captain":c2, "scrap":s2, "score":similarities[c2][s2]},
                                                    {"captain":c3, "scrap":s3, "score":similarities[c3][s3]},
                                                    {"captain":c4, "scrap":s4, "score":similarities[c4][s4]},
                                                    {"captain":c5, "scrap":s5, "score":similarities[c5][s5]},
                                                    {"captain":c6, "scrap":s6, "score":similarities[c6][s6]}
                                                  ];
                                                }

                                              }
                                              
                                            })
                                          }
                                          })
                                        }
                                        })
                                        }
                                      }) // c5
                                    } // if
                                    }) //s4
                                  } // if
                                }) // c4
                              } // if
                            }) //s3
                          } // if
                        }) // c3
                      } // if
                    }) // s2
                } // if
              }) // c2
          }) // s1
      }) // c1

      console.log(best_score);
      console.log(best_combo);

      _.each(best_combo, function(pairing) {
        $scope.teams[pairing.captain].push(pairing.scrap);
        $scope.competitors = _.without($scope.competitors, pairing.scrap);
      });
    }



  }
]);