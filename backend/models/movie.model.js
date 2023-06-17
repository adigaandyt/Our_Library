const mongoose = require('mongoose')

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: String,
    email: String,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    img: {
      data: Buffer,
      contentType: String,
    },
  })
)

module.exports = Movie