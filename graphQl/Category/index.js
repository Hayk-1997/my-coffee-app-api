const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const CategoryObjectType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    _id: { type: GraphQLString },
    en: {
      type: new GraphQLObjectType({
        name: 'category_en',
        fields: () => ({
          title: { type: GraphQLString },
          description: { type: GraphQLString },
        })
      }) },
    am: {
      type: new GraphQLObjectType({
        name: 'category_am',
        fields: () => ({
          title: { type: GraphQLString },
          description: { type: GraphQLString },
        })
      }) },
  })
});

const CategoriesQuery = {
  type: GraphQLList(CategoryObjectType),
  resolve() {
    return Category.find();
  }
};

module.exports = {
  CategoryObjectType,
  CategoriesQuery
};
