const express = require('express')
const roomController = require('../controllers/room-controller')

const router = express.Router()

router.get('/allrooms', roomController.getAllRoomId)
router.get('/:id', roomController.getRoomById)
router.get('/user/:_id', roomController.getUserActiveRooms)
router.post('/isuserinroom/', roomController.isUserInRoom)
router.post('/create', roomController.createRoom)
router.put('/insert-participant', roomController.insertParticipant)
router.post('/delete-participant', roomController.deleteParticipant)

module.exports = router
