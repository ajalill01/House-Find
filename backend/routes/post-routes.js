const express = require('express')
const authMiddleWare = require('../middleware/auth-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const {
    uploadPost,
    deletePost,
    getPosts,
    getPost} = require('../controllers/post-controllers')

const router = express.Router()


router.post('/upload',authMiddleWare,uploadMiddleware,uploadPost);
router.delete('/deletepost/:id',authMiddleWare,deletePost);
router.get('/getposts',authMiddleWare,getPosts);
router.get('/getpost/:id',authMiddleWare,getPost);

module.exports = router