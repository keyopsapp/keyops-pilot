const { bookshelf } = require('../../orm');
const validations = require('../validations/biologicCategories');

const Category = bookshelf.Model.extend({
  tableName: 'biologic_categories',
  hasTimestamps: true,
  schema: validations
});

module.exports = Category;
