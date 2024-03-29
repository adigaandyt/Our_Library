const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
  })
)

module.exports = User
