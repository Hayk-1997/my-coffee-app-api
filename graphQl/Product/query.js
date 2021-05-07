const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const { model } = require('mongoose');
const Product = model('Product');
const { ProductObjectType } = require('./type.js');

const RecentProductsQuery = {
  type: GraphQLList(ProductObjectType),
  resolve() {
    return Product.find({ rate: 5 }).limit(4);
  }
};

const SingleProductQuery = {
  type: ProductObjectType,
  args: {
    slug: { type: GraphQLString }
  },
  async resolve(parent, args) {
    return Product.findOne({ slug: args.slug });
  }
};

const CommentQuery = {
  type: ProductObjectType,
  args: {
    _id: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(parent, args) {
    return Product.findOne({ _id: args._id });
  }
};

module.exports = {
  RecentProductsQuery,
  SingleProductQuery,
  CommentQuery,

};