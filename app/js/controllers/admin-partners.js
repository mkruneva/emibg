'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminPartnersCtrl($scope, $stateParams, $state, $http, EmiAuth) {

    var fetchPartners = function() {
        $scope.alerts = [];
        
        var filterUrl = encodeURIComponent(JSON.stringify({"where":{"deleted":false}}));  //show only not deleted partners
        $http.get("/api/partners/?filter=" + filterUrl)  
            .then(function(response) {
                $scope.partners = response.data;
            })
            .catch(function(err) {
                $scope.alerts.push({ type: 'danger', msg: "Не е възможно да се покажат партньорите. Моля опитайте след малко." });
                console.log(err);
            });
    };

    $scope.alerts = [];


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
                    page: $scope.page
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