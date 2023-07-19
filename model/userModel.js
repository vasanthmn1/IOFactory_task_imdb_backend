
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false

    },
    password: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)