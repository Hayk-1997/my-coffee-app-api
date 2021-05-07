const { ProductObjectType } = require('./type.js');
const { RecentProductsQuery, SingleProductQuery, CommentQuery } = require('./query.js');
const { ProductMutation } = require('./mutation');

module.exports = {
  ProductObjectType,
  RecentProductsQuery,
  SingleProductQuery,
  CommentQuery,
  ProductMutation
};

