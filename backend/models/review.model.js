const mongoose = require('mongoose')

const Review = mongoose.model(
  'Review',
  new mongoose.Schema({
    movie: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    review: String,
    rating: { type: Number, min: 0, max: 10 },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
)

module.exports = Review
