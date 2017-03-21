'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/[YOUR-DEV-DB]',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/[YOUR-TEST-DB]',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};
