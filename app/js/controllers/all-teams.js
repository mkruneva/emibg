'use strict'

var controllersModule = require('./_index');

function AllTeamsCtrl($scope, $sce, $filter, TeamService) {
    $scope.alerts = [];
    $scope.allTeams = TeamService.allTeams()
        .then(teams => {
            teams = teams.map(elem => {
                if (elem.bio.bg || elem.bio.en) { elem.hasBio = true } else { elem.hasBio = false };
                elem.bio = $sce.trustAsHtml($filter('lang')(elem.bio));
                return elem;
            });
            $scope.allTeams = $filter('orderBy')(teams, 'localId');
        })
        .catch(err => {
            $scope.alerts.push({ type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err });
            console.log("APP ERROR: " + err);
        });
}

controllersModule.controller('AllTeamsCtrl', AllTeamsCtrl);