const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const mongoose = require('mongoose');
const { CategoryObjectType } = require('../Category');
const Product = mongoose.model('Product');

const TypesObjectType = new GraphQLObjectType({
  name: 'types',
  fields: () => ({
    label: { type: GraphQLString },
    price: { type: GraphQLString },
    discount: { type: GraphQLString },
  }),
});

const ProductObjectType = new GraphQLObjectType({
  name:  'Product',
  fields: () => ({
    _id: { type: GraphQLString },
    rate: { type: GraphQLString },
    slug: { type: GraphQLString },
    thumbnail: { type: GraphQLList(GraphQLString) },
    mainThumbnail: {
      type: GraphQLString,
      resolve: (arg) => arg.thumbnail[0]
    },
    categories: {
      type: GraphQLList(CategoryObjectType),
      resolve: () => Product.find().populate('categories'),
    },
    en: {
      type: new GraphQLObjectType({
        name: 'en',
        fields: () => ({
          title: { type: GraphQLString },
          description: { type: GraphQLString },
          types: { type: GraphQLList(TypesObjectType) }
        })
      }) },
    am: {
      type: new GraphQLObjectType({
        name: 'am',
        fields: () => ({
          title: { type: GraphQLString },
          description: { type: GraphQLString },
          types: { type: GraphQLList(TypesObjectType) }
        })
      }) },
  })
});


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


module.exports = {
  ProductObjectType,
  RecentProductsQuery,
  SingleProductQuery
};
