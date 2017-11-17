'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminTeamsCtrl($scope) {
	$scope.testWord = 'test works';
}

controllersModule.controller('AdminTeamsCtrl', AdminTeamsCtrl);