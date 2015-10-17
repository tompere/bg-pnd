'use strict';

var express = require('express');
var controller = require('./github.controller');

var router = express.Router();

router.get('/', controller.index);

router.post('/current', controller.createCurrentStatusRequest);

router.get('/current/:id', controller.queryCurrentStatusRequest);

module.exports = router;
