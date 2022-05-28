const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
    title: {
        type: String
    },
    yearRelease: {
        type: String
    },
    cast: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
})