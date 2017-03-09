'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const models = require('../models/index');

router.get('/test/:id', function(req, res, next) {
  models.Message.find({
    where: {
      id: req.params.id
    }
  }).then(function(message) {
    res.json(message);
  })
  .catch(err => {
    next();
  });
});

module.exports = router;
