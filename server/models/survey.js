const { bookshelf } = require('../../orm');

const Survey = bookshelf.Model.extend({
  tableName: 'survey',
  hasTimestamps: true
});

module.exports = Survey;
