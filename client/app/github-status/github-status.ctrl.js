(function (module) {
  'use strict';
  module.controller('githubStatusCtrl', githubStatusCtrl);

  function githubStatusCtrl(github) {

    var vm = this;

    vm.refresh = refresh;
    vm.data = null;

    init();

    function init(){
      updateStatus();
    }

    function updateStatus() {
      github.updateStatus()
        .then(function(data) {
          vm.data = data;
        });
    }

    function refresh(){
      updateStatus();
      vm.data = null;
    }

  }
})(angular.module('bgPndBootstapApp'));
