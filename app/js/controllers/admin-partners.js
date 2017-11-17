'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnersCtrl($scope) {
	$scope.testWord = 'test works';
}

controllersModule.controller('AdminPartnersCtrl', AdminPartnersCtrl);