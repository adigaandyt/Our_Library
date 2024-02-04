const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const router = require('./routes/user.routes')
const movieRouter = require('./routes/movie.routes')
const cors = require('cors')
const path = require('path');

console.log('Connecting to database...')
connectDB()

//requests will be sent as a urlencoded JSON
const app = express()
app.use(express.static(path.join(__dirname, 'public'))); //Serve static files
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  console.log('main get')
  res.json({ message: 'main get' })
})

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Routes
app.post('/', (req, res) => {
  console.log('main post')
  res.json({ message: 'main post' })
})
app.use('/api/users', router)
app.use('/api/movies', movieRouter)

app.listen(80, () => {
  console.log(`Server Started, Listening to 80`)
})

app.listen(8000, () => {
  console.log(`Server Started, Listening to 8000`)
})
