
module.exports = function() {

  var _ = require('lodash');

  var repository;

  function setCurrentStatus(model){
    repository = {
      latestStatus : model
    };
  }

  function getCurrentStatus(){
    var status = repository && repository.latestStatus;
    if (status){
      return _.clone(status, true);
    }
  }

  return {
    setCurrentStatus : setCurrentStatus,
    getCurrentStatus : getCurrentStatus
  };

};
