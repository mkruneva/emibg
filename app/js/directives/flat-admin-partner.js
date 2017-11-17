'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');

function flatAdminPartner() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "admin/flat-partner.html"
  };

}

directivesModule.directive('flatAdminPartner', flatAdminPartner);
