const express = require('express')
const router = express.Router()

const multer = require('./middlewares/multer')

const { 
    newTweet, allTweets
} = require('./controllers/appControllers')
const auth = require('./middlewares/auth')


router.post("/newTweet", auth, newTweet)

router.get("/allTweets", allTweets)

module.exports = router