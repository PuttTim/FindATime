const argon2 = require('argon2')
const ObjectId = require('mongodb').ObjectId
const dbConnection = require('../db')

const argonOptions = {
    hashLength: 50,
    type: 1 // Uses argon2i which is preferred for password hashing.
}

const db = dbConnection.collection('users')

async function createUser(req, res) {
    let password

    try {
        password = await argon2.hash(req.body.password, argonOptions)
    } catch (error) {
        console.log(error)
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: password
    }

    db.findOne(
        { $or: [{ email: user.email }, { username: user.username }] },
        (err, results) => {
            try {
                if (results) {
                    // 409: Conflict
                    res.status(409).send('Email or Username already exists')
                } else {
                    db.insertOne(user, (err, results) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).json({
                                message: 'User created',
                                _id: `${results.insertedId}`
                            })
                            console.log(results)
                        }
                    })
                }
            } catch (err) {
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    )
}

async function authenticateUser(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    db.findOne({ email: user.email }, async (err, results) => {
        try {
            if (results) {
                console.log(results)

                const isValid = await argon2.verify(
                    results.password,
                    user.password
                )
                if (isValid) {
                    // 200: User authenticated and reply with the User's _id
                    res.status(200).json({
                        message: 'User Authenticated',
                        _id: `${results._id}`
                    })
                } else {
                    res.status(401).json({ message: 'Invalid Password' })
                }
            } else if (results == null) {
                // 404: User was not found in the collection.
                res.status(404).json({ message: 'User not found' })
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

function deleteUser(req, res) {
    const _id = req.body._id
    console.log(req.body)
    db.deleteOne({ _id: ObjectId(_id) }, (err, results) => {
        try {
            if (err) {
                console.log(err)
            } else if (results.deletedCount == 1) {
                res.status(200).json({ message: 'User deleted' })
                console.log(results)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

module.exports = {
    createUser,
    authenticateUser,
    deleteUser
}
