const express = require('express')
const authController = require('../controllers/auth-controller')

const router = express.Router()

router.post('/register', authController.createUser)
router.post('/login', authController.authenticateUser)
router.delete('/delete', authController.deleteUser)

module.exports = router
