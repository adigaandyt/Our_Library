const mongoose = require('mongoose')

const Review = mongoose.model(
  'Review',
  new mongoose.Schema({
    review: String,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
)

module.exports = Movie
