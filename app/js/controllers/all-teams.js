'use strict'

var controllersModule = require('./_index');

function AllTeamsCtrl($scope, $sce, $filter, TeamService) {
  $scope.allTeams = TeamService.allTeams()
  .then(teams => {
  	teams = teams.map(elem => {
	  elem.bio = $sce.trustAsHtml($filter('lang')(elem.bio));
  	  return elem;
  	});
  	$scope.allTeams = $filter('orderBy')(teams, 'localId');
  });
}

controllersModule.controller('AllTeamsCtrl', AllTeamsCtrl);

