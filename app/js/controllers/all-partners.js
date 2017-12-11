'use strict'

var controllersModule = require('./_index');

/**
 * @ngInject
 */

function AllPartnersCtrl($scope, $filter, PartnerService) {
    $scope.alerts = [];
    $scope.loading = true;
    $scope.allPartners = PartnerService.allPartners()
        .then(partners => {
            $scope.allPartners = partners;
            var members = partners.filter(partner => partner.type == "member");
            $scope.members = $filter('orderBy')(members, 'localId');
            var partners = partners.filter(partner => partner.type == "partner")
            $scope.partners = $filter('orderBy')(partners, 'localId');
            $scope.loading = false;
        })
        .catch(err => {
            $scope.alerts.push({ type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err });
            console.log("APP ERROR: " + err);
            $scope.loading = false;
        });
}

controllersModule.controller('AllPartnersCtrl', AllPartnersCtrl);