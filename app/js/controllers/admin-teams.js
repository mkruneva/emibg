'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamsCtrl($scope, $stateParams, $state, $http, EmiAuth) {
    $scope.testWord = 'OK!';

    var fetchTeams = function() {
        $scope.alerts = [];

        var filterUrl = encodeURIComponent(JSON.stringify({"where":{"deleted":false}}));  //show only not deleted teams
        $http.get("/api/teams/?filter=" + filterUrl)
            .then(function(response) {
                $scope.teams = response.data;
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се покаже екипа. Моля опитайте след малко." });
                console.log(err);
            });
    };

    $scope.alerts = [];

    $scope.delete = function(id) {
        $scope.alerts = [];
        //console.log($http.delete("/api/teams/delete/" + id, EmiAuth.addAuthHeader({})));
        $http.delete(
                "/api/teams/delete/" + id,
                EmiAuth.addAuthHeader({})
            )
            .then(response => {
                $scope.teams = $scope.teams.filter(teams => teams.id != id);
                $scope.alerts.push({ type: 'success', msg: "Член на екипа е успешно изтрит!  &nbsp;&nbsp; <a href='#' class='btn btn-info btn-small' ng-click=\"restore('" + id + "')\">UNDO</a>" });
            })
            .catch(err => {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се изтрие партньорът. Моля опитайте след малко." });
            })
    }

    $scope.restore = function(id) {
        $http.delete(
                "/api/teams/delete/" + id,
                EmiAuth.addAuthHeader({ params: { "delete": "false" } })
            )
            .then(response => {
                $state.go('.', {
                    page: $scope.page,
                    // published: $scope.published + "",
                    // showCategories: $scope.showCategories
                }, { reload: true });
            })
            .catch(err => {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се възтанови изтрития член на екипа." });
            })
    }

    fetchTeams();

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


}

controllersModule.controller('AdminTeamsCtrl', AdminTeamsCtrl);