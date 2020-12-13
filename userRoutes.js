const express = require('express')
const { route } = require('./appRoutes')
const router = express.Router()

const { register, login, logout, checkLoggedIn, follow, unfollow } = require('./controllers/userControllers')
const auth = require('./middlewares/auth')


router.post('/register', register)

router.post('/login', login)

router.delete('/logout', auth, logout)

router.get('/checkLoggedIn', checkLoggedIn)

router.patch("/follow", auth, follow)

router.patch("/unfollow", auth, unfollow)

module.exports = router