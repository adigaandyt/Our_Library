//Router file, to handle requests and route them
//to the correct logic (in the controller)

const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/user.controller')
const { protect } = require('../middleware/authMiddleware')

//Routes:
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
