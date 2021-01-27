const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAdmin,
  userById,
} = require('../controllers/user-auth.controller')

const {
  create,
  deleteCategory,
  getCategoryIds,
  getCategories,
  createCategory,
} = require('../controllers/category.controller')

router.post('/create/:userId', userById, requireSignin, isAdmin, create)
router.post(
  '/createnew/:userId',
  userById,
  requireSignin,
  isAdmin,
  createCategory,
)
router.delete('/delete/:userId', requireSignin, isAdmin, deleteCategory)
router.get('/find', getCategoryIds)
router.get('/getall', getCategories)

router.param('userId', userById)

module.exports = router
