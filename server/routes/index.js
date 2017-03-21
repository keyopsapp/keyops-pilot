'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const biologicCategories = require('./biologicCategories');
const biologicProducts = require('./biologicProducts');

router.route('/categories/biologic')
  .get(biologicCategories.getAllCategories)
  .post(biologicCategories.createCategory);

router.route('/categories/biologic/:id')
  .get(biologicCategories.getCategory)
  .put(biologicCategories.updateCategory);
  // .delete(biologicProducts.deleteCategory);

router.route('/products/biologic')
  .get(biologicProducts.getAllProducts);

module.exports = router;
