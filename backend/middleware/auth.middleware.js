//protect function used to protect routes
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const colors = require('colors')

const protect = asyncHandler(async (req, res, next) => {
  //const { authorization } = req.body

  let token
  if (
    //Check if the given token exists and starts with bearer(JSON web token should)
    req.body.auth &&
    req.body.auth.startsWith('Bearer ')
  ) {
    try {
      const auth = req.body.auth.toString() //grab the whole auth
      token = auth.split(' ')[1] //grab the token part (remove bearer)
      const decoded = jwt.verify(token, process.env.JWT_KEY) //verify the token

      //Set the requester to the user in the token
      req.user = await User.findById(decoded.id).select('-password')

      next() //req info gets moved
    } catch (error) {
      console.log('Authorization Error')
      res.status(401).send({ message: 'Error Authorizing' })
    }
  }
  if (!token) {
    console.log('denied')
    res.status(401).send({ message: 'Not Authorized' })
  }
})

module.exports = { protect }
