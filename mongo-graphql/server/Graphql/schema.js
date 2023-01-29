const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLInt } =
  graphql;
const querys = require("./querys");
const mutation = require("./mutation");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
const { Quote } = require("../Models/Qutos");
const { jwtSecretKey } = require("../config");

// Querys for get data
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // Query without arguments
    usersdata: {
      type: new GraphQLList(querys.usersdata),
      async resolve(parent, args) {
        return await User.find({});
      },
    },
    // Query with arguments
    usersdataParam: {
      type: new GraphQLList(querys.usersdata),
      args: { _id: { type: GraphQLID } },
      async resolve(parent, { _id }) {
        return await User.find({ _id });
      },
    },
    // Query without arguments
    quotesdata: {
      type: new GraphQLList(querys.quotesdatawithname),
      async resolve(parent, args) {
        return await Quote.find({}).populate("by");
      },
    },
  },
});

// Mutation Use for insert Update delete type operation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // new User sign up in mongodb
    SignupUser: {
      type: querys.usersdata,
      args: {
        signupdata: { type: mutation.signup },
      },
      async resolve(parent, { signupdata }) {
        const user = await User.findOne({ email: signupdata.email });
        if (user) {
          return new Error("User already exists with that email");
        } else {
          return User(signupdata).save();
        }
      },
    },
    // new User sign in and return jwt token
    SignIn: {
      type: querys.token,
      args: {
        signindata: { type: mutation.signin },
      },
      async resolve(parent, { signindata }) {
        const user = await User.findOne({ email: signindata.email });
        if (!user) {
          throw new Error("User does not exists with this email");
        }
        if (user.password == signindata.password) {
          const params = {
            user_id: user._id,
            email: user.email,
          };
          const jwttoken = jwt.sign(params, jwtSecretKey, {
            expiresIn: "24h",
          });
          return { authtoken: jwttoken };
        }
      },
    },
    // add New Quote in mongodb
    addQuote: {
      type: querys.quotesdata,
      args: {
        addQuotes: { type: mutation.newquotes },
      },
      async resolve(parent, { addQuotes }, { user_id }) {
        if (!user_id) throw new Error("User not Authorized");
        return Quote({
          name: addQuotes.name,
          by: user_id,
        }).save();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
