const mongoose = require('mongoose')

const Book = mongoose.model(
  'Book',
  new mongoose.Schema({
    uploader: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    title: String,
    file: { type: Buffer, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
  })
)

module.exports = Book
