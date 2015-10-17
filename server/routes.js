/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

var API_VERSION_ROOT = 'v1';

module.exports = function(app) {

  /**
   * REST API top-level resources
   */

  setResource('github');

  /**
   * Generic 404
   */
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  /**
   * others redirect
   */
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  function setResource(resource, resourcePath){
    var path = resourcePath || './api/' + resource;
    app.use(buildPath(resource), require(path));
  }

  function buildPath(resource){
    return '/api/' + API_VERSION_ROOT + '/' + resource + '/';
  }

};
