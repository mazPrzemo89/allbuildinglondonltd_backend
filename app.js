const express = require('express')
const userRoutes = require('./routes/user.routes')
const categoryRoutes = require('./routes/category.routes')
const photoRoutes = require('./routes/photo.routes')
const commentRoutes = require('./routes/comment.routes')
const emailRoute = require('./routes/email.route')
const mongodb = require('./mongodb/mongodb.connect')
//const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const experssValidator = require('express-validator')
const cors = require('cors')
require('dotenv').config()

mongodb.connect()

//middlewares

app.use(express.json())
//app.use(morgan('dev'))
app.use(cookieParser())
app.use(experssValidator())
app.use(cors())

//routes
app.use('/category', categoryRoutes)
app.use('/user', userRoutes)
app.use('/photo', photoRoutes)
app.use('/comment', commentRoutes)
app.use('/email', emailRoute)

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.get('/', (req, res) => {
  res.json('App Server')
})

module.exports = app
