const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mongoose = require('mongoose');
const AwesomeSlider = mongoose.model('AwesomeSlider');

const AwesomeSliderObjectType = new GraphQLObjectType({
  name: 'AwesomeSlider',
  fields: {
    _id: { type: GraphQLString },
    image: { type: GraphQLString },
    en: {
      type: new GraphQLObjectType({
        name: 'enAwesomeSlider', /// TODO review GraphQLObjectType name !!
        fields: {
          title: { type: GraphQLString },
          description: { type: GraphQLString },
        }
      }) },
    am: {
      type: new GraphQLObjectType({
        name: 'amAwesomeSlider', /// TODO review GraphQLObjectType name !!
        fields: {
          title: { type: GraphQLString },
          description: { type: GraphQLString },
        }
      }) }
  }
});

const AwesomeSliderType = {
  type: AwesomeSliderObjectType,
  resolve() {
    return AwesomeSlider.findOne();
  },
};

module.exports = {
  AwesomeSliderType
};