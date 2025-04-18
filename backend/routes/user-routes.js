const express = require('express')
const {
    updateProfile,
    deleteUser,
 } = require('../controllers/users-controllers')

 const authMiddleware = require('../middleware/auth-middleware')


const router = express.Router()



router.put('/updateProfile',authMiddleware,updateProfile)
router.delete('/deleteUser', authMiddleware, deleteUser);

module.exports = router