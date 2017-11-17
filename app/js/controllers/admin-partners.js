'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnersCtrl($scope) {
	$scope.testWord = 'OK';
	$scope.pertnerType = {partner: true, member: true}; //for test only -- actual value to be taken from the partners service
}

controllersModule.controller('AdminPartnersCtrl', AdminPartnersCtrl);