'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamsCtrl($scope, $http) {
	$scope.testWord = 'OK!';

	var fetchTeams = function() {
        $scope.alerts = [];
        $http.get(
                "/api/teams/"
            )
            .then(function(response) {
                $scope.teams = response.data;
                console.log('Teams are ', response.data);
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се покаже екипа. Моля опитайте след малко." });
                console.log(err);
            });
    };

    $scope.alerts = [];

    fetchTeams();

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


}

controllersModule.controller('AdminTeamsCtrl', AdminTeamsCtrl);