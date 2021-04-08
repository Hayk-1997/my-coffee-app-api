const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const mongoose = require('mongoose');
const ProductModel = mongoose.model('Product');


const TypesObjectType = new GraphQLObjectType({
  name: 'types',
  fields: () => ({
    label: { type: GraphQLString },
    price: { type: GraphQLString },
    discount: { type: GraphQLString },
  }),
});

const Product = new GraphQLObjectType({
  name:  'Product',
  fields: () => ({
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    rate: { type: GraphQLString },
    discount: { type: GraphQLString },
    slug: { type: GraphQLString },
    thumbnail: { type: GraphQLList(GraphQLString) },
    mainThumbnail: {
      type: GraphQLString,
      resolve: (arg) => arg.thumbnail[0]
    },
    categories: { type: GraphQLList(GraphQLString) },
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
  type: GraphQLList(Product),
  resolve() {
    return ProductModel.find({ rate: 5 }).limit(4);
  }
};

const SingleProductQuery = {
  type: Product,
  args: {
    slug: { type: GraphQLString }
  },
  async resolve(parent, args) {
    return ProductModel.findOne({ slug: args.slug });
  }
};


module.exports = {
  Product,
  RecentProductsQuery,
  SingleProductQuery
};
