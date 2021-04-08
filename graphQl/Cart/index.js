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
const { Product } = require('../Product');


const TypeObjectType = new GraphQLObjectType({
  name: 'type',
  fields: () => ({
    label: { type: GraphQLString },
    price: { type: GraphQLString },
    discount: { type: GraphQLString },
  })
});

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
    product: {
      name: 'CartProduct',
      type: Product,
    },
    quantity: { type: GraphQLString },
    type: { type: TypeObjectType },
  })
});


const CartQuery = {
  type: GraphQLList(CartObjectType),
  args: {
    user: { type: GraphQLString }
  },
  async resolve(parent, args) {
    return await Cart.find({ user: args.user });
  }
};

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
    async resolve(parent, args) {
      return Cart.create({ ...args });
    }
  }
};

module.exports = {
  CartQuery,
  CartMutation
};