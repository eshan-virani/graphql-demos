const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { mongourl, jwtSecretKey, PORT } = require('./config')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Graphql/schema')
const { User } = require('./Models/User')
const { Quote } = require('./Models/Qutos')
const jwt = require('jsonwebtoken')
const cors = require("cors");

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Databse connect successfully.');
});

mongoose.connection.on('error', (err) => {
    console.log('Databse connect Error', err);
});

app.use(express.json())
app.use(cors());

app.use('/',
    //graphql server with HTTP Header allow
    graphqlHTTP((req) => {

        const { auth } = req.headers
        if (auth) {
            console.log(auth);
            var { user_id } = jwt.verify(auth, jwtSecretKey)
        }

        return {
            schema,
            context: {
                user_id
            },
            graphiql: {
                headerEditorEnabled: true
            }
        }
    })
)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})