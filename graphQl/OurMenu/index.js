const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mongoose = require('mongoose');
const OurMenu = mongoose.model('OurMenu');

const OurMenuObject = new GraphQLObjectType({
  name: 'OurMenu',
  fields: {
    _id: { type: GraphQLString },
    en: {
      type: new GraphQLObjectType({
        name: 'enOurMenu',
        fields: () => ({
          description: { type: GraphQLString },
          card1 : {
            type: new GraphQLObjectType({
              name: 'card1En',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
          card2 : {
            type: new GraphQLObjectType({
              name: 'card2En',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
          card3 : {
            type: new GraphQLObjectType({
              name: 'card3En',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
          card4 : {
            type: new GraphQLObjectType({
              name: 'card4En',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
        })
      })
    },
    am: {
      type: new GraphQLObjectType({
        name: 'amOurMenu',
        fields: () => ({
          description: { type: GraphQLString },
          card1 : {
            type: new GraphQLObjectType({
              name: 'card1Am',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
          card2 : {
            type: new GraphQLObjectType({
              name: 'card2Am',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
          card3 : {
            type: new GraphQLObjectType({
              name: 'card3Am',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
          card4 : {
            type: new GraphQLObjectType({
              name: 'card4Am',
              fields: {
                description: { type: GraphQLString },
                image: { type: GraphQLString },
              }
            }),
          },
        })
      })
    },
  }
});

const OurMenuObjectObjectType = {
  type: OurMenuObject,
  resolve () {
    return OurMenu.findOne();
  }
};

module.exports = {
  OurMenuObjectObjectType
};