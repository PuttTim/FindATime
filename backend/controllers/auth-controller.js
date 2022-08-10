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

    dbConnection.collection('users').insertOne(user, (error, results) => {
        try {
            if (error) {
                res.status(500).send(error)
                console.log(error)
            } else {
                res.status(200).send('User created')
            }
        } catch {
            res.status(500).send(error)
            console.log(error)
        }
    })
}

module.exports = {
    createUser
}
