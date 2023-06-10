const mongoose = require('mongoose')

const Book = mongoose.model(
  'Book',
  new mongoose.Schema({
    uploader: String,
    title: String,
  })
)

module.exports = Book
