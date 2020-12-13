const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')


module.exports.register = async (req, res) => {
    try {

        const { name, userName, password } = req.body

        const hashedPassword = await bcryptjs.hash(password, 10)
        const token = jwt.sign({userName: userName}, process.env.JWT_PRIVATE_KEY)

        const user = new User({
            name: name,
            userName: userName,
            hashedPassword: hashedPassword,
            isLoggedIn: true,
        })

        const savedUser = await user.save()
        console.log(savedUser)
        
        res.json({...savedUser._doc, token})
    } catch(err) {
        console.log(err.name, err.message, err)
        res.json({
            errName: err.name,
            errMessage: err.message, 
            err
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({userName: userName})

        if(user) {
            if(! await bcryptjs.compare(password, user.hashedPassword)) throw new Error('INVALID DATA')
            else {
                user.isLoggedIn = true
                const token = jwt.sign({userName: userName}, process.env.JWT_PRIVATE_KEY)
                const savedUser = await user.save()
                console.log(savedUser)

                res.json({...savedUser._doc, token})
            }
        } else {
            throw new Error('INVALID DATA')
        }


    } catch(err) {
        console.log(err.name, err.message, err)
        res.json({
            errName: err.name,
            errMessage: err.message, 
            err
        })
    }
}

module.exports.logout = async (req, res) => {
    try {
        req.user.isLoggedIn = false
        const savedUser = await req.user.save()

        if(savedUser)
        res.json({isLoggedIn: false})
    } catch(err) {
        console.log(err.name, err.message, err)
        res.json({
            errName: err.name,
            errMessage: err.message, 
            err
        })
    }
}

module.exports.checkLoggedIn = async (req, res) => {
    try {
        const authorization = req.headers.authorization
        if(authorization) {
            console.log(authorization)
            const token = authorization.split(" ")[1]   
            console.log(token) 
            const { userName } = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            if(userName) {
                const user = await User.findOne({userName})
                if(user && user.isLoggedIn) {
                    return res.json({
                        ...user._doc,
                    })
                } else {
                    res.json({isLoggedIn: false, 
                    })
                }
            } else {
                res.json({isLoggedIn: false, 
                })
            }
        } else {
            res.json({isLoggedIn: false, 
            })
        }
    
    } catch(err) {
        console.log(err.name, err.message, err)
        res.json({
            errName: err.name,
            errMessage: err.message, 
            err
        })
    }

}



module.exports.follow = async (req, res) => {
    try {
        console.log(req.user, req.body)
            
        req.user.following = [...req.user.following, req.body.whom]
        
        const savedUser = await req.user.save()
        res.json({
            ...savedUser._doc
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

module.exports.unfollow = async (req, res) => {
    try {
        console.log(req.user, req.body)
            
        req.user.following = req.user.following.filter(id => {
            console.log(typeof(id), id, typeof(req.body.whom), req.body.whom, id.toString() !== req.body.whom)
            return id.toString() !== req.body.whom
        })
        
        const savedUser = await req.user.save()
        res.json({
            ...savedUser._doc
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