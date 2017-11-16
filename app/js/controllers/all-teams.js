'use strict'

var controllersModule = require('./_index');

function AllTeamsCtrl($scope, $sce, $filter, TeamService) {
  $scope.allTeams = TeamService.allTeams()
  .then(teams => {
  	$scope.allTeams = teams.map(elem => {
	  elem.bio = $sce.trustAsHtml($filter('lang')(elem.bio));
  	  return elem;
  	})
  });
}

controllersModule.controller('AllTeamsCtrl', AllTeamsCtrl);

