'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function TeamService($q, $http, ErrorHandling) {

    var service = {};

    service.allTeams = function() {
        var filterUrl = encodeURIComponent(JSON.stringify({ "where": { "published": true, "deleted": false } }));
        return ErrorHandling.handle($http.get("/api/teams?filter=" + filterUrl));
    }

    service.team = function(id) {
        return ErrorHandling.handle($http.get("/api/teams/" + id));
    };

    return service;
}

servicesModule.service('TeamService', TeamService);