'use strict';

var githubService = require('../../components/services/github.srv')();
var timeService = require('../../components/services/time.srv')();
var _ = require('lodash');

exports.index = function(req, res) {
  setResponse(res, [{
    message: 'active',
    statusCode: 1
  }]);
};

exports.createCurrentStatusRequest = function(req, res) {
  var id = githubService.createStatusRequest();
  res.status(202);
  res.location('/current/' + id);
  setResponse(res);
};

exports.queryCurrentStatusRequest = function(req, res) {

  var body = {},
      id = req.params.id,
      status = githubService.getCurrentStatus();

  if (isRequestValid(id)){
    res.status(410);
    body.msg = 'request is out-of-date and permanently unavailable, ' +
      'please re-issue an new status request';
  } else if (isStatusAvailable(id, status)){
    body.content = toDto(status);
  } else {
    res.status(204);
  }

  setResponse(res, body);

  /* local functions */

  function isRequestValid(id) {
    return id + 60000 <= timeService.now();
  }

  function isStatusAvailable(id, status) {
    return status && id <= normalizeCreationTime(status.requestCreationTime);
  }

  function normalizeCreationTime(time){
    return time || 0;
  }

  function toDto(model){
    return {
      status : model.status,
      availability : model.availability
    };
  }

};

// should be a cross-app util
function setResponse(res, data){
  res.json(data);
}
