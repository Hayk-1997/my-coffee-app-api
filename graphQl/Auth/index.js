const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const { validator, validate } = require('@wiicamp/graphql-validation'); // Import module
const authMiddleware = require('../../middlewares/Coffee/Auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const AuthController = require('../../controllers/Coffee/AuthController');

const UserObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const GetAllUsersQuery = {
  type: GraphQLList(UserObjectType),
  async resolve() {
    return await User.find({});
  }
};

// TODO need to improve fields validation!
const UserMutation = {
  registration: {
    type: UserObjectType,
    args: {
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      confirmPassword: {
        type: GraphQLNonNull(GraphQLString),
      },
      firstName: {
        type: GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
      phoneNumber: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    async resolve (parent, args) {
      try {
        return await AuthController.register(args);
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  login: {
    type: UserObjectType,
    args: {
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    async resolve (parent, args) {
      return await AuthController.login(args);
    }
  },
  verifyUserToken: {
    type: UserObjectType,
    async resolve (parent, args, req) {
      return await User.findByToken({ token: req.headers.authorization });
    }
  },
};

module.exports = {
  GetAllUsersQuery,
  UserMutation
};
