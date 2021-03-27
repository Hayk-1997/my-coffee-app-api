const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mongoose = require('mongoose');
const Info = mongoose.model('Info');

const icon = {
  type: new GraphQLObjectType({
    name: 'icon',
    fields: () => ({
      item: {
        type: new GraphQLObjectType({
          name: 'iconInfo',
          fields: {
            download_url: { type: GraphQLString },
            format: { type: GraphQLString },
            preview_url: { type: GraphQLString },
          }
        })
      },
      size: { type: GraphQLString },
      tags: { type: GraphQLString },
    })
  })
};

const address = {
  type: new GraphQLObjectType({
    name: 'address',
    fields: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: icon,
    }
  })
};

const workingHours = {
  type: new GraphQLObjectType({
    name: 'workingHours',
    fields: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: icon,
    }
  })
};


const phone = {
  type: new GraphQLObjectType({
    name: 'phone',
    fields: () => ({
      number: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: icon,
    })
  })
};

const InfoObject = new GraphQLObjectType({
  name: 'Info',
  fields: {
    _id: { type: GraphQLString },
    en: {
      type: new GraphQLObjectType({
        name: 'enInfo',
        fields: () => ({
          phone: phone,
          address: address,
          workingHours: workingHours
        })
      })
    },
    am: {
      type: new GraphQLObjectType({
        name: 'amInfo',
        fields: () => ({
          phone: phone,
          address: address,
          workingHours: workingHours
        })
      })
    },
  }
});

const InfoQuery = {
  type: InfoObject,
  resolve () {
    return Info.findOne();
  }
};

module.exports = {
  InfoQuery
};