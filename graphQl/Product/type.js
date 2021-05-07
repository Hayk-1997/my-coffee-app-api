const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const GraphQLDate = require('graphql-date');
const { model } = require('mongoose');
const Product = model('Product');
const { CommentType } = require('../Comment');
const { CategoryObjectType } = require('../Category');

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
        name: 'product_en',
        fields: () => ({
          title: { type: GraphQLString },
          description: { type: GraphQLString },
          types: { type: GraphQLList(TypesObjectType) }
        })
      }) },
    am: {
      type: new GraphQLObjectType({
        name: 'product_am',
        fields: () => ({
          title: { type: GraphQLString },
          description: { type: GraphQLString },
          types: { type: GraphQLList(TypesObjectType) }
        })
      }) },
    createdAt: { type: GraphQLDate },
    comments: {
      type: GraphQLList(CommentType),
    }
  })
});

module.exports = {
  ProductObjectType,
  TypesObjectType
};

