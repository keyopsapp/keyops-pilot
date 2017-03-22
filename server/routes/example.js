'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const Example = require('../models/example');
const example = new Example();
const boom = require('boom');

const getAllExamples = function(req, res, next) {
  Example.forge()
    .fetchAll()
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      return next(err);
    })
};

const getExampleById = function(req, res, next) {
  const { id } = req.params;

  Example.forge().where({ id })
  .fetch({require: true})
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    return next(err);
  })
};

const createExample =  function(req, res, next) {
  const { name } = req.body;

  const newExample = { name };

  Example.forge(example.format(newExample))
  .save()
  .then(response => {
    res.send(example.parse(response.attributes));
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      return next(boom.create(400, err.message));
    }

    return next(err);
  });
};

const updateExample =  function(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;

  const nextExample = { name };

  Example.forge()
  .where('id', id)
  .fetch()
  .then(response => {
    return response.save(example.format(nextExample));
  })
  .then(response => {
    res.send(example.parse(response.attributes));
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      return next(boom.create(400, err.message));
    }

    return next(err);
  });
};

const deleteExample =  function(req, res, next) {
  const { id } = req.params;

  Example.forge().where('id', id)
  .destroy()
  .then(() => {
    res.json({ message: 'Example Sucessfully Deleted' });
  })
  .catch(err => {
    next(err);
  });
};


module.exports = {
  getAllExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample
}
