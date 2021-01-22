const express = require('express')
const router = express.Router()

const {
  post,
  findUnconfirmed,
  findConfirmed,
} = require('../controllers/comment.controller')

router.post('/post', post)
router.get('/unconfirmed', findUnconfirmed)
router.get('/confirmed', findConfirmed)
module.exports = router
