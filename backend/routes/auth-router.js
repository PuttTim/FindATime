const express = require('express')
const authController = require('../controllers/auth-controller')

const router = express.Router()

router.get('/user/:username', authController.getUserById)
router.post('/register', authController.createUser)
router.post('/login', authController.authenticateUser)
router.delete('/delete', authController.deleteUser)
router.put('/update', authController.updateUser)

module.exports = router
