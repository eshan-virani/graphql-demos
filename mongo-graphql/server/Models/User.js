const { Schema, model } = require('mongoose')

const Userschema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = model("User", Userschema)

module.exports = { User }