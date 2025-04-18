const express = require('express')
const {uploadPost} = require('../controllers/post-controllers')
const authMiddleWare = require('../middleware/auth-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const {deletePost} = require('../controllers/post-controllers')

const router = express.Router()


router.post('/upload',authMiddleWare,uploadMiddleware,uploadPost);
router.delete('/deletepost/:id',authMiddleWare,deletePost);


module.exports = router