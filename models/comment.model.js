const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
    required: true,
  },
  content: {
    type: String,
    maxlength: 600,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
