const { bookshelf } = require('../../orm');

const Category = bookshelf.Model.extend({
  tableName: 'example',
  hasTimestamps: true
});

module.exports = Category;
