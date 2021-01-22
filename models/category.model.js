const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
