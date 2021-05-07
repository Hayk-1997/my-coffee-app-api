const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    parentId: { type: GraphQLID },
  })
});


module.exports = {
  CommentType
};