const { Schema, model } = require('mongoose')

const Quoteschema = new Schema({
    name: {
        type: String,
        required: true
    },
    by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

const Quote = model("Quote", Quoteschema)

module.exports = { Quote }