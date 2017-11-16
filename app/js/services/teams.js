'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function TeamService($q, $http) {

  var service = {};

  service.allTeams = function() {
    return $http.get("/api/teams")
    .then(response => response.data);
  }

  return service;
}

servicesModule.service('TeamService', TeamService);

