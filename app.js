const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(express.json());

// Import Post Routes 
const postsRoute = require('./routes/post')
app.use('/posts', postsRoute)

//Route
app.get('/', (req, res) => {
    res.send('Home')
})

// Connect to MongoDb
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},    
    () => console.log('Connect DB')
)

// Listening to the server
app.listen(3000)