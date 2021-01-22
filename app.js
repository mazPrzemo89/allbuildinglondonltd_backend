const express = require('express')
const userRoutes = require('./routes/user.routes')
const mongodb = require('./mongodb/mongodb.connect')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const experssValidator = require('express-validator')
require('dotenv').config()

mongodb.connect()

//middlewares

//to inject json into req.body
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(experssValidator())

//routes
app.use('/user', userRoutes)

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.get('/', (req, res) => {
  res.json('App Server')
})

module.exports = app
