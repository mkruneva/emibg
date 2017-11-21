'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamCtrl($scope, $stateParams, TeamService, ErrorHandling) {
    // test
    $scope.testWord = 'AdminTeamCtrl';
    // end Test

    $scope.alerts = [];

    $scope.cancel = function() {
        console.log('Cancel ckicked');
    }

    // var nullify

    $scope.save = function() {
        console.log('Save clicked');
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    var init = function(team) {
        $scope.team = team;
        
        // $scope.bgHtml = $sce.trustAsHtml(article.html.bg);
        // $scope.enHtml = $sce.trustAsHtml(article.html.en);
        // var html = angular.copy(article.html);
        // $scope.html = html;
    }

    if ($stateParams.id) {
        TeamService.team($stateParams.id)
            .then(init)
            .catch(err => $scope.alerts.push({ type: 'danger', msg: err + "" }));
    } else {
        init({
            name: { bg: '', en: '' },
            job: { bg: '', en: '' },
            phone: { bg: '', en: '' },
            bio: { bg: '', en: '' },
            localId: '',
            email: '',
            // image: {
            //     config: {
            //         fill: true,
            //         horizontalalign: "center",
            //         verticalalign: "center"
            //     }
            // },
            published: false,
            deleted: false
        });
    }
}

controllersModule.controller('AdminTeamCtrl', AdminTeamCtrl);