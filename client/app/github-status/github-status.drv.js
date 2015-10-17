(function (module) {
  'use strict';
  module.directive('githubStatus', githubStatus);

  function githubStatus() {
    return {
      scope: {},
      restrict: 'E',
      controller: 'githubStatusCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/github-status/github-status.tpl.html'
    };
  }
})(angular.module('bgPndBootstapApp'));
