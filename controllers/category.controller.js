const fs = require('fs')
const formidable = require('formidable')
const _ = require('lodash')
const Category = require('../models/category.model')

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    let category = new Category(fields)
    if (!files.photo) {
      return res.status(400).json({
        error: 'Please add Image',
      })
    }
    if (files.image.size > 8000000) {
      return res.status(400).json('Image size must be less than 8Mb')
    }
    category.photo.data = fs.readFileSync(files.photo.path)
    category.photo.contentType = files.photo.type

    category.save((err, result) => {
      if (err) {
        return res.status(400).json(err)
      }
      return res.json(result)
    })
  })
}
