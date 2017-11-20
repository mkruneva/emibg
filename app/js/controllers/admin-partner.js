'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnerCtrl($scope) {
    // test
    $scope.testWord = 'AdminPartnerCtrl';
    // test end

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


    //// 
    ////
    ////

    var init = function(partner) {
        $scope.partner = partner;

    }




}

controllersModule.controller('AdminPartnerCtrl', AdminPartnerCtrl);