const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user-router')
const roomRouter = require('./routes/room-router')

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

// Routing goes through /api/{router name} to separate and organise routes into the routers
app.use('/api/user', userRouter)
app.use('/api/room', roomRouter)

app.listen(port, 'localhost')
console.log(`FindATime server running on http://localhost:${port}`)
