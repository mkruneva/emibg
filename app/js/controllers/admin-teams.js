'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamsCtrl($scope) {
	$scope.testWord = 'OK!';
}

controllersModule.controller('AdminTeamsCtrl', AdminTeamsCtrl);