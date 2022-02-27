const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    dafault: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)