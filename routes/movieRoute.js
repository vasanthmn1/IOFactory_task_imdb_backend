const express = require('express')
const { createMovie, createProducer, createActor, getAllMovies } = require('../controller/moviesCtrl')
// const { registerUser, loginUser } = require('../controller/userCtrl')
const route = express.Router()

route.post('/create/producer', createProducer)
route.post('/create/actors', createActor)
route.post('/create', createMovie) 
route.get('/', getAllMovies)


module.exports = route