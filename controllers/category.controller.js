const fs = require('fs')
const formidable = require('formidable')
const _ = require('lodash')
const Category = require('../models/category.model')
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
    let category = new Category(fields)
    if (!files.photo) {
      return res.status(400).json({
        error: 'Please add Image',
      })
    }
    if (files.photo.size > 8000000) {
      return res.status(400).json('Image size must be less than 8Mb')
    }
    category.photo.data = fs.readFileSync(files.photo.path)
    category.photo.contentType = files.photo.type

    category.save((err, result) => {
      if (err) {
        return res.status(400).json(err)
      }
      return res.json('Category created')
    })
  })
}

exports.deleteCategory = async (req, res) => {
  Category.findByIdAndRemove(
    req.body.id,
    {
      useFindAndModify: false,
    },
    async (err, result) => {
      if (err) {
        return res.status(400).json('Category could not be deleted')
      } else if (!result) {
        return res.status(404).json('Category could not be found')
      }

      await Photo.deleteMany(
        { category: req.body.id },
        {
          useFindAndModify: false,
        },
      )

      return res.status(200).json('Category Deleted')
    },
  )
}
