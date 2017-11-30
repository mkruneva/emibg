'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnerCtrl($scope, $rootScope, $state, $stateParams, $http, $sce, PartnerService, EmiAuth, ErrorHandling) {
    // test
    $scope.testWord = 'AdminPartnerCtrl';
    // test end

    $scope.alerts = [];

    $scope.cancel = function() {
        console.log('Cancel ckicked');
        if ($rootScope.previousState) {
            $state.go($scope.previousState, $scope.previousStateParams);
        } else {
            $state.go("app.admin.partners");
        }
    }

    // var nullify

    $scope.save = function() {

        $scope.alerts = [];

        var method = $http.post;
        var url = "/api/partners";

        if ($scope.partner.id) {
            method = $http.put;
            url = "/api/partners/" + $scope.partner.id;
        }
        ErrorHandling.handle(method(url, $scope.partner, EmiAuth.addAuthHeader({})))
            .then(function(data) {
                $scope.partner = data;
                $scope.alerts.push({ type: 'success', msg: $sce.trustAsHtml("Партньорът е записан успешно") });
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се запише партньорът в момента. Моля опитайте отново. " + err });
                console.log(err);
            });
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
    } else {
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