//Config used to connect to the database
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Couldn't connect to database`.underline.red)
    console.log(`${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
