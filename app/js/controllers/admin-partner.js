'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnerCtrl($scope, $stateParams, PartnerService) {
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


    var init = function(partner) {
        $scope.partner = partner;
    }

    if ($stateParams.id) {
        PartnerService.partner($stateParams.id)
            .then(init)
            .catch(err => $scope.alerts.push({ type: 'danger', msg: err + "" }));
    } 
    else {
        init({
            title: { bg: '', en: '' },
            localId: '',
            site: '',
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

controllersModule.controller('AdminPartnerCtrl', AdminPartnerCtrl);