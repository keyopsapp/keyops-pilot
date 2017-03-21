'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const Category = require('../models/BiologicCategory');
const category = new Category();
const boom = require('boom');

const getAllCategories = function(req, res, next) {
  Category.forge()
  .query('orderBy', 'id', 'asc')
  .fetchAll()
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    return next(err);
  })
};

const getCategory = function(req, res, next) {
  const { id } = req.params;

  Category.forge().where({ id })
  .fetch({require: true})
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    return next(err);
  })
};

const createCategory =  function(req, res, next) {
  const {
    canBeProduct,
    name,
    parentId,
    parentName
  } = req.body;

  const newCategory = {
    canBeProduct,
    name,
    parentId,
    parentName
  };

  Category.forge(category.format(newCategory))
  .save()
  .then(response => {
    res.send(category.parse(response.attributes));
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      return next(boom.create(400, err.message));
    }

    return next(err);
  });
};

const updateCategory =  function(req, res, next) {
  const { id } = req.params;
  const {
    canBeProduct,
    name,
    parentId,
    parentName
  } = req.body;

  const nextCategory = {
    canBeProduct,
    name,
    parentId,
    parentName
  };

  Category.forge()
  .where('id', id)
  .fetch()
  .then(response => {
    return response.save(category.format(nextCategory));
  })
  .then(response => {
    res.send(category.parse(response.attributes));
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      return next(boom.create(400, err.message));
    }

    return next(err);
  });
};

const deleteCategory =  function(req, res, next) {
  const { id } = req.params;

  Category.forge().where('id', id)
  .destroy()
  .then(() => {
    res.json({ message: 'Category Sucessfully Deleted' });
  })
  .catch(err => {
    next(err);
  });
};


module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
