const mongoose = require('mongoose')

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: String,
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    img: String,
  })
)

module.exports = Movie
