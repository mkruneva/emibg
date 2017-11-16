'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/

function AllPartnersCtrl($scope, PartnerService) {                                                                                                  
	$scope.allPartners = PartnerService.allPartners()
	.then(partners => {
		$scope.allPartners = partners;
		$scope.members = partners.filter(partner => partner.type == "member");
		$scope.partners = partners.filter(partner => partner.type == "partner")
	});
}

controllersModule.controller('AllPartnersCtrl', AllPartnersCtrl);
