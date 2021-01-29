const Comment = require('../models/comment.model')

exports.post = (req, res) => {
  let comment = new Comment()
  comment.rating = req.body.rating
  comment.name = req.body.name
  comment.content = req.body.content
  comment.confirmed = false

  comment.save((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.status(201).json(result)
  })
}

exports.findUnconfirmed = async (req, res) => {
  let comments = await Comment.find({ confirmed: false })
  if (comments.length === 0) {
    return res.status(200).json([])
  }
  res.status(200).json(comments)
}

exports.findConfirmed = async (req, res) => {
  let comments = await Comment.find({ confirmed: true })
  if (comments.length === 0) {
    return res.status(200).json([])
  } else {
  }
  res.status(200).json(comments)
}

exports.confirmComment = async (req, res) => {
  let comment = await Comment.findById(req.body.id)
  comment.confirmed = true
  comment.save((err, result) => {
    if (err) {
      return res.status(400).json(err)
    }
    return res.status(200).json(result)
  })
}

exports.deleteComment = (req, res) => {
  Comment.findByIdAndRemove(
    req.body.id,
    {
      useFindAndModify: false,
    },
    (err, result) => {
      if (err) {
        return res.status(400).json('Comment could not be deleted')
      }
      return res.status(200).json(result)
    },
  )
}
