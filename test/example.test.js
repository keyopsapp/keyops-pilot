'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../server/server');
const { knex } = require('../orm');
const supertest = require('supertest');

suite('Example Test', () => {
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

  test('This example test returns to correct data', (done) => {
    supertest(app)
      .get('/api/example')
      .set('Accept', 'application/json')
      .expect(res => {
        for (const item of res.body) {
          delete item.createdAt;
          delete item.updatedAt;
        }
      })
      .expect(200, [
        { id: 1, name: 'example1' },
        { id: 2, name: 'example2' },
        { id: 3, name: 'example3' }
      ])
      .expect('Content-Type', /json/)
      .end(done);
  });
});
