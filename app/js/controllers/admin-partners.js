'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnersCtrl($scope, $stateParams, $state, $http, EmiAuth) {
    $scope.testWord = 'OK';
    //$scope.partnerType = { partner: true, member: true }; //for test only -- actual value to be taken from the partners service

    var fetchPartners = function() {
        $scope.alerts = [];
        $http.get(
                "/api/partners/"
            )
            .then(function(response) {
                $scope.partners = response.data;
                //console.log('Partners are ', response.data);
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се покажат партньорите. Моля опитайте след малко." });
                console.log(err);
            });
    };

    $scope.alerts = [];

    
    // $scope.showCategories = "partners,members";
    // $scope.partnerType = { partner: true, member: true };

    // // Filetercategory - Needs to be fixed 
    // var partnerTypeInitialEvent = true;
    // $scope.$watchCollection('partnerType', function() {
    //     //console.log('partnerType is ', $scope.partnerType);
    //     if (!partnerTypeInitialEvent) {
    //         $scope.showCategories = "";
    //         angular.forEach($scope.partnerType, function(value, key) {
    //             if (value) {
    //                 $scope.showCategories = $scope.showCategories + key + ",";
    //             }
    //         });
    //         if ($scope.showCategories === "") {
    //             $scope.showCategories = "some string that is not a category";
    //         }
    //         //console.log('showCategories is ', $scope.showCategories);
    //         fetchPartners();
    //     }
    //     partnerTypeInitialEvent = false;
    // });

    // end Filetercategory 

    $scope.delete = function(id) {
        $scope.alerts = [];
        console.log($http.delete("/api/partners/delete/" + id, EmiAuth.addAuthHeader({})));
        $http.delete(
                "/api/partners/delete/" + id,
                EmiAuth.addAuthHeader({})
            )
            .then(response => {
                $scope.partners = $scope.partners.filter(partners => partners.id != id);
                $scope.alerts.push({ type: 'success', msg: "Партньорът е успешно изтрит!  &nbsp;&nbsp; <a href='#' class='btn btn-info btn-small' ng-click=\"restore('" + id + "')\">UNDO</a>" });
            })
            .catch(err => {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се изтрие партньорът. Моля опитайте след малко." });
            })
    }

    $scope.restore = function(id) {
        $http.delete(
                "/api/partners/delete/" + id,
                EmiAuth.addAuthHeader({ params: { "delete": "false" } })
            )
            .then(response => {
                $state.go('.', {
                    page: $scope.page,
                    // published: $scope.published + "",
                    // showCategories: $scope.showCategories
                }, { reload: true });
            })
            .catch(err => {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се възтанови изтрития партньор." });
            })
    }


    fetchPartners();

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


}

controllersModule.controller('AdminPartnersCtrl', AdminPartnersCtrl);