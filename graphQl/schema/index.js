const { makeExecutableSchema } = require('graphql-tools');
const AwesomeSliderType = require('../AwesomeSlider/type');
const InfoType = require('../Info/type');
const OurHistoryType = require('../OurHistory/type');
const RootQuery = require('../rootQuery/root-query.type');
const resolvers = require('../resolvers');

const SchemaDefinition = `
  schema {
    query: RootQuery,
  }
`;

const schema = makeExecutableSchema({
  // Add the type definitions to the schema
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    AwesomeSliderType,
    InfoType,
    OurHistoryType
  ],
  // performs field lookups for a specific type
  resolvers
});

module.exports = schema;