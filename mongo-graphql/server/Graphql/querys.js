const graphql = require("graphql");
const { Quote } = require("../Models/Qutos");
const { User } = require("../Models/User");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

const quotesdata = new GraphQLObjectType({
    name: "quotesdata",
    fields: () => ({
        _id: { type: GraphQLID },
        by: { type: GraphQLID },
        name: { type: GraphQLString },
    }),
});

const quotesdatawithname = new GraphQLObjectType({
    name: "quotesdatawithname",
    fields: () => ({
        _id: { type: GraphQLID },
        by: { type: usersdata },
        name: { type: GraphQLString },
    }),
});

const usersdata = new GraphQLObjectType({
    name: "usersdata",
    fields: () => ({
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        // relational query type and resolve
        quotes: {
            type: new GraphQLList(quotesdata),
            async resolve(parent) {
                return await Quote.find({ by: parent._id })
            },
        },
    }),
});

const token = new GraphQLObjectType({
    name: "token",
    fields: {
        authtoken: { type: GraphQLString }
    }
})

module.exports = { quotesdata, usersdata, token, quotesdatawithname };
