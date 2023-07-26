const express = require('express')
const { createMovie, createProducer, createActor, getAllMovies } = require('../controller/moviesCtrl')
const { verifyToken } = require('../middleware/jwtVerify')
// const { registerUser, loginUser } = require('../controller/userCtrl')
const route = express.Router()

route.post('/create/producer', verifyToken, createProducer)
route.post('/create/actors', verifyToken, createActor)
route.post('/create', verifyToken, createMovie)
route.get('/', getAllMovies)


module.exports = route