const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/auth-router')

require('dotenv').config()

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

// Routing goes through /api/{router name} to separate and organise routes into the routers
app.use('/api/user', userRouter)

app.listen(port, 'localhost')
console.log(`FindATime server running on http://localhost:${port}`)
