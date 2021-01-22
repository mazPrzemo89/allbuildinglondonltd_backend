const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAdmin,
  userById,
} = require('../controllers/user-auth.controller')

const { create } = require('../controllers/photo.controller')

router.post('/post/:userId', userById, requireSignin, isAdmin, create)

router.param('userId', userById)

module.exports = router
