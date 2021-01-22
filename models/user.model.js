const mongoose = require('mongoose')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
})

// virtual field
UserSchema.virtual('password')
  .set(function (password) {
    this._passowrd = password
    this.salt = uuidv4()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._passowrd
  })

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
}

const User = mongoose.model('User', UserSchema)

module.exports = User
