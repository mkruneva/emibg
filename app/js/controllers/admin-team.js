'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamCtrl($scope) {
    $scope.testWord = 'AdminTeamCtrl';
}

controllersModule.controller('AdminTeamCtrl', AdminTeamCtrl);