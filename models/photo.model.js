const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const PhotoSchema = new mongoose.Schema({
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  photo: {
    type: String,
  },
})

const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo
