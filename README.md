# React, MobX, React-Router 4, Webpack 2, Express, Knex, Bookshelf, PostgreSQL, Heroku Boilerplate

This is a personal React Boilerplate this I use to help me get my projects up and running quickly. It was forked from [mhaagens React Boilerplate](https://github.com/mhaagens/react-mobx-react-router4-boilerplate).
I added Express, Knex, Bookshelf, PostgreSQL, Mocha and Chai, and a fully working server with example routes, migrations, seeds, models, and tests.

If you don't need a backend for your project, I suggest using mhaagens original starter.

### Getting Started 

- Fork and clone the repo.
- Install dependancies with npm or yarn. (yarn is much faster!).
  - `npm install` or `yarn install`
- To create a local database for your project, run `initdb pg`.
- Start a database server with `Postgres -D pg`.
- Create two databases. These will be used for the example routes, models, and tests.
  - `createdb example_dev`
  - `createdb example_test`
- I've created shortcut scripts for migrating and seeding the database. Run them.
  - `npm run migrate:latest`
  - `npm run migrate:latest:test`
  - `npm run seed`
  - `npm run seed:test`
- To run the example test, run `npm test`.
- To start the express server for development, run `npm run start:dev`.
  - When in development, the project uses WebpackDevServer and hot reloading.
  - The WebpackDevServer will be running on port 3000.
  - The express server will be running on port 8000.
  - `/api` routes will be proxied to the express server. All other routes will be served by the WebpackDevServer.
- Go to `http://localhost:3000` to start developing.
