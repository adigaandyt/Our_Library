//Router file, to handle requests and route them
//to the correct logic (in the controller)

const express = require('express')
const router = express.Router()
const {
  addMovie,
  addReview,
  deleteMovie,
  deleteReview,
} = require('../controllers/movie.controller')
const { protect } = require('../middleware/auth.middleware.js')

//Routes:
router.post('/new_movie', protect, addMovie)
router.post('/movie/:id', protect, addReview)
router.get('/movie/:id/', protect, deleteMovie)
router.get('/movie/:id/:id', protect, deleteReview)

module.exports = router
