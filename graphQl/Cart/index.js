const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const { ProductObjectType } = require('../Product');
const CartController = require('../../controllers/Coffee/CartController');

const TypeInput = new GraphQLInputObjectType({
  name: 'TypeInput',
  fields: () => ({
    label: { type: GraphQLString },
    price: { type: GraphQLString },
    discount: { type: GraphQLString },
  })
});

const CartObjectType = new GraphQLObjectType({
  name: 'Cart',
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLString },
    product: { type: ProductObjectType },
    quantity: { type: GraphQLString },
    type: { type: TypeObjectType },
  })
});

const CartQuery = {
  type: GraphQLList(CartObjectType),
  args: {
    user: { type: GraphQLString }
  },
  resolve(parent, args) {
    return Cart.find({ user: args.user }).populate({ path: 'product' });
  }
};

const TypeObjectType = new GraphQLObjectType({
  name: 'type',
  fields: () => ({
    label: { type: GraphQLString },
    price: { type: GraphQLString },
    discount: { type: GraphQLString },
  })
});

const CartMutation = {
  addToCart: {
    type: CartObjectType,
    args: {
      user: {
        type: GraphQLNonNull(GraphQLString),
      },
      product: {
        type: GraphQLNonNull(GraphQLString),
      },
      quantity: {
        type: GraphQLNonNull(GraphQLInt),
      },
      type: {
        type: GraphQLNonNull(TypeInput),
      }
    },
    async resolve (parent, args) {
      return CartController.store(args);
    }
  }
};

module.exports = {
  CartQuery,
  CartMutation
};