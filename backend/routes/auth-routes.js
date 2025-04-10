const express = require('express')
const {
    signUp,
    login,
    sendverificationcode
} = require('../controllers/auth-controllers') 


const router = express.Router()

router.post('/verifyemail',sendverificationcode)
router.post('/signup',signUp)
router.post('/login',login)

module.exports = router