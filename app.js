const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv/config')
require('./config/connection')
const app = express()

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Import Post Routes 
const postsRoute = require('./routes/posts.route')
app.use('/posts', postsRoute)

//Default Route
app.get('/', (req, res) => {
    res.send('Home')
})

// Listening to the server
app.listen(3000)