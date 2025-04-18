const express = require('express')
const {
    changeName,
    changeEmail,
    changePassword,
    deleteUser,
 } = require('../controllers/users-controllers')

 const authMiddleware = require('../middleware/auth-middleware')


const router = express.Router()


router.put('/changeName',authMiddleware,changeName)
router.put('/changeEmail',authMiddleware,changeEmail)
router.put('/changePassword',authMiddleware,changePassword)
router.delete('/deleteUser', authMiddleware, deleteUser);

module.exports = router