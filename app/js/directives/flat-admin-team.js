'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');

function flatAdminTeam() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "admin/flat-team.html"
  };

}

directivesModule.directive('flatAdminTeam', flatAdminTeam);
