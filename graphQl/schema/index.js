const { makeExecutableSchema } = require('graphql-tools');
const AwesomeSliderType = require('../AwesomeSlider/type');
const InfoType = require('../Info/type');
const OurStoryType = require('../OurStory/type');
const ServicesType = require('../Services/type');
const OurMenuType = require('../OurMenu/type');

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
    OurStoryType,
    ServicesType,
    OurMenuType,
  ],
  // performs field lookups for a specific type
  resolvers
});

module.exports = schema;