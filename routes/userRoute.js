const express = require('express')
const { registerUser, loginUser } = require('../controller/userCtrl')
// const { createMovie } = require('../controller/moviesCtrl')
const route = express.Router()

route.post('/register', registerUser)
route.post('/login', loginUser)



module.exports = route