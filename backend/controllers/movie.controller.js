//@desc add a new movie to the list
//@route /api/movies/new
//@access private

const asyncHanlder = require('express-async-handler')
const User = require('../models/user.model')
const Movie = require('../models/movie.model')
const Review = require('../models/review.model')

//@desc add a new movie to database
//@route /api/movies/new_movie
//@access private
const addMovie = asyncHanlder(async (req, res) => {
  const { title, review, img, desc } = req.body

  const movieExists = await Movie.findOne({ title })

  if (movieExists) {
    res.status(400).send('Movie already exists')
  } else {
    res.status(201).send('New Movie Added')
    const movie = await Movie.create({
      title,
      review,
      img,
      desc,
    })
  }
})

const deleteMovie = asyncHanlder(async (req, res) => {
  const { isadmin, title } = req.body

  if (isadmin) {
    Movie.findOneAndDelete({ title })
  }
})

const deleteReview = asyncHanlder(async (req, res) => {
  const { isadmin, title } = req.body

  if (isadmin) {
    Movie.findOneAndDelete({ title })
  }
})

const addReview = asyncHanlder(async (req, res) => {
  const { isadmin, title } = req.body

  if (isadmin) {
    Movie.findOneAndDelete({ title })
  }
})

//@desc return all the movies in the database
//@route /api/movies/
//@access Public
const getMovies = asyncHanlder(async (req, res) => {
  const movies = await Movie.find()
  res.send(movies)
})

const getReviews = asyncHanlder(async (req, res) => {})

module.exports = {
  addMovie,
  addReview,
  deleteMovie,
  deleteReview,
  getMovies,
  getReviews,
}
