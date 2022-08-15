const argon2 = require('argon2')
const ObjectId = require('mongodb').ObjectId
const dbConnection = require('../db')

const db = dbConnection.collection('room')

function createRoom(req, res) {
    console.log(req.body)
    console.log(req.body.participants)
    console.log(req.body.participants.timeslots)
    res.status(200).send(req.body)
    db.insertOne(req.body, (err, results) => {
        console.log(results)
    })
}

function getAllRoomId(req, res) {
    db.find({}).toArray((err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' })
        } else {
            res.status(200).json(
                results.map(room => {
                    return room.id
                })
            )
        }
    })
}

function getRoomById(req, res) {
    roomId = req.params.id
    console.log(roomId)
    db.findOne({ id: roomId }, (err, results) => {
        if (results) {
            res.status(200).json(results)
        } else if (results == null) {
            res.status(404).json({ message: 'Room not found' })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

function insertParticipant(req, res) {
    roomId = req.body.roomId
    participant = req.body.participant

    db.findOne({ id: roomId }, (err, results) => {
        roomSize = results.participants.length
        maximumRoomSize = results.host.tier === 'paid' ? 50 : 5

        if (roomSize <= maximumRoomSize) {
            db.updateOne(
                { id: roomId },
                { $push: { participants: participant } },
                (err, results) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Internal server error'
                        })
                    } else {
                        res.status(200).json({ message: 'Participant added' })
                    }
                }
            )
        } else {
            res.status(400).json({ message: 'Room is full' })
        }
    })
}

function isUserInRoom(req, res) {
    console.log(req.body)
    db.findOne({ id: req.body.roomId }, (err, results) => {
        isUserInRoom = results.participants.some(
            participant => participant.user._id === req.body._id
        )
        console.log(isUserInRoom)
        if (isUserInRoom) {
            res.status(200).json({ message: 'User is in room' })
        } else {
            res.status(404).json({ message: 'User is not in the room' })
        }
    })
}

function deleteParticipant(req, res) {
    roomId = req.body.roomId
    participant = req.body.participant

    db.findOne({ id: roomId }, (err, results) => {
        kickedParticipant = results.participants.find(
            participant => participant.user._id === req.body._id
        )

        db.updateOne(
            { id: roomId },
            { $pull: { participants: kickedParticipant } },
            (err, results) => {
                if (err) {
                    res.status(500).json({
                        message: 'Internal server error'
                    })
                } else {
                    res.status(200).json(results)
                }
            }
        )
    })
}

module.exports = {
    createRoom,
    getAllRoomId,
    getRoomById,
    insertParticipant,
    isUserInRoom,
    deleteParticipant
}
