const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mongoose = require('mongoose');
const OurStory = mongoose.model('OurStory');


const OurStoryObject = new GraphQLObjectType({
  name: 'OurStory',
  fields: {
    _id: { type: GraphQLString },
    en: {
      type: new GraphQLObjectType({
        name: 'enOurStory',
        fields: () => ({
          title: { type: GraphQLString },
          subTitle: { type: GraphQLString },
          description: { type: GraphQLString },
        })
      }) },
    am: {
      type: new GraphQLObjectType({
        name: 'amOurStory',
        fields: () => ({
          title: { type: GraphQLString },
          subTitle: { type: GraphQLString },
          description: { type: GraphQLString },
        })
      }) },
    image: { type: GraphQLString },
  }
});

const OurStoryQuery = {
  type: OurStoryObject,
  resolve () {
    return OurStory.findOne();
  }
};

module.exports = {
  OurStoryQuery
};