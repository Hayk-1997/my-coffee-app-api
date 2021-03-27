const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mongoose = require('mongoose');
const Service = mongoose.model('Service');

const icon = {
  type: new GraphQLObjectType({
    name: 'iconService',
    fields: () => ({
      item: {
        type: new GraphQLObjectType({
          name: 'itemService',
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

const box1 = {
  type: new GraphQLObjectType({
    name: 'box1',
    fields: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: icon,
    }
  })
};

const box2 = {
  type: new GraphQLObjectType({
    name: 'box2',
    fields: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: icon,
    }
  })
};

const box3 = {
  type: new GraphQLObjectType({
    name: 'box3',
    fields: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      icon: icon,
    }
  })
};


const ServiceObject = new GraphQLObjectType({
  name: 'Service',
  fields: {
    _id: { type: GraphQLString },
    en: {
      type: new GraphQLObjectType({
        name: 'enService',
        fields: () => ({
          box1: box1,
          box2: box2,
          box3: box3
        })
      })
    },
    am: {
      type: new GraphQLObjectType({
        name: 'amService',
        fields: () => ({
          box1: box1,
          box2: box2,
          box3: box3
        })
      })
    },
  }
});

const ServiceQuery = {
  type: ServiceObject,
  resolve () {
    return Service.findOne();
  }
};

module.exports = {
  ServiceQuery
};