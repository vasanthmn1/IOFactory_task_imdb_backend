// producer.js

const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    dob: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    }],
});

module.exports = mongoose.model('Producer', producerSchema);
