const express = require('express')
const userController = require('../controllers/user-controller')

const router = express.Router()

router.get('/user/:username', userController.getUserByUsername)
router.post('/register', userController.createUser)
router.post('/login', userController.authenticateUser)
router.delete('/delete', userController.deleteUser)
router.put('/update', userController.updateUser)

module.exports = router
