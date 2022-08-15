const argon2 = require('argon2')
const ObjectId = require('mongodb').ObjectId
const dbConnection = require('../db')

const argonOptions = {
    hashLength: 50,
    type: 1 // Uses argon2i which is preferred for password hashing.
}

const db = dbConnection.collection('users')

function getUserByUsername(req, res) {
    db.findOne({ username: req.params.username }, (err, results) => {
        try {
            if (results) {
                // 200: User found
                const user = {
                    _id: `${results._id}`,
                    username: results.username,
                    tier: results.tier
                }
                res.status(200).json(user)
            } else {
                // 404: User not found in the collection.
                res.status(404).json({ message: 'User not found' })
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

function getUserById(req, res) {
    db.findOne({ _id: ObjectId(req.params._id) }, (err, results) => {
        try {
            if (results) {
                // 200: User found
                const user = {
                    _id: `${results._id}`,
                    username: results.username,
                    tier: results.tier
                }
                res.status(200).json(user)
            } else {
                // 404: User not found in the collection.

                res.status(404).json({ message: 'User not found' })
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

async function createUser(req, res) {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: await argon2.hash(req.body.password, argonOptions),
        tier: req.body.tier
    }

    db.insertOne(user, (err, results) => {
        try {
            if (err) {
                if (err.code == 11000) {
                    // 409: Duplicate username or email found.
                    res.status(409).json({
                        message: 'Email or Username already exists'
                    })
                }
            } else {
                // 200: User created and inserted successfully
                res.status(200).json({
                    message: 'User created',
                    _id: `${results.insertedId}`
                })
            }
        } catch (err) {
            // 500: Internal server error
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

async function authenticateUser(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    db.findOne({ email: user.email }, async (err, results) => {
        try {
            if (results) {
                const isValid = await argon2.verify(
                    results.password,
                    user.password
                )
                if (isValid) {
                    // 200: User authenticated and reply with the User's _id
                    res.status(200).json({
                        message: 'User Authenticated',
                        _id: `${results._id}`,
                        username: results.username
                    })
                } else {
                    // 401: User's password was incorrect
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
    db.deleteOne({ _id: ObjectId(_id) }, (err, results) => {
        try {
            if (results.deletedCount == 1) {
                // 200: User successfully deleted
                res.status(200).json({ message: 'User deleted' })
            } else {
                // 404: User not found in the collection.
                res.status(404).json({ message: 'User not found' })
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' })
        }
    })
}

async function updateUser(req, res) {
    // Strips the _id from the request body when creating the user object,
    // and places the _id from the request body into it's own variable.
    let { _id, ...user } = req.body
    console.log(user)
    if (user.password != '' && user.password != undefined) {
        user.password = await argon2.hash(user.password, argonOptions)
    }

    user = Object.fromEntries(
        Object.entries(user).filter(([_, v]) => v != null && v != '')
    )

    console.log(req.body)
    console.log(user)
    db.updateOne(
        { _id: ObjectId(_id) },
        { $set: user },
        { upsert: true },
        (err, results) => {
            try {
                if (err) {
                    if ((err.code = 11000)) {
                        // 409: Duplicate username or email found.
                        res.status(409).send('Email or Username already exists')
                    }
                } else if (results.modifiedCount == 1) {
                    // 200: User successfully updated
                    res.status(200).json({ message: 'User updated' })
                } else {
                    // 404: User not found in the collection.
                    res.status(404).json({ message: 'User not found' })
                }
            } catch (err) {
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    )
}

module.exports = {
    getUserByUsername,
    getUserById,
    createUser,
    authenticateUser,
    deleteUser,
    updateUser
}
