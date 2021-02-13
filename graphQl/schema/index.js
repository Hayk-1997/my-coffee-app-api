// const { makeExecutableSchema } = require('graphql-tools');
// const AwesomeSliderType = require('../AwesomeSlider/type');
// const InfoType = require('../Info/type');
// const OurStoryType = require('../OurStory/type');
// const ServicesType = require('../Services');
// const OurMenuType = require('../OurMenu/type');
// const StaticCounterType = require('../StaticCounter/type');

// const RootQuery = require('../rootQuery/root-query.type');
// const resolvers = require('../resolvers');

const { AwesomeSliderType } = require('../AwesomeSlider');
const { RecentProductsType } = require('../Product');
const { OurStoryObjectType } = require('../OurStory');
const { InfoObjectType } = require('../Info');
const { ServiceObjectType } = require('../Service');
const { OurMenuObjectObjectType } = require('../OurMenu');
const { StaticCounterObjectType } = require('../StaticCounter');

const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      AwesomeSlider: AwesomeSliderType,
      RecentProducts: RecentProductsType,
      OurStory: OurStoryObjectType,
      Info: InfoObjectType,
      Service: ServiceObjectType,
      OurMenu: OurMenuObjectObjectType,
      StaticCounter: StaticCounterObjectType,
    }
  })
});

module.exports = schema;