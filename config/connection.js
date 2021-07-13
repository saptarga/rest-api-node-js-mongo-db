const mongoose = require('mongoose')

// Connect to MongoDb
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }, () => console.log('Connect DB')
)