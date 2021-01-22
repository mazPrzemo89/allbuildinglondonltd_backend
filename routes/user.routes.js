const express = require('express')
const router = express.Router()

const {
  signup,
  signin,
  signout,
  requireSignin,
  isAdmin,
  userById,
  resetPassword,
} = require('../controllers/user-auth.controller')
const { confirmComment } = require('../controllers/comment.controller')
const { userSignupValidator } = require('../validator')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.post('/reset/:userId', requireSignin, isAdmin, resetPassword)
router.post('/confirmcomment/:userId', requireSignin, isAdmin, confirmComment)

//test route
router.get('/hello/:userId', requireSignin, isAdmin, (req, res) => {
  res.send('hello there')
})

router.param('userId', userById)

module.exports = router
