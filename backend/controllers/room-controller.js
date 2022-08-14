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

module.exports = { createRoom, getAllRoomId }
