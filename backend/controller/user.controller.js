const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

//@desc register a new user
//@route /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //save the info from the POST request
  const { name, email, password } = req.body

  //check if the input is correct
  if (!name || !email || !password) {
    res.status(400).send({ message: 'Missing info' })
  }

  //check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).send({ message: 'User already exists' })
  }

  //Hash the pass
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create user
  const user = User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id, //_id mongo syntax
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).send({ message: 'Error while making user ' })
  }
})

//@desc login existin user
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  //get login info
  const { email, password } = req.body
  //find the user
  const user = await User.findOne({ email })
  //Check password hash
  //(if user exists and password matches)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id, //_id mongo syntax
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).send({ message: 'Error logging in' })
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' })
}

//@desc get current user
//@route api/users/login
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
