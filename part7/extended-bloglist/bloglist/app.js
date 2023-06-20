const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/testing')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const mongoose = require("mongoose");

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use('/api/blogs', blogRouter )
app.use('/api/users', userRouter )
app.use('/api/login', loginRouter )
app.use('/api/test', testRouter )

module.exports = app
