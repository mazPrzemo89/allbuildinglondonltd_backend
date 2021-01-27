const fs = require('fs')
const formidable = require('formidable')
const _ = require('lodash')
const Category = require('../models/category.model')
const Photo = require('../models/photo.model')

exports.createCategory = (req, res) => {
  console.log(req.body)
  let category = new Category()
  category.name = req.body.name

  category.save((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.status(201).json(result)
  })
}

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
    if (!files.image) {
      return res.status(400).json({
        error: 'Please add Image',
      })
    }
    if (files.image.size > 8000000) {
      return res.status(400).json('Image size must be less than 8Mb')
    }
    category.image.data = fs.readFileSync(files.image.path)
    category.image.contentType = files.image.type

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

exports.getCategoryIds = (req, res) => {
  var query = Category.find({}).select('_id name')

  query.exec((err, data) => {
    if (err) return next(err)
    res.status(200).json(data)
  })
}

exports.getCategories = (req, res) => {
  Category.find((err, data) => {
    if (err) return next(err)
    res.status(200).json(data)
  })
}
