const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    updateAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Photo', userSchema)