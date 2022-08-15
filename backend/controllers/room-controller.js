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
        if (err) {
            res.status(500).json({ message: 'Internal server error' })
        } else {
            res.status(200).json(results)
        }
    })
}

function updateParticipant(req, res) {
    roomId = req.body.roomId
    participant = req.body.participant
    console.log(req.body.participant.user)

    db.findOne({ id: roomId }, (err, results) => {
        isUserInRoom = results.participants.some(
            participant =>
                participant.user._id === req.body.participant.user._id
        )
        console.log(isUserInRoom)
        if (!isUserInRoom) {
            db.updateOne(
                { id: roomId },
                { $push: { participants: participant } },
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
        } else {
            res.status(400).json({ message: 'User already in room' })
        }
    })
}

module.exports = { createRoom, getAllRoomId, getRoomById, updateParticipant }
