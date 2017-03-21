'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../../server/server');
const { knex } = require('../../orm');
const supertest = require('supertest');
const DataFunctions = require('./DataFunctions');

suite('Categories Routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('This is a sample test', (done) => {
    supertest(app)
      .get('/api/test')
      .set('Accept', 'application/json')
      .expect(200, {})
      .expect('Content-Type', /json/)
      .end(done);
  });
});
