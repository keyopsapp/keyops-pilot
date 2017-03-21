'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin([require('./server/validations/validator'), 'bookshelf-camelcase']);

module.exports = {
  bookshelf,
  knex
};
