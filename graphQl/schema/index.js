// const { makeExecutableSchema } = require('graphql-tools');

const { AwesomeSliderType } = require('../AwesomeSlider');
const { RecentProductsType } = require('../Product');
const { OurStoryObjectType } = require('../OurStory');
const { InfoObjectType } = require('../Info');
const { ServiceObjectType } = require('../Service');
const { OurMenuObjectObjectType } = require('../OurMenu');
const { StaticCounterObjectType } = require('../StaticCounter');

//
const { GetAllUsersType, UserMutation } = require('../Auth/index');

const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');


const mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    // addTodo: addTodoMutation.addTodo,
    registration: UserMutation.registration,
    login: UserMutation.login,
    verifyUserToken: UserMutation.verifyUserToken,
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      AwesomeSliderQuery: AwesomeSliderType,
      RecentProductsQuery: RecentProductsType,
      OurStoryQuery: OurStoryObjectType,
      InfoQuery: InfoObjectType,
      ServiceQuery: ServiceObjectType,
      OurMenuQuery: OurMenuObjectObjectType,
      StaticCounterQuery: StaticCounterObjectType,
      AllUsersQuery: GetAllUsersType,
    }
  }),
  mutation: mutation,
});

module.exports = schema;

