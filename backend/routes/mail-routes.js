const express = require('express')
const sendMail = require('../controllers/mail-controller')
 const authMiddleware = require('../middleware/auth-middleware')

const router = express.Router()

router.post('/sendMail',authMiddleware,sendMail)

module.exports = router