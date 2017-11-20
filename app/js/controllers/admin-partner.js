'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnerCtrl($scope) {
    $scope.testWord = 'AdminPartnerCtrl';
}

controllersModule.controller('AdminPartnerCtrl', AdminPartnerCtrl);