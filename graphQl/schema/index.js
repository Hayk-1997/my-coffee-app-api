const { AwesomeSliderQuery } = require('../AwesomeSlider');
const {
  RecentProductsQuery,
  SingleProductQuery,
  ProductMutation,
  CommentQuery
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
    createProductComment: ProductMutation.createComment,
    replyProductComment: ProductMutation.replyComment
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
      CommentQuery: CommentQuery
    }
  }),
  mutation: mutation,
});

module.exports = schema;

