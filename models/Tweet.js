const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    hashtags: [String],
    tweet: {
        type: String,
        required: true
    },
    uploader: {
        name: String,
        userName: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }
}, {
    timestamps: true
})

const Tweet = mongoose.model('tweets', tweetSchema)
module.exports= Tweet