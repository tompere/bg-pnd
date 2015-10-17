(function (module) {
  'use strict';
  module.factory('retryService', retryService);

  function retryService($q, $timeout) {

    function retryExecution(func, retries, timeout) {
      return $q.when()
        .then(function(){
          return func();
        })
        .catch(function (error) {
          if (retries <= 0) {
            throw error;
          }
          return $timeout(function(){
            return retryExecution(func, retries - 1, timeout);
          }, timeout);
        });
    }

    return {
      exec : retryExecution
    }

  }
})(angular.module('bgPndBootstapApp'));
