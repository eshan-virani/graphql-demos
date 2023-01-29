const express = require('express')
const app = express()
const PORT = 3000

const { graphqlHTTP } = require('express-graphql')
const schema = require("./Schema/schema")

app.use(express.json())

app.use('/',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})