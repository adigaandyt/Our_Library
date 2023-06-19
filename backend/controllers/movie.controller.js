//@desc add a new movie to the list
//@route /api/movies/new
//@access private

const asyncHanlder = require('express-async-handler')
const User = require('../models/user.model')
const Movie = require('../models/movie.model')
const Review = require('../models/review.model')

const addNewMovie = asyncHanlder(async (req, res) => {
  const { title, review, img } = req.body

  const movieExists = await Movie.findOne({ title })

  if (movieExists) {
    res.status(400).send('Movie already exists')
  }

  const movie = await Movie.create({
    title,
    review,
    img,
  })
})

const deleteMovie = asyncHanlder(async (req, res) => {
  const { isadmin, title } = req.body

  if (isadmin) {
    Movie.findOneAndDelete({ title })
  }
})
