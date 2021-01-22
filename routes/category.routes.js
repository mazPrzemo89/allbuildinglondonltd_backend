const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAdmin,
  userById,
} = require('../controllers/user-auth.controller')

const { create } = require('../controllers/category.controller')

router.post('/create/:userId', userById, requireSignin, isAdmin, create)

router.param('userId', userById)

module.exports = router
