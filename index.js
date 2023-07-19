const express = require('express')
const dotenv = require('dotenv').config()
const colrs = require('colors')
const cors = require('cors')
const DB = require('./config/DB')
const userRoute = require('./routes/userRoute')
const movieRoute = require('./routes/movieRoute')

const port = process.env.PORT


DB()
const app = express()
app.use(express.json())
// app.use(express.json())

app.use(cors())
app.use(cors(
    {
        origin: "*", credentials: true
    }
))

app.use('/auth', userRoute)
app.use('/movie', movieRoute)




app.listen(port, () => {
    console.log(`connting Port ${port}`);
})