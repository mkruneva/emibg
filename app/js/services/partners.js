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
  	var filterUrl = encodeURIComponent(JSON.stringify({"where":{"published":true,"deleted":false}}));
    return $http.get("/api/partners?filter=" + filterUrl)
    .then(response => response.data);
  }

  service.partner = function(id) {
    return ErrorHandling.handle($http.get("/api/partners/" + id));
  };

  return service;
}

servicesModule.service('PartnerService', PartnerService);

