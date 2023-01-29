const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } = graphql;

//mutation for add with input type
const signup = new GraphQLInputObjectType({
    name: "signup",
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
});

const signin = new GraphQLInputObjectType({
    name: "signin",
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
});

const newquotes = new GraphQLInputObjectType({
    name: "newquotes",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
    },
});

module.exports = { signup, signin, newquotes };
