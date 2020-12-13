
const User = require('./../models/User')
const Tweet = require('./../models/Tweet')


module.exports.newTweet = async (req, res) => {
    try {
        console.log(req.user, req.body)

        const tweet = new Tweet(req.body)

        const savedTweet = await tweet.save()

        console.log(savedTweet)

        res.json({
            ...savedTweet._doc,
            errName: null,
            errMessage: null, 
            err: null
        })

    } catch(err) {
        console.log('error!', err.name, err.message, err)
        res.json({
            errName: err.name,
            errMessage: err.message, 
            err
        })           
    }
}


module.exports.allTweets = async (req, res) => {
    try {
        console.log(req.user, req.body, req.params, req.query)
        const { filter, skip, limit } = req.query ? req.query : {}
        const tweets = await Tweet.find(JSON.parse(filter) || {}).sort({updatedAt: -1}).skip(parseInt(skip)).limit(parseInt(limit))

        console.log(tweets)

        res.json({
            allTweets: [...tweets],
            errName: null,
            errMessage: null, 
            err: null
        })

    } catch(err) {
        console.log('error!', err.name, err.message, err)
        res.json({
            errName: err.name,
            errMessage: err.message, 
            err
        })           
    }
}

