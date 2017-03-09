'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

router.get('/test', function(req, res, next) {
  res.send('TEST REQUEST IS WORKING...')
});

module.exports = router;
