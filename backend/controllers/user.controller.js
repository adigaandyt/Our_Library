//Holds the logic for routes

const asyncHanlder = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken') //token attached to user to give access to protected routes

//@desc login user
//@route /api/users/register
//@access public
const registerUser = asyncHanlder(async (req, res) => {
  //get info from request

  const { name, email, password } = req.body

  //Check if data exisits
  if (!name || !email || !password) {
    res.status(400).send({ message: 'Missing Info' })
  }

  //Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10) //salt for 10 rounds of hashing
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user, mongo attaches _id
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  //If user create successfully return, ID and name,email
  if (user) {
    res.status(201).json({
      _id: user._id, //_id mongo syntax
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //Generate a signed token
      isAdmin: 'true'
    })
  } else {
    res.status(400).send('user data error')
  }
})

//@desc login user
//@route /api/users
//@access public
const loginUser = asyncHanlder(async (req, res) => {
  //get login data
  const { email, password } = req.body

  //try to find user in database
  const user = await User.findOne({ email })

  //Check if use exists, and if their password matches (wait for hash check to finish)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: 'true',
    })
  } else {
    res.status(400).send('Invalid Credentials')
  }
})

const getMe = asyncHanlder(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user)
})

//Token for new users
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '90d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
