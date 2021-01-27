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
router.post('/unconfirmed/:userId', requireSignin, isAdmin, findUnconfirmed)
router.get('/confirmed', findConfirmed)
router.post('/confirm/:userId', requireSignin, isAdmin, confirmComment)
router.delete('/delete/:userId', requireSignin, isAdmin, deleteComment)

router.param('userId', userById)
module.exports = router
