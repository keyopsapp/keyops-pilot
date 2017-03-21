'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const Product = require('../models/BiologicProduct');
const product = new Product();
const boom = require('boom');

const getAllProducts = function(req, res, next) {
  Product.forge()
    .query('orderBy', 'id', 'asc')
    .fetchAll({ withRelated: ['category'] })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      return next(err);
    })
};

module.exports = {
  getAllProducts
}
