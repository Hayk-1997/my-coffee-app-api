const { AwesomeSliderQuery } = require('../AwesomeSlider');
const {
  RecentProductsQuery,
  SingleProductQuery
} = require('../Product');
const { OurStoryQuery } = require('../OurStory');
const { InfoQuery } = require('../Info');
const { ServiceQuery } = require('../Service');
const { OurMenuQuery } = require('../OurMenu');
const { StaticCounterQuery } = require('../StaticCounter');

//
const { GetAllUsersQuery, UserMutation } = require('../Auth/index');
const { CartQuery, CartMutation } = require('../Cart');

const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');


const mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    registration: UserMutation.registration,
    login: UserMutation.login,
    verifyUserToken: UserMutation.verifyUserToken,
    addToCart: CartMutation.addToCart,
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      AwesomeSliderQuery: AwesomeSliderQuery,
      RecentProductsQuery: RecentProductsQuery,
      OurStoryQuery: OurStoryQuery,
      InfoQuery: InfoQuery,
      ServiceQuery: ServiceQuery,
      OurMenuQuery: OurMenuQuery,
      StaticCounterQuery: StaticCounterQuery,
      AllUsersQuery: GetAllUsersQuery,
      SingleProductQuery: SingleProductQuery,
      CartQuery: CartQuery,
    }
  }),
  mutation: mutation,
});

module.exports = schema;

