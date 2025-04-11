const express = require('express')
const {
    changeName,
    changeEmail,
    changePassword
 } = require('../controllers/users-controllers')

 const authMiddleware = require('../middleware/auth-middleware')


const router = express.Router()


router.put('/changeName',authMiddleware,changeName)
router.put('/changeEmail',authMiddleware,changeEmail)
router.put('/changePassword',authMiddleware,changePassword)

module.exports = router