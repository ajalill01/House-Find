const Post = require('../model/Post')
const {uploadToCloudinary} = require('../helpers/cloudinary-helpers')
const cloudinary = require('../config/cloudinary')
const fs = require('fs');


const uploadPost = async(req,res)=>{
    try{
        const postedBy = req.userInfo.userId

        const {
            title,
            description,
            email,
            phoneNumber,
            city,
            address,
            googleMapLink,
            type,
            propertyType,
            price,
        } = req.body

        const files = req.files
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images uploaded" 
            });
          }

       const filePaths = files.map(file => file.path);

       const uploadesImages = await uploadToCloudinary(filePaths)

       const newPost = new Post({
        title,
        description,
        email,
        phoneNumber,
        city,
        address,
        googleMapLink,
        type,
        propertyType,
        price,
        photos: uploadesImages,
        postedBy
       })

       await newPost.save()

       //Delete files from uploads/
       await Promise.all(
        filePaths.map((filePath) =>
          fs.promises.unlink(filePath).catch((error) => {
            console.error(`Failed to delete file ${filePath}: `, error);
          })
        )
      );

       res.status(201).json({
        success : true,
        message : 'Post uploaded successfully',
        post : newPost
       })

    }
    catch(e){
        console.log('Error from  uploadPost\n',e)
        res.status(500).json({
            success : false,
            message : 'Error while uploading post', 
        })
    }
}

const deletePost = async(req,res)=>{
        try{
            const userId = req.userInfo.userId
            const postId = req.params.id
            const deletedPost = await Post.findById(postId)
            if(!deletedPost){
                return res.status(404).json({
                    success : false,
                    message : 'Post not found',
                    postId1 : postId
                })
            }
            if(deletedPost.postedBy.toString() !== userId){
                return res.status(403).json({
                    success : false,
                    message : 'You are not authorized to delete this post',
                    postId1 : postId
                })
            }
          

        const images = deletedPost.photos   
    
        const result = await Promise.all (images.map(images=> cloudinary.uploader.destroy(images.publicId))); 
        if (result) {
            console.log('Images deleted from cloudinary:', result);
        }
        else {
            console.error('Failed to delete images from cloudinary:', result);
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            success : true,
            message : 'Post deleted successfully'
        })
          
        }catch(e){
            console.log('Error from  deletePost\n',e)
            res.status(500).json({
                success : false,
                message : 'Error while deleting post',
                error : e.message
               
            })} 

}

const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limits = parseInt(req.query.limits) || 10;
        const skip = (page - 1) * limits;


        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limits);

        const total = await Post.countDocuments();

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limits),
            totalPosts: total,
            posts: posts
        });

    } 
    catch (e) {
        console.log('Error from getPosts\n', e);
        res.status(500).json({
            success: false,
            message: 'Error while fetching posts',
            error: e.message
        });
    }
};

const getPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            post: post
        });

    } catch (e) {
        console.log('Error from getPostById\n', e);
        res.status(500).json({
            success: false,
            message: 'Error while fetching post',
            error: e.message
        });
    }
};



module.exports = {
    uploadPost,
    deletePost,
    getPosts,
    getPost

}