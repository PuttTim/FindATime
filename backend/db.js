const { MongoClient, ServerApiVersion } = require('mongodb')

require('dotenv').config()

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let dbConnection

client.connect((err, db) => {
    if (err || !db) {
        return err
    }
})

dbConnection = client.db('FindATime')
console.log('Successfully connected to MongoDB.')

module.exports = dbConnection
