const mongoose = require('mongoose')

const Review = mongoose.model(
  'Review',
  new mongoose.Schema({
    movie_id: String,
    review: String,
    rating: { type: Number, min: 0, max: 10 },
    user: String,
  })
)

module.exports = Review
