const mongoose = require('mongoose')

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: String,
    review: [
      {
        username: String,
        review: String,
      },
    ],
    img: String,
    desc: String,
  })
)

module.exports = Movie
