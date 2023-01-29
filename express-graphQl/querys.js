const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const { quotes } = require("./sampledata");

const quotesdata = new GraphQLObjectType({
    name: "quotesdata",
    fields: {
        by: { type: GraphQLInt },
        name: { type: GraphQLString },
    },
});

const usersdata = new GraphQLObjectType({
    name: "usersdata",
    fields: {
        id: { type: GraphQLInt },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        // relational query type and resolve
        quotes: {
            type: new GraphQLList(quotesdata),
            resolve(parent) {
                return quotes.filter((value) => value.by == parent.id);
            },
        },
    },
});

module.exports = { quotesdata, usersdata };
