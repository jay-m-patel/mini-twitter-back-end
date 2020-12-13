const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
}, {
    timestamps: true
})

const User = mongoose.model('users', userSchema)
module.exports = User