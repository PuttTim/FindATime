const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

app.listen(port, 'localhost')
console.log(`FindATime server running on http://localhost:${port}`)
