const Post = require('../model/Post')
const {uploadToCloudinary} = require('../helpers/cloudinary-helpers')
const fs = require('fs')

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

module.exports = {
    uploadPost
}