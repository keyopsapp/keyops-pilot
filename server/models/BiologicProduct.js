const { bookshelf } = require('../../orm');
const Category = require('./BiologicCategory')

const Product = bookshelf.Model.extend({
  tableName: 'boilogic_products',
  hasTimestamps: true,
  category: function() {
    return this.belongsTo(Category, 'category_id');
  }
});

module.exports = Product;
