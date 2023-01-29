const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { quotes, users } = require('./sampledata')

const typeDefs = gql`
type Query{
    users:[User]
    quotes:[Quots]
}
type User{
    id:ID
    firstName:String
    lastName:String
    email:String
    quotes:[Quots]
}
type Quots{
    name:String
    by:ID
}
`
const resolvers = {
    Query: {
        users: () => users, 
        quotes: () => quotes
    },
    User:{
        quotes:(ur)=>quotes.filter(value=>value.by == ur.id)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(url)
})