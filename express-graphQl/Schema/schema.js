const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = graphql
const { quotes, users } = require('../sampledata')
const querys = require('../querys')
const mutation = require('../mutation')
const { randomInt } = require('crypto')

// Querys for get data 
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // Query without arguments
        usersdata: {
            type: new GraphQLList(querys.usersdata),
            resolve(parent, args) {
                return users
            }
        },
        // Query with arguments
        usersdataParam: {
            type: new GraphQLList(querys.usersdata),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return users.filter(value => value.id == args.id)
            }
        },
    }
})


// Mutation Use for insert Update delete type operation
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: querys.usersdata,
            args: {
                add: { type: mutation.newdatatype }
            },
            async resolve(parent, { add }) {
                const id = randomInt(10)
                const newdata = {
                    id,
                    ...add
                }
                const arrLength = users.push(newdata);
                return users[arrLength - 1];
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })