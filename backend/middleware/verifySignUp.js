const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const auth = req.headers.authorization.toString()
      token = auth.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('error authorizing')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }
