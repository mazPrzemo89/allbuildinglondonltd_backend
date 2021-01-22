const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const crypto = require('crypto')

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    user.salt = undefined
    user.hashed_password = undefined
    return res.status(201).json(user).send()
  } catch (err) {
    next(err)
  }
}

exports.signin = (req, res, next) => {
  try {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: "User dosen't exist",
        })
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password dosen't match",
        })
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

      res.cookie('allBuildingToken', token, { expire: new Date() + 9999 })

      const { _id, email } = user
      return res.json({ token, user: { _id, email } })
    })
  } catch (err) {
    next(err)
  }
}

exports.signout = (req, res, next) => {
  try {
    res.clearCookie('allBuildingToken')
    return res.json({ message: 'Signed out' })
  } catch (err) {
    next(err)
  }
}

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      })
    }
    req.profile = user
    next()
  })
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
})

// exports.isAuth = (req, res, next) => {
//   let user = req.profile && req.auth && req.profile._id == req.auth.id
//   if (!user) {
//     return res.status(403).json({ error: 'Unauthorized' })
//   }

//   next()
// }

exports.isAdmin = (req, res, next) => {
  if (req.profile.email != 'email@email.com') {
    return res.status(403).json({ error: 'Not Admin!' }).send()
  } else {
    next()
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body
    let salt
    await User.findOne({ email }, (err, user) => {
      salt = user.salt
    })

    let updated_password = crypto
      .createHmac('sha1', salt)
      .update(newPassword)
      .digest('hex')

    const update = { hashed_password: updated_password }

    await User.findOneAndUpdate({ email: email }, update, {
      returnOriginal: false,
      useFindAndModify: false,
    })

    res.status(200).json('Password changed')
  } catch (err) {
    next(err)
  }
}
