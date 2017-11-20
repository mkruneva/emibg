'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamCtrl($scope) {
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
}

controllersModule.controller('AdminTeamCtrl', AdminTeamCtrl);