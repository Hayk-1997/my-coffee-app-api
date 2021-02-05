const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mongoose = require('mongoose');
const StaticCounter = mongoose.model('StaticCounter');


const StaticCounterObject = new GraphQLObjectType({
  name: 'StaticCounter',
  fields: {
    _id: { type: GraphQLString },
    coffeeBranches: { type: GraphQLString },
    awards: { type: GraphQLString },
    customers: { type: GraphQLString },
    staffs: { type: GraphQLString },
  }
});

const StaticCounterObjectType = {
  type: StaticCounterObject,
  resolve () {
    return StaticCounter.findOne();
  }
};

module.exports = {
  StaticCounterObjectType
};

// module.exports = `
//   type StaticCounter {
//     coffeeBranches: String!
//     awards: String!
//     customers: String!
//     staffs: String!
//   }
// `;