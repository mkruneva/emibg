'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnersCtrl($scope, $stateParams, $http) {
    $scope.testWord = 'OK';
    //$scope.partnerType = { partner: true, member: true }; //for test only -- actual value to be taken from the partners service

    var fetchPartners = function() {
        $scope.alerts = [];
        $http.get(
                "/api/partners/"
            )
            .then(function(response) {
                $scope.partners = response.data;
                console.log(response.data);
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се покажат партньорите. Моля опитайте след малко." });
                console.log(err);
            });
    };

    $scope.alerts = [];
    $scope.showCategories = $stateParams.showCategories || "news,emis,summaries";
    $scope.partnerType = { partner: true, member: true };

    fetchPartners();

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


}

controllersModule.controller('AdminPartnersCtrl', AdminPartnersCtrl);