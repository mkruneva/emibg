'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/

function AllPartnersCtrl($scope, $filter, PartnerService) {                                                                                                  
	$scope.allPartners = PartnerService.allPartners()
	.then(partners => {
		$scope.allPartners = partners;
		var members = partners.filter(partner => partner.type == "member");
		$scope.members = $filter('orderBy')(members, 'localId');
		var partners = partners.filter(partner => partner.type == "partner")
		$scope.partners = $filter('orderBy')(partners, 'localId');
	});
}

controllersModule.controller('AllPartnersCtrl', AllPartnersCtrl);
