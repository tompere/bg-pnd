(function (module) {
  'use strict';
  module.factory('github', githubService);

  function githubService($http, retryService) {

    var URL_PREFIX = '/api/v1/github';

    function updateStatus(){
      return createStatusRequest()
        .then( queryRequest )
        .then( processResult );
    }

    function createStatusRequest(){
      return $http.post(URL_PREFIX + '/current')
        .then(function(response){
          return response.headers('Location');
        }, processError);
    }

    function queryRequest(uri){
      return retryService.exec(function(){
        return queryStatusRequest(URL_PREFIX + uri);
      }, 10, 750);
    }

    function queryStatusRequest(url){
      return $http.get(url)
        .then(function(response){
          if (response.status === 204){
            throw 'retry'; // invoke retry
          }
          return response.data;
        });
    }

    function processError(response){
      return (response && response.data) ? response.data.msg : '';
    }

    function processResult(result){
      return result ? result.content : {};
    }

    return {
      updateStatus : updateStatus
    }

  }
})(angular.module('bgPndBootstapApp'));
