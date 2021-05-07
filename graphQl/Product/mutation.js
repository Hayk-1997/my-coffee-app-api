const { GraphQLString, GraphQLNonNull } = require('graphql');
const ProductController = require('../../controllers/Coffee/ProductController');
const { ProductObjectType } = require('./type.js');

const ProductMutation = {
  createComment: {
    type: ProductObjectType,
    args: {
      user: {
        type: GraphQLNonNull(GraphQLString),
      },
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
      comment: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    async resolve(parent, args) {
      return ProductController.createProductComment(args);
    }
  },
  replyComment: {
    type: ProductObjectType,
    args: {
      user: {
        type: GraphQLNonNull(GraphQLString),
      },
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
      comment: {
        type: GraphQLNonNull(GraphQLString),
      },
      commentId: {
        type: GraphQLNonNull(GraphQLString),
      }
    },
    async resolve (parent, args) {
      return ProductController.replyComment(args);
    }
  }
};

module.exports = {
  ProductMutation
};