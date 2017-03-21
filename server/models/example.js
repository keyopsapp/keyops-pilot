const { bookshelf } = require('../../orm');

const Example = bookshelf.Model.extend({
  tableName: 'example',
  hasTimestamps: true
});

module.exports = Example;
