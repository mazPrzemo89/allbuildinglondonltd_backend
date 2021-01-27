const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAdmin,
  userById,
} = require('../controllers/user-auth.controller')

const {
  createPhoto,
  deletePhoto,
  photoByCategoryId,
} = require('../controllers/photo.controller')

router.post('/post/:userId', userById, requireSignin, isAdmin, createPhoto)
router.delete('/delete/:userId', requireSignin, isAdmin, deletePhoto)
router.post('/get', photoByCategoryId)

router.param('userId', userById)

module.exports = router
