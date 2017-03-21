'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const Example = require('../models/example');
const boom = require('boom');

const getExampleResponse = function(req, res, next) {
  Example.forge()
    .fetchAll()
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      return next(err);
    })
};

module.exports = {
  getExampleResponse
}
