const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAdmin,
  userById,
} = require('../controllers/user-auth.controller')

const {
  post,
  findUnconfirmed,
  findConfirmed,
  confirmComment,
  deleteComment,
} = require('../controllers/comment.controller')

router.post('/post', post)
router.get('/unconfirmed', findUnconfirmed)
router.get('/confirmed', findConfirmed)
router.post('/confirmcomment/:userId', requireSignin, isAdmin, confirmComment)
router.delete('/deletecomment/:userId', requireSignin, isAdmin, deleteComment)

router.param('userId', userById)
module.exports = router
