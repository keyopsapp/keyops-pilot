'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const exampleRoutes = require('./example');

router.route('/example')
  .get(exampleRoutes.getAllExamples)
  .post(exampleRoutes.createExample)

router.route('/example/:id')
  .get(exampleRoutes.getExampleById)
  .put(exampleRoutes.updateExample)
  .delete(exampleRoutes.deleteExample)

module.exports = router;
