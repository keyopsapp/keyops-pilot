'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const exampleRoutes = require('./example');

router.route('/example')
  .get(exampleRoutes.getExampleResponse)

module.exports = router;
