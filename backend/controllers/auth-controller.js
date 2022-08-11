const argon2 = require('argon2')
const dbConnection = require('../db')

const argonOptions = {
    hashLength: 50,
    type: 1 // Uses argon2i which is preferred for password hashing.
}

async function createUser(req, res) {
    let password

    try {
        password = await argon2.hash(req.body.password, argonOptions)
    } catch (error) {
        console.log(error)
    }
    console.log(req.body)
    console.log(password)

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: password
    }

    dbConnection
        .collection('users')
        .findOne({ email: user.email }, (err, results) => {
            if (err) {
                console.log(err)
            } else if (results) {
                res.status(400).send('Email already exists')
            } else {
                dbConnection
                    .collection('users')
                    .insertOne(user, (err, results) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).send('User created')
                        }
                    })
            }
        })
}

module.exports = {
    createUser
}
