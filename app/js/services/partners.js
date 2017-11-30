'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function PartnerService($q, $http, ErrorHandling) {

  var service = {};

  service.allPartners = function() {
    return $http.get("/api/partners")
    .then(response => response.data);
  }

  service.partner = function(id) {
    return ErrorHandling.handle($http.get("/api/partners/" + id));
  };

  return service;
}

servicesModule.service('PartnerService', PartnerService);

