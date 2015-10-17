
module.exports = function() {

  var RestClientProto = require('node-rest-client').Client;
  var repository = require('../repositories/github.rep')();
  var timeService = require('../services/time.srv')();

  var API_URL_BASE = 'https://status.github.com/api/';

  var client;

  (function initClient() {
    client = new RestClientProto();
    client.registerMethod('getStatus', buildResourceUrl('status.json'), 'GET');
    client.registerMethod('getMessages', buildResourceUrl('messages.json'), 'GET');
  })();

  function createStatusRequest(){
    var reqCreationTime = timeService.now();
    client.methods.getStatus(function(status){
      client.methods.getMessages(function(messages){
        var model = toModel(reqCreationTime, status, messages);
        repository.setCurrentStatus(model);
      }).end();
    }).end();
    return reqCreationTime;
  }

  function getCurrentStatus(){
    return repository.getCurrentStatus();
  }

  function toModel(requestCreationTime, status, messages){
    return {
      status : {
        display : 'Current status',
        values : [status.status]
      },
      availability : {
        display : 'Availability',
        values : toMessagedLabels(messages)
      },
      requestCreationTime : requestCreationTime,
      retrievalTime : timeService.now()
    }
  }

  function toMessagedLabels(messages){
    return messages.map(function(msg){
      return timeService.formatDate(msg['created_on']) + ' : '
        + msg['status'] + ' : '
        + msg['body'];
    });
  }

  function buildResourceUrl(name){
    return API_URL_BASE + name;
  }

  return {
    createStatusRequest : createStatusRequest,
    getCurrentStatus : getCurrentStatus
  };

};
