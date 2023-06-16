//Holds the logic for routes

const asyncHanlder = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken') //token attached to user to give access to protected routes

//@desc login user
//@route /api/users
//@access public
const registerUser = asyncHanlder(async (req, res) => {
  //get info from request

  /*
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).send({ message: 'Missing Info' })
  }

  const salt = bcrypt.genSalt(10) //salt for 10 rounds of hashing
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  */
  console.log('Register route')
  res.json({ message: 'Register route' })
})

const loginUser = asyncHanlder(async (req, res) => {
  res.json({ message: 'login route' })
  console.log('Login route')
})

const getMe = asyncHanlder(async (req, res) => {
  res.json({ message: 'getme route' })
  console.log('get me route')
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
