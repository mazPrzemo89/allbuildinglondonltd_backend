const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Photo = require('../models/photo.model')

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    let photo = new Photo(fields)
    if (!files.image) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    if (files.image.size > 8000000) {
      return res.status(400).json('Image size must be less than 8Mb')
    }
    photo.image.data = fs.readFileSync(files.image.path)
    photo.image.contentType = files.image.type

    photo.save((err, result) => {
      if (err) {
        return res.status(400).json(err)
      }
      return res.json.status(201)('Photo added')
    })
  })
}

exports.deletePhoto = (req, res) => {
  Photo.findByIdAndRemove(
    req.body.id,
    {
      useFindAndModify: false,
    },
    (err, result) => {
      if (err) {
        return res.status(400).json('Photo could not be deleted')
      }
      return res.status(200).json('Photo deleted')
    },
  )
}
