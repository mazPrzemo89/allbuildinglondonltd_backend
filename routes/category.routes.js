const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAdmin,
  userById,
} = require('../controllers/user-auth.controller')

const { create, deleteCategory } = require('../controllers/category.controller')

router.post('/create/:userId', userById, requireSignin, isAdmin, create)
router.delete('/deletecategory/:userId', requireSignin, isAdmin, deleteCategory)

router.param('userId', userById)

module.exports = router
