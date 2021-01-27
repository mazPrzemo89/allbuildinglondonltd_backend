const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const btoa = require('btoa')
const Photo = require('../models/photo.model')

exports.createPhoto = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    let photoUpload = new Photo(fields)
    if (!fields.category) {
      return res.status(400).json({
        error: 'Please select category.',
      })
    }

    if (!files.photo) {
      return res.status(400).json({
        error: 'Please select a file to upload',
      })
    }
    if (files.photo.size > 8000000) {
      return res.status(400).json('Image size must be less than 8Mb')
    }
    let photoBuffer = fs.readFileSync(files.photo.path)
    let photoType = files.photo.type
    photoUpload.photo = `data:${photoType};base64,${btoa(photoBuffer)}`

    photoUpload.save((err, result) => {
      console.log('this one')
      if (err) {
        return res.status(400).json(err)
      }
      return res.status(201).json('Photo added')
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

exports.photoByCategoryId = async (req, res) => {
  let photos = await Photo.find({ category: req.body.category })
  if (!photos) {
    return res.status(500).json('Server error')
  }
  if (photos.length === 0) {
    return res.status(200).json([])
  }
  res.status(200).json(photos)
}
