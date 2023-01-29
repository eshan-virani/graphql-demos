const graphql = require('graphql')
const {
    GraphQLString,
    GraphQLNonNull
} = graphql

//mutation for add with input type
const newdatatype = new graphql.GraphQLInputObjectType({
    name: "newdatatype",
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    }
})

module.exports = { newdatatype }